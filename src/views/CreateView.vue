<template>
  <h1>{{ uiLabels.createHeader }}</h1>
  <div class="wrapper">
    <div class="inputfields">
      <div class="word" v-for="key in count" :key="key">
        <input type="text" v-model="words[key]" size="50" v-bind:placeholder="uiLabels.word" :id="key">
      </div>
    </div>

    <div class="inputfields">
      <div class="translation" v-for="key in count" :key="key">
        <input type="text" v-model="translation[key]" size="50" v-bind:placeholder="uiLabels.translation" :id="key">
      </div>
    </div>

    <div class="inputfields">
      <div v-for="key in count" :key="key">
        <a id="removeSignBox">
          <a class="removeSign" @click="remove(key)" title="Remove word">
            x
          </a>
        </a>
      </div>
    </div>

    <div class="controls">
      <a id="add_more_fields" @click="add" title="Add word">
        <div>
          <button class="addSign"> Add word</button>
        </div>
      </a>
    

    <button class="saveQuizButton" @click="save">{{uiLabels.saveQuiz}}</button>
  </div>

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

  name: 'App',
  data: function () {
    return {

      lang: "",
      quizId: "",
      count: 1,
      words: [],
      translation: [],
      data: {},
      uiLabels: {},

    }
  },


  created: function () {
    console.log("data:", this.quizId)
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("quizCreated", (data) =>
      this.data = data,
      //this.quizId = data.quizId

      console.log("data:", this.data)
    )
    
  },

  methods: {

    //testar att lägga till funktionen createQuiz
    //createQuiz: function () {
      //socket.emit("createQuiz", {quizId: this.quizId, lang: this.lang })
      //console.log("quizId:", this.quizId)
    //},

    add: function () {
      this.count++;
      console.log(this.$route)
      // this.$route.path = '/create/'+123

    },
    remove: function (key) {
      this.count--;
      this.words.splice(key, 1)
      this.translation.splice(key, 1)

    },

    submit: function () {
      for (var key of Object.keys(this.values)) {
        console.log(key + " -> " + this.values[key])
      }
    },
    
    save:  function (){
      this.$router.push('/name/'+this.lang)
      //socket.emit("addWord", {w: this.words, t: this.translation} )
    }

  }
}

</script>

<style>
#app {
  font-family: 'Comfortaa', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background-color: #d8ecff;
  color: #fff;
}

.saveQuizButton {
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 180px;
  height: 40px;
  background: #a8e58cff;
  color: black;
  border: 0;
  border-color: black;
  padding: 7px;
  border-radius: 15px;
  
}

.saveQuizButton:hover {
  cursor: pointer;
  background-color: rgb(135, 229, 92);
}

.wrapper {
  width: 1000px;
  margin: 40px auto;
  padding: 10px;
  border-radius: 30px;
  background: #ffffff;
  /*box-shadow: 0px 10px 40px 0px rgba(47, 47, 47, .1);*/
}

.inputfields {
  display: inline-block;

}

input[type="text"] {
  padding: 10px;
  margin: 30px;
  display: block;
  border-radius: 20px;
  border: 1px solid lightgrey;
  background: none;
  width: 250px;
  height: 20px;
  font-size: 13pt;
  font-family: 'Comfortaa', cursive;
  color: black;
}

input[type="text"]:focus {
  outline: none;
}

.controls {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 200px 200px;
  width: 300px;
  padding: 20px;
  margin-left: 55%;
  margin-right: 10%;
}

.addSign {
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 180px;
  height: 40px;
  background:rgb(255, 227, 141);
  color: black;
  border:0;
  border-color: black;
  border-radius: 15px;
}

.addSign:hover {
  cursor: pointer;
  background-color: rgb(253, 213, 92);
}

#removeSignBox {
  padding: 10px;
  margin: 30px;
  display: block;
  width: 50px;
  height: 20px;
}

.removeSign {
  width: 60px;
  height: 60px;
  color: rgb(235, 76, 76);
  font-size: 50px;
}

.removeSign:hover {
  cursor: pointer;
  font-size: 65px;
}


.controls a i.fa-minus {
  margin-right: 5px;
}

a {
  color: black;
  text-decoration: none;
}

h1 {
  text-align: center;
  font-size: 48px;
  color: #232c3d;
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

#wrapping{
  display: inline-block;

  grid-gap: 5%;
  grid-template-columns: 50% 50%;
}
</style>
