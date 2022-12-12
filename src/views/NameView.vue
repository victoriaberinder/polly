<template>

    <body>

        <body>
            <form action="/url" method="GET" class="text">
                <p>Name your quiz</p>
            </form>
        </body>
        <input type="text" placeholder="Enter" class="wrapper">
        <div>
        <button class="saveQuiz" @click="$router.push('/play/' + lang)">{{ uiLabels.saveQuiz }}</button>
    </div>
    </body>

</template>

<script>

import io from 'socket.io-client';
const socket = io();

export default {


data: function (){
    return{
        lang: "",
        uiLabels: {}
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

.saveQuiz {
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 250px;
  height: 40px;
  background: #3f51b5;
  color: white;
  border: 0;
  padding: 7px;
  margin: 70px;
  border-radius: 50px;
}
.saveQuiz:hover {
  cursor: pointer;
  background-color: #56c770;
}

.text {
    color: black;
    font-size: 35px;
    font-family: 'Comfortaa', cursive;
    text-align: center;
    margin-top: 150px;
}

.saveQuizButton {
    width: 50%;
    background: #3f51b5;
    color: white;
    border: 0;
    padding: 7px;
    border-radius: 5px;
}

.saveQuizButton:hover {
    cursor: pointer;
    width: 32rem;
    height: 2rem;
    background-color: #56c770;
}
</style>