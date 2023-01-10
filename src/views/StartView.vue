<template>
  <div class="page">
    <div class="pagehead">
      <img src="https://static.showit.co/400/1yzlYawSRsyajrqRf5NsQg/115216/books1.png">
      Glosor
    </div>

    <body>
      <div class="wrapper1 background">
        <button class="buttonCreate" @click="create">{{ uiLabels.createButton }}</button>
        <button class="buttonPlay" @click="$router.push('/joinquiz/' + lang)">{{ uiLabels.playButton }}</button>
        <div class="language">
          <button class="languagebutton" v-on:click="switchLanguage">
            {{ uiLabels.changeLanguage }}
          </button>
        </div>
      </div>
    </body>
  </div>
</template>


<script>
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  data: function () {
    return {
      uiLabels: {},
      quizId: "",
      lang: "en",
      hideNav: true,
      siteId: "new"

    }
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function () {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },

    create: function () {

      for (let i = 0; i < 5; i++) {
        let random = Math.floor(Math.random() * 10)
        this.quizId += random.toString()
      }
      this.$router.push('/play/' + this.lang)
      console.log(this.quizId)
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

.page {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: fixed;
  background-color: #d8ecff;
}
.pagehead {
  display: flex;
  font-family: 'Comfortaa', cursive;
  background-color: #d8ecff;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 10vw;
  color: white;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.pagehead img {
  width: auto;
  height: 10vw;
  margin-right: 10px;
}

.language {
  font-family: 'Comfortaa', cursive;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: white;
  filter: invert(1);
}

.languagebutton:hover {
  cursor: pointer;
  background-color: rgb(214, 214, 214);
  color: white;
}

.languagebutton {
  font-family: 'Comfortaa', cursive;
  font-size: 1rem;
  width: 15rem;
  height: 4rem;
  border-radius: 15px;
  border-color: white;
  color: white;
  background-color: rgb(225, 224, 224);
  text-transform: uppercase;
  margin-right: 3%;
  margin-left: 3%;
  margin-top: 8%;
  margin-bottom: 3%;
}

body {
  background-color: #d8ecff;
}

.wrapper1 {
  padding: 10%;
}

.background {
  background-image: url("https://static.vecteezy.com/system/resources/previews/001/198/033/non_2x/world-map-png.png");
  background-size: cover;
  background-position: center;
  filter: invert(1);
  height: 100vh;
}

.buttons:hover {
  cursor: pointer;
  background-color: #56c770;
  background-color: rgb(42, 83, 149);
}

.buttonCreate:hover {
  cursor: pointer;
  background-color: rgb(42, 83, 149);
}

.buttonPlay:hover {
  cursor: pointer;
  background-color: rgb(42, 83, 149);
}

.buttonCreate {
  font-family: 'Comfortaa', cursive;
  font-size: 50px;
  width: 18rem;
  height: 6rem;
  border-radius: 15px;
  border-color: white;
  color: white;
  background-color: #3c78d8ff;
  text-transform: uppercase;
  filter: invert(1);
  margin-right: 3%;
  margin-left: 3%;
  margin-top: 3%;
  margin-bottom: 3%;
}

.buttonPlay {
  font-family: 'Comfortaa', cursive;
  font-size: 50px;
  width: 18rem;
  height: 6rem;
  border-radius: 15px;
  border-color: white;
  color: white;
  background-color: #3c78d8ff;
  text-transform: uppercase;
  filter: invert(1);
  margin-right: 3%;
  margin-left: 3%;
  margin-top: 3%;
  margin-bottom: 3%;
}

@media only screen and (max-width: 820px) {

  .wrapper1 {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: min-content;
    justify-items: center;
  }

  .language {
    padding-bottom: 50%;
  }

}
</style>
