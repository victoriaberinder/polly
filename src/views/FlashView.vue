<template>

    <body>
        <div id="timer"></div>
        <div v-if="showFlashCards">
            <flash-cards :uiLabels="uiLabels" :words="words" :translations="translations" :lang="lang" :quizId="quizId"
                @clicked="clickedDone">
            </flash-cards>
        </div>
        <div v-if="!showFlashCards">
            <my-result :uiLabels="uiLabels" :failedWords="failedWords" :correctWords="correctWords"
                :allCorrectWords="allCorrectWords" @clicked="clickedTryAgain"></my-result>

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
            quiz: {},
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
            allCorrectWords: []

        }
    },
    beforeUnmount() {
        clearInterval(this.timer)
    },

    created: function () {
        this.lang = this.$route.params.lang;
        this.quizId = this.$route.params.id;
        this.username = this.$route.params.username;
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {
            this.uiLabels = labels
        })

        socket.emit("getQuiz", this.quizId);
        socket.on("quiz", (data) => {
            this.quiz = data
            this.words = data.words
            this.translations = data.translations

        })


        this.showTimer()

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
            this.words = this.failedWords
            this.translations = this.failedTranslations
            this.showFlashCards = true;
            console.log("Translation:", this.translations, "Words: ", this.words)

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
</style>