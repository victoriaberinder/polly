<template>
  <h1>{{ uiLabels.finalResultHeader }}</h1>

  <div class="wrapper3">
    <div v-for="(username, key) in username" v-bind:key="key">
        {{ user[key] }}
    </div>
      <p>{{ data }}</p>
  </div>

  <div>
    <!-- skapa lyssnare som skickar iväg pageLoaded, som i sin tur returnerar uiLabels (och eventuellt annan typ av data)-->
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
      quizId: "",
      quiz: {},
      uiLabels: {},
      newQuizId: "",
      username: '',
      users: {}

    }
  },


created: function () {

this.lang = this.$route.params.lang;
this.quizId = this.$route.params.id;
//this.username = this.$route.params.username;
socket.emit("pageLoaded", this.lang);
socket.on("init", (labels) => {
  this.uiLabels = labels
})
// socket.emit("getQuiz", this.quizId);
// socket.on("quiz", (data) => {
//   this.quiz = data

// })


socket.on('getResults', (data)=>{
  this.quiz = data
  this.users = data.users
  console.log(data.users)

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

hr{
  margin-top: 2px;
  border-top: 1px solid #d8ecff;
}

h1 {
  font-family: 'Comfortaa', cursive;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#title{
  text-align: left;
  font-size: 25px;
  margin-left: 5%;
}
.size {
  width: 500px;
  height: 60px;
  display: inline-block;

}

.sizeButtons{
  text-align: right;

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

.wrapper3 {
  width: 1000px;
  margin: 40px auto;
  padding: 10px;
  border-radius: 30px;
  background: #ffffff;
  margin-bottom: 100px;
  font-size: 20px;
  font-family: 'Comfortaa', cursive;
  /*box-shadow: 0px 10px 40px 0px rgba(47, 47, 47, .1);*/
}



</style>