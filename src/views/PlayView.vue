<template>
  <h1>{{ uiLabels.playHeader }}</h1>

  <div class="PlayWrapper3">
    <div class="allbuttons">
      <div v-for="(quiz, key) in quizes" v-bind:key="key">
        <div id="title">
          {{ key }} : {{ quiz.title }}
        </div>
        <div class="allbuttonsRight">
          <button class="playbutton" @click="play(key)">{{ uiLabels.play }}</button>
          <button class="editbutton" @click="edit(key)">{{ uiLabels.edit }}</button>
          <a @click="remove(key)" title="Remove word">
            <button class="deletebutton">{{ uiLabels.delete }}</button>
          </a>
        </div>


        <hr>
      </div>
    </div>
    <button class="ButtonCreateNew" @click="create"> {{ uiLabels.createNewQuiz }}</button>

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
      count: 1,
      data: {},
      uiLabels: {},
      quizes: {},
      allQuizes: {},
      siteId: "edit",
      newQuizId: "",


    }
  },


  created: function () {

    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.emit("getAllQuizes")
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    //socket.on("quizesUpdated", (data) =>
    //  this.quizes = data
    //) 
    socket.on("allQuizes", (data) => {
      this.quizes = data
      //console.log("quizes:", data)
    }
    )

    socket.on("quizCreated", (data) =>
      this.quizId = data.quizId,
    )

  },

  methods: {

    add: function () {
      this.count++;


    },
    remove: function (key) {

      socket.emit("deleteQuiz", key);
      socket.emit("getAllQuizes");
      socket.on("allQuizes", (data) => {
        this.quizes = data
        console.log("quizes1:", data)
      }
      )
    },

    edit: function (key) {
      this.$router.push('/create/' + this.lang + '/' + this.siteId + '/' + key)
    },


    submit: function () {
      for (var key of Object.keys(this.values)) {
        console.log(key + " -> " + this.values[key])
      }
    },
    create: function () {

      for (let i = 0; i < 5; i++) {
        let random = Math.floor(Math.random() * 10)
        this.newQuizId += random.toString()
      }

      this.$router.push('/create/' + this.lang + '/new/' + this.newQuizId)
      console.log(this.newQuizId)
    },

    play: function (quizId) {
      socket.emit("joinQuiz", quizId);
      socket.emit('deleteUsers', quizId)
      this.$router.push('/username/' + this.lang + '/' + quizId)

    }


  }
}

</script>

<style>
body {
  background-color: #d8ecff;
}

hr {
  margin-top: 2%;
  margin-bottom: 2%;
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

#title {
  text-align: left;
  font-size: 3vw;
  margin-left: 5%;
  margin-top: 5%;
}

/*.size {
  width: 500px;
  height: 60px;
  display: inline-block;

}

.sizeButtons {
  text-align: right;
}*/

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

.PlayWrapper3 {
  width: 75vw;
  margin: 40px auto;
  padding: 10px;
  border-radius: 30px;
  background: #ffffff;
  margin-bottom: 100px;
  font-size: 20px;
  font-family: 'Comfortaa', cursive;
}

.allbuttons {
  display: grid;
}

.allbuttonsRight {
  /*display: inline-flex;
  justify-content: flex-end;
  flex-wrap: wrap;*/
  width: 50vw;
  margin-left: 30%;
  margin-right: 5%;
}

.playbutton {
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 175px;
  height: 45px;
  background: #a8e58cff;
  color: black;
  border: 0;
  border-color: black;
  border-radius: 10px;
  padding: 7px;
  margin-top: 1%;
  margin-left: 7px;
}

.editbutton {
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 175px;
  height: 45px;
  background: rgb(255, 227, 141);
  color: black;
  border: 0;
  border-color: black;
  padding: 7px;
  border-radius: 10px;
  margin-top: 1%;
  margin-left: 7px;
}

.deletebutton {
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 175px;
  height: 45px;
  background: rgb(235, 76, 76);
  color: white;
  border: 0;
  border-color: black;
  border-radius: 10px;
  padding: 7px;
  margin-top: 1%;
  margin-left: 7px;
}

.ButtonCreateNew {
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 250px;
  height: 45px;
  background: rgb(108, 169, 227);
  color: rgb(0, 0, 0);
  border: 0;
  border-color: black;
  border-radius: 10px;
  padding: 7px;
}

.ButtonCreateNew:hover {
  cursor: pointer;
  background: #a8e58cff;
}

.playbutton:hover {
  cursor: pointer;
  background-color: rgb(135, 229, 92);
}


.editbutton:hover {
  cursor: pointer;
  background-color: rgb(253, 213, 92);
}

.deletebutton:hover {
  cursor: pointer;
  background-color: rgb(241, 15, 15);
}

@media only screen and (max-width: 750px) {
  #title {
    font-size: 25pt;
  }
}


</style>