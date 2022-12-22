<template>
  <h1>{{ uiLabels.playHeader }}</h1>

  <div class="wrapper3">
      <div v-for="(quiz, key) in quizes" v-bind:key="key">
        <div class="size">
          <p id="title">
            {{ key }} : {{ quiz.title }}
          </p>
        </div>
        <div class="size sizeButtons">
          <button class="playbutton" @click="$router.push('/flash/' + lang + '/' + key)">Play</button>
          <button class="editbutton" @click="edit(key)">Edit</button>
          <a @click="remove(key)" title="Remove word">
            <button class="deletebutton">Delete</button>
          </a>
          
        </div>
        <hr>
      </div>
      <button class="ButtonCreateNew"> Create new quiz</button>
      
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
      siteId: "edit"

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
    }

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

.playbutton {
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 120px;
  height: 32px;
  background: #a8e58cff;
  color: black;
  border: 0;
  border-color: black;
  border-radius: 10px;
  padding: 7px;
  margin-left: 7px;
  
}

.editbutton {
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 120px;
  height: 32px;
  background: rgb(255, 227, 141);
  color: black;
  border: 0;
  border-color: black;
  padding: 7px;
  border-radius: 10px;
  margin-left: 7px;
  
}

.deletebutton {
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 120px;
  height: 32px;
  background: rgb(235, 76, 76);
  color: white;
  border: 0;
  border-color: black;
  border-radius: 10px;
  padding: 7px;
  margin-left: 7px;
  
}

.ButtonCreateNew{
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 200px;
  height: 32px;
  background: rgb(108, 169, 227);
  color: rgb(0, 0, 0);
  border: 0;
  border-color: black;
  border-radius: 10px;
  padding: 7px;
  

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

</style>