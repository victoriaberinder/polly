<template>

  <body>
    <h1> My result</h1>
    <p>Title: {{ quiz.title }} </p>
    <div class="wrapperWords">
      <div v-if="correctWords.length>0" class="correctWords">
        <div class="correct" >
        <div v-for="(word, index) in correctWords" v-bind:key="index">
          {{ word }} - {{ correctTranslations[index] }}
        </div>
      </div>

      </div>
      <div v-if="failedWords.length>0" class="failedWords">
        <div class="failed">
        <div v-for="(word, index) in failedWords" v-bind:key="index">
          {{ word }} </div>
        </div>
      </div>
    </div>
    <div>
      <button v-if="failedWords.length > 0" class="tryagain"
        @click="$router.push('/flash/' + this.lang + '/' + this.quizId + '/' + this.username + '/' + this.siteId)"> Try
        again</button>
      <button v-else-if="failedWords.length == 0" class="tryagain"
        @click="$router.push('/result/' + this.lang + '/' + this.quizId)"> Show toplist</button>
    </div>

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
      username: "",
      user: {},
      quiz: {},
      failedWords: [],
      failedTranslations: [],
      correctWords: [],
      correctTranslations: [],
      siteId: "again",



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

    socket.emit("getMyResult", { quizId: this.quizId, user: this.username })
    socket.on("MyResult", (data) => {
      this.user = data
      this.failedWords = data.failedWords
      this.failedTranslations = data.failedTranslations
      this.correctWords = data.correctWords
      this.correctTranslations = data.correctTranslations
    })
  },

  methods: {


  }
}

</script>
  
<style>
body {
  background-color: #d8ecff;
  font-family: 'Comfortaa', cursive;
}

h1 {
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

.failedWords {
  float:left;
  flex:1;
  display: inline-block;
  width: 5vw;
  height: auto;
  background-color: rgb(229, 140, 140);
  border-radius: 10px;
  padding: 2vw;
}

.correctWords {
  float:left;
  flex:1;
  display:inline-block;
  width: 5vw;
  height: auto;
  background-color: #a8e58cff;
  border-radius: 10px;
  margin-right: 50px;
  padding: 2vw;
}
.correct{
  margin-top:100px;
  margin-bottom: 100px;
}

.failed{
  margin-top: 100px;
  margin-bottom: 100px;
}

.wrapperWords {
  display: flex;
  margin-left: 100px;
  margin-right: 100px;
  font-size: 3vw;
  color: #2c3e50;
  padding-left: 100px;
  padding-right: 100px;
}

@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }



  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }
}
</style>