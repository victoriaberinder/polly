<template>

    <body>
        <div class="wrapper2">
            <h1 type="text">{{ uiLabels.flashcard }}</h1>
        </div>
        <div class="scene scene--card">
            <div class="card" v-bind:class="{ flipme: cardOne == 'flipped' }">
                <div class="card__face card__face--front">front</div>
                <div class="card__face card__face--backRight">backRight</div>
                <div class="card__face card__face--backWrong">backWrong</div>
            </div>
        </div>
        <div class="inter">
            <input type="text" placeholder="answer" class="wrapper">
            <div>
                <div class="wrapper3">
                    <button class="submit" @click="[(cardOne == 'start' ? (cardOne = 'flipped') : (cardOne = 'start'))],
                    [$router.push('/flash/' + lang)]">{{ uiLabels.submit }}</button>
                </div>
            </div>
            <div>
                <!-- skapa lyssnare som skickar iväg pageLoaded, som i sin tur returnerar uiLabels (och eventuellt annan typ av data)-->
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
            uiLabels: {},
            cardOne: "start",
        }
    },

    created: function () {
        this.lang = this.$route.params.lang;
        socket.emit("pageLoaded", this.lang);
        socket.on("init", (labels) => {
            this.uiLabels = labels
        })
        socket.on("dataUpdate", (data) =>
            this.data = data
        )
        socket.on("pollCreated", (data) =>
            this.data = data)
    }
}
</script>

<style>
body {
    background-color: #d8ecff;
}

.wrapper {
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

.wrapper2 {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    text-align: center;
    height: 50px;
    width: 300px;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.wrapper3 {
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

.scene {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    border-radius: 50px;
    width: 800px;
    height: 500px;
}

.card {
    position: absolute;
    line-height: 260px;
    color: white;
    text-align: center;
    font-family: 'Comfortaa', cursive;
    font-size: 20px;
    width: 800px;
    height: 500px;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    margin: auto;
    border-radius: 50px;
}

.card__face {
    position: absolute;
    line-height: 260px;
    color: white;
    text-align: center;
    backface-visibility: hidden;
    font-family: 'Comfortaa', cursive;
    font-size: 20px;
    width: 800px;
    height: 500px;
    background: #3f51b5;
    margin: auto;
    border-radius: 50px;
}

.card__face--front {
    background: #3f51b5;
}

.card__face--back {
    background: #56c770;
    transform: rotateX(180deg);
}

.card__face--backWrong {
    background: rgb(235, 76, 76);
    transform: rotateX(180deg);
}

/* this style is applied when the card is clicked */
.flipme {
    transform: rotateX(180deg);
}
</style>
