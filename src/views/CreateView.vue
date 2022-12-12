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
        <div class="addSign">
          +
        </div>
      </a>
    </div>

    <button class="saveQuizButton" @click="submit">{{ uiLabels.saveQuiz }}</button>
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
      count: 1,
      words: [],
      translation: [],
      uiLabels: {},

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
  },

  methods: {
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
  grid-gap: 30px;
  grid-template-columns: 200px 200px;
  width: 300px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
}

.addSign {
  width: 60px;
  height: 60px;
  color: #56c770;
  font-size: 60px;
}

.addSign:hover {
  cursor: pointer;
  font-size: 65px;
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
  border-radius: 15px;
  border-color: rgb(227, 123, 123);
  margin: 2.5rem;
  color: white;
  background-color: rgb(235, 76, 76);
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 15px;
}

.exitbutton:hover {

  cursor: pointer;
  width: 5%;
  height: 4%;
  background-color: rgb(235, 60, 60);
}
</style>
