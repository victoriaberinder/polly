<template>

  <body>
    <h1> My result</h1>
    <p>Title: {{ quiz.title }} </p>
    <div class="wrapperWords">
      <div v-if="correctWords.length > 0" class="correctWords">
        <div class="correct">
          <div v-for="(word, index) in correctWords" v-bind:key="index">
            {{ word }} - {{ correctTranslations[index] }}
          </div>
        </div>

      </div>
      <div v-if="failedWords.length > 0" class="failedWords">
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
      <button v-else-if="failedWords.length == 0" class="tryagain" @click="saving"> Show toplist</button>
    </div>
    <footer>
      <div>
        <!-- skapa lyssnare som skickar iväg pageLoaded, som i sin tur returnerar uiLabels (och eventuellt annan typ av data)-->
        <button class="exitbutton" @click="$router.push('/')">Exit</button>
      </div>
    </footer>
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
    saving: function () {
      this.$router.push('/finalresult/' + this.lang + '/' + this.quizId)
      console.log("username:", this.username)
      //socket.emit("myTime", { quizId: this.quizId, username: this.username })
      //socket.emit("saveMyResult", { quizId: this.quizId, username: this.username, failedWords: this.failedWords, correctWords: this.correctWords, failedTranslations: this.failedTranslations, correctTranslations: this.correctTranslations })
    },
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
  margin-right: 90%;
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
  width: 300px;
  height: auto;
  background-color: rgb(235, 76, 76);
  border-radius: 10px;
  margin-left: 5%;
  margin-right: 5%;
  max-width: 100%;
  overflow: hidden;
}

.correctWords {
  width: 7vw;
  height: auto;
  background-color: #56c770;
  border-radius: 10px;
  margin-left: 5%;
  margin-right: 5%;
  max-width: 100%;
  overflow: hidden;
}

.correct {
  margin-top: 7vw;
  margin-bottom: 7vw;
  width: 100%;
  height: 100%;
  word-wrap: break-word;
}

.failed {
  margin-top: 7vw;
  margin-bottom: 7vw;
  width: 100%;
  height: 100%;
  word-wrap: break-word;
}

.wrapperWords {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 3vw;
  color: #2c3e50;
  padding-left: 10%;
  padding-right: 10%;
}

@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>