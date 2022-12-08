<template>
  <h1>Create your quiz </h1>
  <div class="wrapper">
       
      <div class="inputfields" >
        <div class="word" v-for="key in count" :key="key">
          <input type="text" v-model="values1['dynamic-field-' + key]" size="50" v-bind:placeholder="uiLabels.word" :id="key">
        </div>
      </div>
      <div class="inputfields">
        <div class="translation" v-for="key in count" :key="key">
          <input type="text" v-model="values2['dynamic-field-' + key]" size="50" v-bind:placeholder="uiLabels.translation"
            :id="key">
        </div>
      </div>

    <div class="controls">
      
      <a id="add_more_fields" @click="add"><i class="addword"></i> {{uiLabels.addWord}}</a>
      <a id="remove_fields" @click="remove"><i class="removeWord"></i> {{uiLabels.removeWord}}</a>
    </div>
    <button class="btn" @click="submit">{{uiLabels.saveQuiz}}</button>
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
      values1: {},
      values2: {},
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
    remove: function () {
      this.count--;

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
#app {
  font-family: 'Comfortaa', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


body {
  background-color: #f0f5ff;
  color: #fff;
}

.btn {
  width: 50%;
  background: #3f51b5;
  color: white;
  border: 0;
  padding: 7px;
  border-radius: 5px;
}

.wrapper {
  width: 1000px;
  margin: 40px auto;
  padding: 10px;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 10px 40px 0px rgba(47, 47, 47, .1);
}



.inputfields{
  display: inline-block;

}



input[type="text"] {
  padding: 10px;
  margin: 30px;
  display: block;
  border-radius: 20px;
  border: 1px solid lightgrey;
  background: none;
  width: 274px;
  color: black;
}

input[type="text"]:focus {
  outline: none;
}

.controls {
  width: 294px;
  margin: 15px auto;
}

.controls:hover{
  cursor: pointer;
}

#remove_fields {
  float: right;
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
</style>
