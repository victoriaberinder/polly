<template>
    <div class="full"></div>
    <div class="wrapper4">
        <div class="text">{{ uiLabels.flashcard }}</div>
    </div>
    <p class="count">{{ index + 1 }} / {{ words.length }}</p>
    <div class="scene sceneCard">
        <div class="card" v-bind:class="{ flip: cardOne == 'flipped' }">
            <div class="card__face card__faceFront">{{ words[index] }}</div>
            <div class="card__face"
                v-bind:class="{ card__faceBackWrong: cardOneWord == false, card__faceBackRight: cardOneWord == true }">
                <div v-bind:class="{ hideText: showBack == false }">
                    {{ translations[index] }}
                </div>
            </div>
        </div>
    </div>
    <div class="inter">
        <input type="text" v-bind:placeholder="uiLabels.answer" class="wrapper5" v-model="cardAnswer"
            v-bind:readonly="cardOne == 'flipped'">
        <div class="wrapper6">
            <button v-bind:disabled="cardAnswer == ''" v-if="cardOne != 'flipped'" class="submit"
                @click="[flipCard()], [getAnswer()]">{{ uiLabels.submit }}</button>
            <button v-else-if="index + 1 == words.length" class="done" @click="done">
                {{ uiLabels.done }}
            </button>

            <button v-else class="nextQuestionButton" @click="nextQuestion"> {{ uiLabels.nextQuestion }}
            </button>
        </div>
    </div>


</template>

<script>
export default {
    name: 'FlashCards',
    emits: ['clicked'],
    props: {
        uiLabels: Object,
        words: Array,
        translations: Array,
    },

    data: function () {
        return {
            cardOne: "start",
            cardAnswer: "",
            cardOneWord: false,
            index: 0,
            showBack: false,
            correctWords: [],
            correctTranslations: [],
            failedWords: [],
            failedTranslations: [],


        }
    },

    methods: {
        flipCard: function () {
            (this.cardOne == 'start' ? (this.cardOne = 'flipped') : (this.cardOne = 'start'))
        },

        nextQuestion: function () {
            this.cardOne = 'start'
            this.cardAnswer = ''
            this.showBack = false
            this.index++

        },

        getAnswer: function () {
            this.showBack = true;
            if (this.cardAnswer.toLowerCase().trim() == this.translations[this.index].toLowerCase().trim()) {
                this.cardOneWord = true
                this.correctWords.push(this.words[this.index])
                this.correctTranslations.push(this.translations[this.index])

            }
            else {
                this.cardOneWord = false
                this.failedWords.push(this.words[this.index])
                this.failedTranslations.push(this.translations[this.index])

            }
        },
        done: function () {
            //this.$router.push('/myresult/' + this.lang + '/' + this.quizId + '/' + this.username)

            this.$emit('clicked', { failedWords: this.failedWords, correctWords: this.correctWords, failedTranslations: this.failedTranslations, correctTranslations: this.correctTranslations })
        },



    },
}

</script>

<style>
.count {
    color: #2c3e05;

}

.wrapper4 {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    height: 7vh;
    width: 25vw;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
    margin-top: 2%;
}

.wrapper5 {
    text-align: center;
    color: black;
    border: 1px ridge rgb(177, 177, 177);
    border-radius: 50px;
    background-color: white;
    height: 7vh;
    width: 25vw;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.wrapper6 {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    text-align: center;
    height: 7vh;
    width: 25vw;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.inter {
    display: grid;
    padding: 1%;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: end;
    margin-left: 22%;
    margin-right: 22%;
}

.text {
    color: black;
    font-size: 4vw;
    font-family: 'Comfortaa', cursive;
    text-align: center;
    height: 7vh;
    width: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;
}


.submit {
    text-align: center;
    color: white;
    border: 1px ridge rgb(177, 177, 177);
    border-radius: 50px;
    background-color: #3f51b5;
    justify-content: center;
    height: 7vh;
    width: 25vw;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.submit:hover {
    cursor: pointer;
    background-color: #27378e;
}

.submit:disabled {
    background-color: dimgrey;
    color: linen;
    opacity: 1;
}

.done {
    text-align: center;
    color: white;
    border: 1px ridge rgb(177, 177, 177);
    border-radius: 50px;
    background-color: #56c770;
    height: 7vh;
    width: 25vw;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;

}

.done:hover {
    cursor: pointer;
    height: 7vh;
    width: 25vw;
    background-color: #2ca248;
}


.nextQuestionButton {
    text-align: center;
    color: #2c3e05;
    border: 1px ridge rgb(177, 177, 177);
    border-radius: 50px;
    background-color: rgb(255, 227, 141);
    justify-content: center;
    height: 7vh;
    width: 25vw;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.nextQuestionButton:hover {
    cursor: pointer;
    background-color: rgb(253, 213, 92);

}

.scene {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    border-radius: 50px;
    width: 55vw;
    height: 70vh;
}

.card {
    /* position: absolute;
    line-height: 260px; */
    color: white;
    text-align: center;
    font-family: 'Comfortaa', cursive;
    width: 55vw;
    height: 70vh;
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
    width: 55vw;
    height: 70vh;
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

.hideText {
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


@media only screen and (max-width: 850px) {
    .text {
        font-size: 25pt;
    }
}
</style>