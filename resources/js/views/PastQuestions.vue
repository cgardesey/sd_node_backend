<template>
    <div style="z-index: 9">
        <div align="center" class="mb-2 p-2" v-if="items" style="background-color: #F0F0F0">
            {{ path}}
        </div>
        <div align="center" v-if="items !== null && items.length === 0">
            <h2>Data not available</h2>
        </div>
        <div v-if="items !== null && items.length !== 0">
            <div class="mb-5">
                <div>
                    <img id="questionImage" :src="'data:image/jpeg;base64,' + question.picture"/>
                </div>
                <div class="options" v-if="question.ismcq == 1 && question.isendofquestion == 1">
                    <label class="option">
                        <input type="radio" @change="optionChange" v-model="selectedOption" value="A"> A <img
                            v-if="showCorrectA"
                            :src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABBklEQVQ4EWNgGAWMpAaBw3wvCWbGv/P//mfMPJC44wETKQY4zPdQAGo+DrRV9A8b80eQXiAbRBHGEM3/9wM1vP3ByuJ6JHrre5AuIB9E4ce4NIN0wb3gtshNDCSAjiF+/r8NKP79z39mH5jNQD4YgQ1wWuhu9vcf413H+R5eYFEoAdH8dx+I+/c/s9OBxG0vQGxkDDZgX9zO0wz//y9iYvy/wWmhRyBIAcTZf0EB9u0nK4s1Ns0gdfAwCF0Vyvzu6+e5DIz/I/7/Z8xgZPxfBlKAy2aQHAjDDQBxGP4zMDovdJvAwMCYB5Q4ixzaYHksBNgLcHFGhv+2D6wKgfx6bAEGFB+ECABut2TcEiykTgAAAABJRU5ErkJggg=='"/><img
                            v-if="showWrongA"
                            :src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABVklEQVQ4Ec1SPUsDQRCdWU+LQ1DRPmBreXB1FH+AKFeoP0DF+HM0Wir4EUX8B9oHUtobO4sEi2QVhIzz9tzb5GL6HLc7b9+8ebs7d0RT9Ui1GkmWzUw6FHLQDOeNX0i2NmfNV6PfbV9C6HkfwfU77StooPV8YUAPrz9E8qGJfdt9a0iSzCp2L7DtvN8T057TOK1LKZVHNwsR2430VJiOmOQx/hzsImEXojth2WahevzcPGZ1AY+hGCGMERORJ/VkNdz6rxhVYwYgncl6WhdDB1jzgC7il6aeijQFJozQg8ARJUlERlYKChhcQQQwZuAatmhuhXgHx9bjnwNbcEON9RYjVygXo2EQ9jbTMzU79I3lVku/GDLaoTxoW9Xd7fK3M4rV3d1ZJ55kEq6w+q0bGK2h63i5cqJA63J74PmlSk1beOMYaB0oTfhN8ceV6GKJHDQFMRXgF/VGlyx+m4Y+AAAAAElFTkSuQmCC'"/>
                        <span class="checkmark"></span>
                    </label>
                    <label class="option">
                        <input type="radio" @change="optionChange" v-model="selectedOption" value="B"> B <img
                            v-if="showCorrectB"
                            :src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABBklEQVQ4EWNgGAWMpAaBw3wvCWbGv/P//mfMPJC44wETKQY4zPdQAGo+DrRV9A8b80eQXiAbRBHGEM3/9wM1vP3ByuJ6JHrre5AuIB9E4ce4NIN0wb3gtshNDCSAjiF+/r8NKP79z39mH5jNQD4YgQ1wWuhu9vcf413H+R5eYFEoAdH8dx+I+/c/s9OBxG0vQGxkDDZgX9zO0wz//y9iYvy/wWmhRyBIAcTZf0EB9u0nK4s1Ns0gdfAwCF0Vyvzu6+e5DIz/I/7/Z8xgZPxfBlKAy2aQHAjDDQBxGP4zMDovdJvAwMCYB5Q4ixzaYHksBNgLcHFGhv+2D6wKgfx6bAEGFB+ECABut2TcEiykTgAAAABJRU5ErkJggg=='"/><img
                            v-if="showWrongB"
                            :src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABVklEQVQ4Ec1SPUsDQRCdWU+LQ1DRPmBreXB1FH+AKFeoP0DF+HM0Wir4EUX8B9oHUtobO4sEi2QVhIzz9tzb5GL6HLc7b9+8ebs7d0RT9Ui1GkmWzUw6FHLQDOeNX0i2NmfNV6PfbV9C6HkfwfU77StooPV8YUAPrz9E8qGJfdt9a0iSzCp2L7DtvN8T057TOK1LKZVHNwsR2430VJiOmOQx/hzsImEXojth2WahevzcPGZ1AY+hGCGMERORJ/VkNdz6rxhVYwYgncl6WhdDB1jzgC7il6aeijQFJozQg8ARJUlERlYKChhcQQQwZuAatmhuhXgHx9bjnwNbcEON9RYjVygXo2EQ9jbTMzU79I3lVku/GDLaoTxoW9Xd7fK3M4rV3d1ZJ55kEq6w+q0bGK2h63i5cqJA63J74PmlSk1beOMYaB0oTfhN8ceV6GKJHDQFMRXgF/VGlyx+m4Y+AAAAAElFTkSuQmCC'"/>
                        <span class="checkmark"></span>
                    </label>
                    <label class="option">
                        <input type="radio" @change="optionChange" v-model="selectedOption" value="C"> C <img
                            v-if="showCorrectC"
                            :src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABBklEQVQ4EWNgGAWMpAaBw3wvCWbGv/P//mfMPJC44wETKQY4zPdQAGo+DrRV9A8b80eQXiAbRBHGEM3/9wM1vP3ByuJ6JHrre5AuIB9E4ce4NIN0wb3gtshNDCSAjiF+/r8NKP79z39mH5jNQD4YgQ1wWuhu9vcf413H+R5eYFEoAdH8dx+I+/c/s9OBxG0vQGxkDDZgX9zO0wz//y9iYvy/wWmhRyBIAcTZf0EB9u0nK4s1Ns0gdfAwCF0Vyvzu6+e5DIz/I/7/Z8xgZPxfBlKAy2aQHAjDDQBxGP4zMDovdJvAwMCYB5Q4ixzaYHksBNgLcHFGhv+2D6wKgfx6bAEGFB+ECABut2TcEiykTgAAAABJRU5ErkJggg=='"/><img
                            v-if="showWrongC"
                            :src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABVklEQVQ4Ec1SPUsDQRCdWU+LQ1DRPmBreXB1FH+AKFeoP0DF+HM0Wir4EUX8B9oHUtobO4sEi2QVhIzz9tzb5GL6HLc7b9+8ebs7d0RT9Ui1GkmWzUw6FHLQDOeNX0i2NmfNV6PfbV9C6HkfwfU77StooPV8YUAPrz9E8qGJfdt9a0iSzCp2L7DtvN8T057TOK1LKZVHNwsR2430VJiOmOQx/hzsImEXojth2WahevzcPGZ1AY+hGCGMERORJ/VkNdz6rxhVYwYgncl6WhdDB1jzgC7il6aeijQFJozQg8ARJUlERlYKChhcQQQwZuAatmhuhXgHx9bjnwNbcEON9RYjVygXo2EQ9jbTMzU79I3lVku/GDLaoTxoW9Xd7fK3M4rV3d1ZJ55kEq6w+q0bGK2h63i5cqJA63J74PmlSk1beOMYaB0oTfhN8ceV6GKJHDQFMRXgF/VGlyx+m4Y+AAAAAElFTkSuQmCC'"/>
                        <span class="checkmark"></span>
                    </label>
                    <label class="option">
                        <input type="radio" @change="optionChange" v-model="selectedOption" value="D"> D <img
                            v-if="showCorrectD"
                            :src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABBklEQVQ4EWNgGAWMpAaBw3wvCWbGv/P//mfMPJC44wETKQY4zPdQAGo+DrRV9A8b80eQXiAbRBHGEM3/9wM1vP3ByuJ6JHrre5AuIB9E4ce4NIN0wb3gtshNDCSAjiF+/r8NKP79z39mH5jNQD4YgQ1wWuhu9vcf413H+R5eYFEoAdH8dx+I+/c/s9OBxG0vQGxkDDZgX9zO0wz//y9iYvy/wWmhRyBIAcTZf0EB9u0nK4s1Ns0gdfAwCF0Vyvzu6+e5DIz/I/7/Z8xgZPxfBlKAy2aQHAjDDQBxGP4zMDovdJvAwMCYB5Q4ixzaYHksBNgLcHFGhv+2D6wKgfx6bAEGFB+ECABut2TcEiykTgAAAABJRU5ErkJggg=='"/><img
                            v-if="showWrongD"
                            :src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABVklEQVQ4Ec1SPUsDQRCdWU+LQ1DRPmBreXB1FH+AKFeoP0DF+HM0Wir4EUX8B9oHUtobO4sEi2QVhIzz9tzb5GL6HLc7b9+8ebs7d0RT9Ui1GkmWzUw6FHLQDOeNX0i2NmfNV6PfbV9C6HkfwfU77StooPV8YUAPrz9E8qGJfdt9a0iSzCp2L7DtvN8T057TOK1LKZVHNwsR2430VJiOmOQx/hzsImEXojth2WahevzcPGZ1AY+hGCGMERORJ/VkNdz6rxhVYwYgncl6WhdDB1jzgC7il6aeijQFJozQg8ARJUlERlYKChhcQQQwZuAatmhuhXgHx9bjnwNbcEON9RYjVygXo2EQ9jbTMzU79I3lVku/GDLaoTxoW9Xd7fK3M4rV3d1ZJ55kEq6w+q0bGK2h63i5cqJA63J74PmlSk1beOMYaB0oTfhN8ceV6GKJHDQFMRXgF/VGlyx+m4Y+AAAAAElFTkSuQmCC'"/>
                        <span class="checkmark"></span>
                    </label>
                </div>
                <hr v-if="question.isendofquestion == 1"/>
                <video id="vid" v-if="showVideo" v-observe-visibility="visibilityChanged" :src="question.videopath"
                       controls class="mt-3"></video>
                <div align="right">
                    <button id="why" v-if="question.isendofquestion === 1" v-observe-visibility="whyVisibilityChanged"
                            @click="why" class="btn btn-outline-primary">
                        {{videoStatusText}}
                    </button>
                </div>
            </div>

            <div class="quizNav pb-2">
                <div class="container">
                    <hr class="mb-2"/>
                </div>
                <div>
                    <button v-if="question.isfirstquestion != 1" @click="prevClicked" class="btn btn-outline-primary">
                        Prev
                    </button>
                    <button v-if="question.islastquestion != 1" @click="nextClicked" class="btn btn-outline-primary">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PastQuestions",

        props: {
            questions: Array
        },

        data() {
            return {
                path: '',
                items: null,

                showCorrectA: false,
                showCorrectB: false,
                showCorrectC: false,
                showCorrectD: false,

                showWrongA: false,
                showWrongB: false,
                showWrongC: false,
                showWrongD: false,

                showVideo: false,
                videoStatusText: 'Why?',

                index: -1,

                selectedOption: null,
                question: null
            }
        },

        methods: {
            initOptions() {
                this.showCorrectA = false;
                this.showCorrectB = false;
                this.showCorrectC = false;
                this.showCorrectD = false;

                this.showWrongA = false;
                this.showWrongB = false;
                this.showWrongC = false;
                this.showWrongD = false;

                this.videoStatusText = "Why?";

                // this.selectedOption = null;
                // this.question = null;
            },

            initAnsBtnText() {
                if (this.question !== undefined) {
                    if (this.question.ismcq) {
                        this.videoStatusText = "Why?";
                    } else {
                        this.videoStatusText = "Answer";
                    }
                }
            },

            updateQuestionNext() {
                this.index = this.index + 1;
                this.initOptions();
                this.showVideo = false;
                this.selectedOption = null;
                this.question = this.items[this.index];

                this.initAnsBtnText();
            },

            updateQuestionPrev() {
                this.index = this.index - 1;
                this.initOptions();
                this.showVideo = false;
                this.selectedOption = null;
                this.question = this.items[this.index];

                this.initAnsBtnText();
            },

            loadQuestions(items) {
                this.items = items;

                this.initOptions();
                this.showVideo = false;
                this.index = -1;

                this.updateQuestionNext();
            },

            prevClicked() {
                this.updateQuestionPrev();
                window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
            },

            nextClicked() {
                this.updateQuestionNext();
                window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
            },

            why() {
                if (this.showVideo == true) {
                    this.showVideo = false;
                    if (this.question.ismcq) {
                        this.videoStatusText = "Why?";
                    } else {
                        this.videoStatusText = "Answer";
                    }

                } else {
                    this.showVideo = true;
                    this.videoStatusText = "Hide answer";

                }
            },

            optionChange() {
                // console.log('option change');
                this.initOptions();

                if (this.question.answer == "A") {
                    this.showCorrectA = true;
                } else if (this.question.answer == "B") {
                    this.showCorrectB = true;
                } else if (this.question.answer == "C") {
                    this.showCorrectC = true;
                } else if (this.question.answer == "D") {
                    this.showCorrectD = true;
                }


                if (this.selectedOption != this.question.answer) {
                    if (this.selectedOption == "A") {
                        this.showWrongA = true;
                    }
                    if (this.selectedOption == "B") {
                        this.showWrongB = true;
                    }
                    if (this.selectedOption == "C") {
                        this.showWrongC = true;
                    }
                    if (this.selectedOption == "D") {
                        this.showWrongD = true;
                    }
                }
            },

            visibilityChanged (isVisible, entry) {
                if (isVisible) {
                    /*let elmnt = document.getElementById("vid");
                    elmnt.scrollIntoView();
                    // console.log(isVisible);*/
                    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
                }
            },

            whyVisibilityChanged (isVisible, entry) {
                if (isVisible) {
                    /*let elmnt = document.getElementById("why");
                    elmnt.scrollIntoView();
                    console.log(isVisible);*/
                    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
                }
            },
        },

        mounted() {
            console.log("I am here")
            if (this.questions === undefined) {

                Event.$on('passcoFetchSuccess', function (path) {
                    this.path = path;
                }.bind(this));
            }
            else {
                this.loadQuestions(this.questions);
            }

            Event.$emit('passcoFetchStart');
            axios.get(BasePath + 'year-past-questions/' + this.$route.params.questionid)
                .then(response => {
                    Event.$emit('passcoFetchSuccess');
                    this.loadQuestions(response.data);
                    this.path = this.$route.params.questionid;
                })
                .catch(error => {
                    Event.$emit('passcoFetchError');
                    console.log(error.response.data.error);
                });
        }
    }
</script>

<style scoped>

    body {
        font-family: 'Segoe UI', sans-serif;
        margin: auto;
    }

    /** {*/
    /*border-radius: 0px !important;*/
    /*}*/

    h1 {
        /* margin-top: 30px; */
        color: #740808;
        font-weight: normal;
    }

    h2 {
        font-weight: normal;
    }

    hr {
        border: none;
        border-top: 1px solid #ccc;
        background: none;
        margin-bottom: 2px;
    }

    .quizNav {
        margin: auto;
        text-align: center;

        position:fixed;
        bottom:0;

        background-color: #F8FAFC;
        width: 100%;
        right:0;
        left:0;
    }

    .quizNav ul {
        margin: 0;
    }

    .quizNav ul li {
        display: inline-block;
        list-style-type: none;
    }

    /*.create-quiz .options input[type=checkbox] {*/
    /*border: 1px solid #262626;*/
    /*display: inline-block;*/
    /*height: 20px;*/
    /*margin-top: 10px;*/
    /*margin-bottom: 0;*/
    /*padding: 0;*/
    /*width: 20px;*/
    /*-webkit-appearance: checkbox;*/
    /*}*/

    #questionImage {
        width: 100%;
    }

    video {
        width: 640px;
        height: 480px;
        object-fit: fill;
    }


    @media (max-width: 480px) {
        video {
            width: 100%;
            height: auto;
        }
    }

    /*!* The container *!
    .option {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        !*font-size: 22px;*!
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    !* Hide the browser's default radio button *!
    .option input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    !* Create a custom radio button *!
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 50%;
        !*border-style:solid;*!
        !*border-width:2px;*!
    }

    !* On mouse-over, add a grey background color *!
    .option:hover input ~ .checkmark {
        background-color: #ccc;
    }

    !* When the radio button is checked, add a blue background *!
    .option input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    !* Create the indicator (the dot/circle - hidden when not checked) *!
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    !* Show the indicator (dot/circle) when checked *!
    .option input:checked ~ .checkmark:after {
        display: block;
    }

    !* Style the indicator (dot/circle) *!
    .option .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
    }*/

    /* The radio */
    .option {

        display: block;
        position: relative;
        padding-left: 30px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 20px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
    }

    /* Hide the browser's default radio button */
    .option input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom radio button */
    .checkmark {

        position: absolute;
        top: 6px;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border-color: #3490DC;
        border-style: solid;
        border-width: 2px;
        border-radius: 50%;
    }


    /* When the radio button is checked, add a blue background */
    .option input:checked ~ .checkround {
        background-color: #fff;
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the indicator (dot/circle) when checked */
    .option input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the indicator (dot/circle) */
    .option .checkmark:after {
        left: 2px;
        top: 2px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #3490DC;
    }

    @media (max-width: 480px) {
        video {
            width: 100%;
            height: auto;
        }
    }

</style>