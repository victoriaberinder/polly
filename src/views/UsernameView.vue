
<template>

    <div class="wrapper7" action="" method="get">
        <h1 id="text">{{ uiLabels.usernameQuiz }}</h1>
        <input class="usernameInput" type="text" v-model="username" size="50" v-bind:placeholder="uiLabels.username" >

        <div>
            <button v-bind:disabled="username == ''" class="playQuiz" @click="play">{{ uiLabels.playButton }}</button>
        </div>
    </div>

    <div>
        <button class="exitbutton" @click="$router.push('/')">Exit</button>
    </div>

</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default {


    data: function () {
        return {
            lang: "",
            uiLabels: {},
            username: "",
            quizId: ""
        }
    },

    created: function () {
        this.quizId = this.$route.params.id
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
    },
    methods: {
        play: function () {
            
            this.$router.push('/flash/' + this.lang + '/' + this.quizId + '/' + this.username)
            //socket.emit('play', { q: this.quizId, u: this.usernameInput })

        }

    }

}

</script>

<style>
body {
    background-color: #d8ecff;
}

.wrapper7 {
    width: 400px;
    height: 400px;
    margin: auto;

}

input[class="usernameInput"] {
    border-radius: 50px;
    margin: 50px;
    border: 1px solid lightgrey;
    background-color: white;
    width: 300px;
    height: 80px;
    font-size: 17pt;
    font-family: 'Comfortaa', cursive;
    color: black;
    text-align: center;
}

input[type="text"]:focus {
    outline: none;
}

.playQuiz {
    font-family: 'Comfortaa', cursive;
    font-size: 20px;
    width: 250px;
    height: 40px;
    background: #3f51b5;
    color: white;
    border: 0;
    border-radius: 50px;
}

.playQuiz:hover {
    cursor: pointer;
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

#text {
    color: black;
    font-size: 35px;
    font-family: 'Comfortaa', cursive;
    text-align: center;
    margin-top: 150px;
}

.playQuiz:disabled {
    background-color: dimgrey;
    color: linen;
    opacity: 1;
}

</style>