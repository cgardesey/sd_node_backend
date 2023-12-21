<template>
    <img style="z-index: 21;" v-if="showSpinner"
         class="loading-icon"
         src="images/flickr-loading.gif"
         alt="loading">

</template>

<script>
    export default {
        name: "Spinner",

        data() {
            return{
                showSpinner: false
            }
        },

        mounted() {
            Event.$on('passcoFetchStart', function () {
                this.showSpinner = true;
            }.bind(this));

            Event.$on('passcoFetchSuccess', function () {
                this.showSpinner = false;
            }.bind(this));

            Event.$on('passcoFetchError', function () {
                this.showSpinner = false;
            }.bind(this));
        }
    }
</script>

<style scoped>
    .loading-icon {
        position: absolute;
        width: 60px;
        margin-left: -30px;
        left: 50%;
        top: 3px;
    }
</style>