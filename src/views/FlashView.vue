<template>

    <body>
        <div class="wrapper4">
            <h1 type="text">{{ uiLabels.flashcard }}</h1>
            
        </div>
        <p class="count">{{ index+1}} / {{ words.length }}</p>
        <div class="scene sceneCard">
            <div class="card" v-bind:class="{ flip: cardOne == 'flipped' }">
                <div class="card__face card__faceFront">{{ words[index] }}</div>
                <div class="card__face"
                    v-bind:class="{ card__faceBackWrong: cardOneWord == false, card__faceBackRight: cardOneWord == true }" >
                    <div v-bind:class="{hideText: hideBack == true}">
                        {{ translations[index] }}
                    </div>
                </div>
            </div>
        </div>
        <div class="inter">
            <input type="text" placeholder="answer" class="wrapper5" v-model="cardAnswer" v-bind:readonly="cardOne == 'flipped'">
            <div class="wrapper6">

                <button v-if="cardOne != 'flipped'" class="submit" @click="[flipCard()], [getAnswer()]">{{
                        uiLabels.submit
                }}</button>
            
            <button v-else class="nextQuestionButton" @click="nextQuestion"> Next question
            </button>
            </div>
            <div>
                <button class="exitbutton" @click="$router.push('/')">Exit</button>
            </div>
        </div>
    </body>
</template>

<script>
import io from 'socket.io-client';
const socket = io();

export default {

    data: function () {
        return {
            lang: "",
            quizId: "",
            quiz: {},
            uiLabels: {},
            cardOne: "start",
            cardAnswer: "",
            cardOneWord: false,
            words: [],
            translations: [],
            index: 0,
            hideBack: true

        }
    },

    created: function () {
        this.lang = this.$route.params.lang;
        this.quizId = this.$route.params.id;
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
    },
    methods: {
        flipCard: function () {
            (this.cardOne == 'start' ? (this.cardOne = 'flipped') : (this.cardOne = 'start'))
        },

        getAnswer: function () {
            this.hideBack = false;
            if (this.cardAnswer.toLowerCase() == this.translations[this.index].toLowerCase()) {
                this.cardOneWord = true
            }
            else {
                this.cardOneWord = false
            }
        },
        nextQuestion: function () {
            this.cardOne = 'start'
            this.cardAnswer = ''
            this.hideBack = true
            this.index++
            
        }
    }
}
</script>

<style>
body {
    background-color: #d8ecff;
}
.count{
    color: black;
}
.wrapper5 {
    text-align: center;
    color: black;
    border: 1px ridge rgb(177, 177, 177);
    border-radius: 50px;
    background-color: white;
    margin-top: 10px;
    justify-content: center;
    height: 50px;
    width: 300px;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.wrapper4 {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    text-align: center;
    height: 50px;
    width: 300px;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.wrapper6 {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    text-align: center;
    height: 50px;
    width: 300px;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.inter {
    margin: 20px;
    padding: 20px;
}

.text {
    color: black;
    font-size: 35px;
    font-family: 'Comfortaa', cursive;
    text-align: center;
    margin-top: 150px;
}


.submit {
    text-align: center;
    color: white;
    border: 1px ridge rgb(177, 177, 177);
    border-radius: 50px;
    background-color: #3f51b5;
    margin-top: 10px;
    justify-content: center;
    height: 50px;
    width: 300px;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.submit:hover {
    cursor: pointer;
    width: 300px;
    height: 50px;
    background-color: #56c770;
}

.exitbutton {
    width: 4rem;
    height: 2rem;
    border-radius: 5px;
    border-color: rgb(227, 123, 123);
    margin: 2.5rem;
    color: white;
    background-color: rgb(235, 76, 76);
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.exitbutton:hover {

    cursor: pointer;
    width: 4rem;
    height: 2rem;
    background-color: rgb(187, 34, 34);
}

.nextQuestionButton {
    text-align: center;
    color: white;
    border: 1px ridge rgb(177, 177, 177);
    border-radius: 50px;
    background-color: #3f51b5;
    margin-top: 10px;
    justify-content: center;
    height: 50px;
    width: 300px;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.scene {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    border-radius: 50px;
    width: 800px;
    height: 500px;
}

.card {
    /* position: absolute;
    line-height: 260px; */
    color: white;
    text-align: center;
    font-family: 'Comfortaa', cursive;
    width: 800px;
    height: 500px;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    margin: auto;
    border-radius: 50px;
    perspective: 1000px;
}

.card__face {
    position: absolute;
    line-height: 450px;
    text-align: center;
    color: white;
    backface-visibility: hidden;
    font-family: 'Comfortaa', cursive;
    font-size: 60px;
    width: 800px;
    height: 500px;
    background: #3f51b5;
    margin: auto;
    border-radius: 50px;
}

.card__faceFront {
    background: #3f51b5;
}

.card__faceBackRight {
    background: #56c770;
    transform: rotateX(180deg);
}

.hideText{
    color: transparent;
}

.card__faceBackWrong {
    background: rgb(235, 76, 76);
    transform: rotateX(180deg);
}

.noflip {
    transform: rotateX(0deg);
}

.flip {
    transform: rotateX(180deg);
}
</style>
