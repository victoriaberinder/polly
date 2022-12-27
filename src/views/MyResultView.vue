<template>
    <body>
        <h1> My result</h1>
    <p>{{ quiz.title }} </p>
    <p>Failed words: {{ failedWords }}</p>
    <p>Correct words: {{ correctWords }}</p>
    <div class="correctWords"></div>
    <div class="failedWords"></div>
    <button class="tryagain" @click="$router.push('/flash/' + this.lang + '/' + this.quizId + '/' + this.username+'/'+this.siteId)"> Try again</button>
    <div>
      <!-- skapa lyssnare som skickar iväg pageLoaded, som i sin tur returnerar uiLabels (och eventuellt annan typ av data)-->
      <button class="exitbutton" @click="$router.push('/')">Exit</button>
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
        username:"",
        user:{},
        quiz: {},
        failedWords: [],
        correctWords:[],
        siteId: "again"
       
      }
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

      })

      socket.emit("getMyResult", {quizId:this.quizId, user:this.username})
      socket.on("MyResult", (data) => {
        this.user = data
        this.failedWords = data.failedWords
        this.correctWords = data.correctWords
      })
    },
  
    methods: {
  
      
    }
  }
  
  </script>
  
  <style>
body {
    background-color: #d8ecff;
}

h1{
  font-family: 'Comfortaa', cursive;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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

  </style>