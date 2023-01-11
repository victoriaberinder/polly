<template>

    <body>
        <div id="timer"></div>
        <div v-if="!startGame">
            <div class="waiting"> {{ uiLabels.waiting }} </div>
            <div class="loader">
                <div class="load">
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                    <div class="circle"></div>
                </div>
            </div>
        </div>
        <div v-if="startGame">

            <div v-if="showFlashCards">
                <flash-cards :uiLabels="uiLabels" :words="words" :translations="translations" @clicked="clickedDone">
                </flash-cards>
            </div>
            <div v-if="!showFlashCards">
                <my-result :uiLabels="uiLabels" :failedWords="failedWords" :correctWords="correctWords"
                    :allCorrectWords="allCorrectWords" @clicked="clickedTryAgain"></my-result>

            </div>
        </div>
        <div>
            <button class="exitbutton" @click="$router.push('/')">Exit</button>
        </div>
    </body>
</template>

<script>
import io from 'socket.io-client';
import FlashCards from '../components/FlashCards.vue'
import MyResult from '../components/MyResult.vue'

const socket = io();


export default {
    components: {
        FlashCards,
        MyResult
    },

    data: function () {
        return {
            lang: "",
            quizId: "",
            uiLabels: {},
            words: [],
            translations: [],
            username: "",
            failedWords: [],
            correctWords: [],
            failedTranslations: [],
            correctTranslations: [],
            timer: null,
            totalSeconds: 0,
            hour: 0,
            minute: 0,
            seconds: 0,
            showFlashCards: true,
            allCorrectWords: [],
            startGame: false

        }
    },
    beforeUnmount() {
        clearInterval(this.timer)
        
    },

    created: function () {
        this.lang = this.$route.params.lang;
        this.quizId = this.$route.params.id;
        this.username = this.$route.params.username;
        socket.emit('joinQuiz', this.quizId)
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {
            this.uiLabels = labels
        })
        if (sessionStorage.getItem("host") == this.quizId) {
            socket.emit('startQuiz', this.quizId)
        }

        //socket.emit("getQuiz", this.quizId);
        socket.on("newQuiz", (data) => {
            console.log('Start Game')
            this.startGame = true
            this.words = data.words
            this.translations = data.translations
            this.showTimer()

        })



    },

    methods: {

        clickedDone(value) {
            this.correctWords = value.correctWords
            this.failedWords = value.failedWords
            this.correctWords = value.correctWords
            this.failedTranslations = value.failedTranslations
            for (let i = 0; i < value.correctWords.length; i++) {
                this.allCorrectWords.push(value.correctWords[i])
            }
            this.showFlashCards = false;
            console.log(value)

        },

        clickedTryAgain() {
            if (this.failedWords.length == 0) {
                socket.emit('makeUser', { q: this.quizId, u: this.username })
                this.totalSeconds == 0
                socket.emit("saveTime", { quizId: this.quizId, username: this.username, totalSeconds: this.totalSeconds })
                this.$router.push('/finalresult/' + this.lang + '/' + this.quizId)

            }
            else {
                this.words = this.failedWords
                this.translations = this.failedTranslations
                this.showFlashCards = true;
                console.log("Translation:", this.translations, "Words: ", this.words)
            }


        },

        showTimer() {
            this.timer = setInterval(() => {
                this.totalSeconds++

                var hour = Math.floor(this.totalSeconds / 3600);
                var minute = Math.floor((this.totalSeconds - hour * 3600) / 60);
                var seconds = this.totalSeconds - (hour * 3600 + minute * 60);
                if (hour < 10)
                    hour = "0" + hour;
                if (minute < 10)
                    minute = "0" + minute;
                if (seconds < 10)
                    seconds = "0" + seconds;


                document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
            }, 1000)
        },

    },




}
</script>

<style>
.waiting {
    font-family: 'Comfortaa', cursive;
    text-align: center;
    color: #2c3e50;
    margin-top: 150px;
    font-size: 5vw;
}

.exitbutton {
    width: 4rem;
    height: 2rem;
    border-radius: 5px;
    border-color: rgb(227, 123, 123);
    margin: 2.5rem;
    color: white;
    background-color: rgb(235, 76, 76);
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.exitbutton:hover {

    cursor: pointer;
    width: 4rem;
    height: 2rem;
    background-color: rgb(187, 34, 34);
}

#timer {
    font-size: 4vw;
    float: right;
    color: #2c3e50;
    margin-right: 10vw;
}

.loader {
    display: grid;
    justify-content: space-evenly;
    margin: 10%;
}

.load {
    height: auto;
    /*justify-content: space-evenly;*/
    display: flex;
}

.circle {
    width: 5em;
    height: 5em;
    border-radius: 50%;
    position: relative;
    margin-left: 7px;
    margin-right: 7px;
}

.circle:nth-child(1) {
    background-color: #61f0a4;
}

.circle:nth-child(2) {
    background-color: #ff7da3;
}

.circle:nth-child(3) {
    background-color: #7ed9ff;
}

.circle:nth-child(4) {
    background-color: #e6a8ff;
}

.circle:nth-child(5) {
    background-color: #f7e98e;
}

.circle::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    opacity: 0.5;
    animation: change 1.5s ease-out infinite;
}

.circle:nth-child(1)::before {
    background-color: #61f0a4;
}

.circle:nth-child(2)::before {
    background-color: #ff7da3;
    animation-delay: 0.2s;
}

.circle:nth-child(3)::before {
    background-color: #7ed9ff;
    animation-delay: 0.4s;
}

.circle:nth-child(4)::before {
    background-color: #e6a8ff;
    animation-delay: 0.6s;
}

.circle:nth-child(5)::before {
    background-color: #f7e98e;
    animation-delay: 0.8s;
}


@keyframes change {
    0% {
        transform: scale(1);
    }

    50%,
    75% {
        transform: scale(3);
    }

    80%,
    100% {
        opacity: 0;
    }
}

@media only screen and (max-width: 650px) {
    .circle {
        width: 3em;
        height: 3em;
    }

    .loader {
        margin: 20%;
    }
}
</style>