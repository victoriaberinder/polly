<template>
  <div class="createH1">{{ uiLabels.createHeader }}</div>

  <div action="" method="get">
    <div class="createTitleField">
      <input class="createInput2" type="createText" v-model="title" size="50" v-bind:placeholder="uiLabels.name">
    </div>

    <div class="createWrapper">
      <div class="createInputfields">
        <div class="createWord" v-for="key in count" :key="key">
          <input class="createInput" type="createText" v-model="words[key - 1]" size="50"
            v-bind:placeholder="uiLabels.word" :id="key">

        </div>
      </div>

      <div class="createInputfields">
        <div class="createTranslation" v-for="key in count" :key="key">

          <input class="createInput" type="createText" v-model="translation[key - 1]" size="50"
            v-bind:placeholder="uiLabels.translation" :id="key">
        </div>
      </div>

      <div class="createInputfields">
        <div v-for="key in count" :key="key">
          <a id="createRemoveSignBox">
            <a class="createRemoveSign" @click="remove(key)" title="Remove word">
              x
            </a>
          </a>
        </div>
      </div>

      <div class="createControls">
        <a id="create_add_more_fields" @click="add">
          <div>
            <button class="createAddSign">{{ uiLabels.addWord }}</button>
          </div>
        </a>


        <button v-bind:disabled="title == ''" class="createSaveQuizButton1" @click="save">{{
          uiLabels.saveQuiz
        }}</button>
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

  name: 'App',
  data: function () {
    return {

      lang: "",
      count: 1,
      quizId: "",
      words: [],
      translation: [],
      quiz: {},
      uiLabels: {},
      title: "",
      siteId: ""

    }
  },

  created: function () {
    this.lang = this.$route.params.lang;
    this.quizId = this.$route.params.id;
    this.siteId = this.$route.params.siteId;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.quiz = data
    )
    socket.on("quizCreated", (data) =>
      this.quiz = data,
      //this.quizId = data.quizId
    )
    if (this.siteId == 'edit') {
      socket.emit("getQuiz", this.quizId);
      socket.on("quiz", (data) => {
        this.quiz = data
        this.words = data.words
        this.translation = data.translations
        this.title = data.title

        if (data.words.length != 0) {
          this.count = data.words.length
        }
      }

      )
    }


  },




  methods: {

    //testar att lägga till funktionen createQuiz
    //createQuiz: function () {
    //socket.emit("createQuiz", {quizId: this.quizId, lang: this.lang })
    //console.log("quizId:", this.quizId)
    //},

    add: function () {
      if (this.count < 20 && this.words.length == this.count && this.translation.length == this.count) {
        this.count++;
      }


    },
    remove: function (key) {
      this.count--;
      this.words.splice(key - 1, 1)
      this.translation.splice(key - 1, 1)

    },

    submit: function () {
      for (var key of Object.keys(this.values)) {
        console.log(key + " -> " + this.values[key])
      }
    },

    save: function () {

      console.log("ID:", this.siteId)
      if (this.siteId == "new") {
        socket.emit("createQuiz", { quizId: this.quizId, lang: this.lang })
      }
      console.log(this.words, this.translation, this.title)
      this.$router.push('/play/' + this.lang)
      socket.emit("addWord", { q: this.quizId, w: this.words, t: this.translation, title: this.title })

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
}

body {
  background-color: #d8ecff;
  color: #fff;
}

.createSaveQuizButton1 {
  font-family: 'Comfortaa', cursive;
  background: #a8e58cff;
  color: black;
  border: 0;
  border-color: black;
  padding: 7px;
  border-radius: 15px;
  width: 20vw;
  height: 40px;
  font-size: 12pt;
}

.createSaveQuizButton1:hover {
  cursor: pointer;
  background-color: rgb(135, 229, 92);
}

.createWrapper {
  border-radius: 30px;
  background: #ffffff;
  margin-right: 10%;
  margin-left: 10%;
  display: grid;
  align-items: center;
  flex-wrap: wrap;
  grid-template-columns: 40% 40% 20%;
}


input[class="createInput"] {
  padding: 10px;
  margin: 30px;
  display: block;
  border-radius: 20px;
  border: 1px solid lightgrey;
  background: none;
  width: 25vw;
  height: 20px;
  font-size: 1rem;
  font-family: 'Comfortaa', cursive;
  color: black;
}

input[type="createText"]:focus {
  outline: none;
}

.createControls {
  display: grid;
  grid-gap: 1%;
  width: 70vw;
  padding: 2vh;
  grid-template-columns: 2fr 1fr;
  justify-items: end;
}

.createAddSign {
  font-family: 'Comfortaa', cursive;
  width: 20vw;
  height: 40px;
  font-size: 12pt;
  background: rgb(255, 227, 141);
  color: black;
  border: 0;
  border-color: black;
  border-radius: 15px;
}

.createAddSign:hover {
  cursor: pointer;
  background-color: rgb(253, 213, 92);
}

#createRemoveSignBox {
  padding: 10px;
  margin: 30px;
  display: flex;
  width: 50px;
  height: 20px;
  align-items: center;
  padding-right: 5%;
  padding-left: 5%;
}

.createRemoveSign {
  color: rgb(235, 76, 76);
  font-size: 50px;
}

.createRemoveSign:hover {
  cursor: pointer;
  font-size: 61px;
}

.createH1 {
  font-family: 'Comfortaa', cursive;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
  margin-bottom: 10px;
  font-size: 70px;
  font-weight: bold;
}

.createExitbutton {
  width: 4rem;
  height: 2rem;
  border-radius: 5px;
  border-color: rgb(227, 123, 123);
  margin: 2.5rem;
  color: white;
  background-color: rgb(235, 76, 76);
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-family: 'Comfortaa', cursive;
}

.createExitbutton:hover {

  cursor: pointer;
  width: 4rem;
  height: 2rem;
  background-color: rgb(187, 34, 34);
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

.createTitleField {
  width: 100%;
  padding-top: 2%;
  padding-bottom: 2%;
  border-radius: 30px;
  background: #d8ecff;
}

input[class="createInput2"] {
  border-radius: 50px;
  border: 1px solid lightgrey;
  background-color: white;
  width: 400px;
  height: 50px;
  font-size: 20pt;
  font-family: 'Comfortaa', cursive;
  color: black;
  text-align: center;
}

.createSaveQuizButton1:disabled {
  background-color: dimgrey;
  color: linen;
  opacity: 1;
  width: 20vw;
  height: 40px;
  font-size: 12pt;
}

@media only screen and (max-width: 470px) {
  .createSaveQuizButton1:disabled {
    font-size: 8pt;
  }

  .createAddSign {
    font-size: 8pt;
  }

  .createSaveQuizButton1 {
    font-size: 8pt;
  }

}
</style>
