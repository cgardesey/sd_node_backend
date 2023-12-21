<template>
    <div style="color: green; width: 100%" align="center" class="mb-3">
        {{ time}}
        <!--<button type="button" class="btn btn-outline-primary" style="margin-left: 10px" @click="timerBtnClick">{{ btnText }}</button>-->
    </div>
</template>

<script>
    import shared from "../shared";

    export default {
        extends: shared,

        props: {
            user_id: Number,
            timeremaining: Number
        },

        data() {
            return{
                time: '00d 00h 00m 00s',
                btnText: 'Pause'
            }
        },

        methods: {
            timerBtnClick() {
                if (this.btnText === 'Pause') {
                    this.btnText = 'Resume';
                    // this.stopTimer();
                    this.$emit('timerBtnClickEvent', 'stop')
                }
                else {
                    this.btnText = 'Pause';
                    // this.resumeTimer();
                    this.$emit('timerBtnClickEvent', 'start')
                }
            },

            stopTimer() {
                // this.socket.emit("stop-timer", {'user_id': this.user_id});
                ws.getSubscription('timer:counter').emit("stopTimer", {'user_id': this.user_id});
            },

            formatTime(secs) {
                let seconds = parseInt(secs, 10);
                let days = Math.floor(seconds / (3600 * 24));
                seconds  -= days*3600*24;
                let hrs   = Math.floor(seconds / 3600);
                seconds  -= hrs*3600;
                let mnts = Math.floor(seconds / 60);
                seconds  -= mnts*60;
                return days.toString().padStart(2, '0') + 'd ' + hrs.toString().padStart(2, '0') + 'h ' + mnts.toString().padStart(2, '0') + 'm ' +  seconds.toString().padStart(2, '0') + 's';
            }
        },

        mounted() {
            if (this.timeremaining === 0) {
                window.location.href = BasePath + 'subscriptions'
            }

            ws.on('open', function () {
                const timer = ws.subscribe('timer')
                timer.emit('userConnected');
                timer.emit('startTimer');
                timer.on('no-time', function () {
                    window.location.href = BasePath + 'subscriptions'
                });

                timer.on(this.user_id.toString(), function (sec_remaining) {
                    console.log(sec_remaining)
                    this.time = this.formatTime(sec_remaining);
                }.bind(this));

                this.$on('timerBtnClickEvent', function (data) {
                    if (data === 'start') {
                        console.log('startTimer')
                        timer.emit('startTimer');
                    }
                    else if (data === 'stop') {
                        console.log('stopTimer')
                        timer.emit('stopTimer');
                    }
                })

            }.bind(this));

            ws.on('close', function () {

            });
        }
    }
</script>
