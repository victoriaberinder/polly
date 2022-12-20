<template>
  <h1>{{ uiLabels.playHeader }}</h1>
  
  <div class="wrapper3">
    <div class="allQuizes">
    <div v-for="(quiz, key) in quizes" v-bind:key="key">
          <p>
             {{ quiz.title}} <br>
          
          </p>
          </div>
        </div>
    <div class="allQuizes">
      <div v-for="key in quizes" :key="key" >
        <button class="playbutton" @click="$router.push('/flash/' + lang)">Play</button>
      </div>
    </div>
    <div class="allQuizes">
      <div v-for="key in quizes" :key="key">
        <button class="editbutton" @click="$router.push('/create/' + lang)">Edit</button>
      </div>
    </div>
    <div class="allQuizes">
      <div v-for="key in quizes" :key="key">
          <a  @click="remove(key)" title="Remove word">
            <button class="deletebutton">Delete</button>
          </a>
      </div>
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

  data: function () {
    return {

      lang: "",
      quizId: "",
      count: 1,
      data: {},
      uiLabels: {},
      quizes: {},
      allQuizes: {}

    }
  },


  created: function () {

    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.emit("getAllQuizes")
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    /* socket.on("dataUpdate", (data) =>
      this.data = data
    ) */
    socket.on("allQuizes", (data) => {
      this.quizes = data
    }
    )
    

    socket.on("quizCreated", (data) =>
      
      this.quizId = data.quizId,
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
      this.quizes--;
      this.quiz.splice(key, 1)
      this.play.splice(key,1)
      this.editbutton.splice(key,1)

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

h1 {
  font-family: 'Comfortaa', cursive;
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
  font-family:'Comfortaa', cursive ;
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
  padding: 7px;
  border-radius: 15px;
  margin-left: 32px;
  margin-bottom: 10px;
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
  border-radius: 15px;
  margin-left: 32px;
  margin-bottom: 10px;
}

.deletebutton{
  font-family: 'Comfortaa', cursive;
  font-size: 20px;
  width: 120px;
  height: 32px;
  background: rgb(235, 76, 76);
  color: white;
  border: 0;
  border-color: black;
  padding: 7px;
  border-radius: 15px;
  margin-left: 32px;
  margin-bottom: 10px;
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

.allQuizes {
  display: inline-block;

}
</style>