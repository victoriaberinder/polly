<template>
  <div class="startPage">
    <div class="startPagehead">
      <img src="/img/lip.png">
      <!--https://static.showit.co/400/1yzlYawSRsyajrqRf5NsQg/115216/books1.png">-->
      
      Flipgloss
    </div>

    <body>
      <div class="startWrapper1 startBackground">
        <button class="startButtonCreate" @click="create">{{ uiLabels.createButton }}</button>
        <button class="startButtonPlay" @click="$router.push('/joinquiz/' + lang)">{{ uiLabels.playButton }}</button>
        <div class="startLanguage">
          <img v-if="lang =='en'" src= https://www.nationalflags.shop/WebRoot/vilkasfi01/Shops/2014080403/53E4/A986/7055/D0CD/B15F/0A28/100A/F37A/Flag_of_Sweden_ml.png class = "startPic" v-on:click="switchLanguage">
          <img v-else-if="lang =='sv'" src ="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png" class ="startPic" v-on:click="switchLanguage">
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

.startPage {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: fixed;
  background-color: #d8ecff;
}
.startPagehead {
  margin-top: 50px;
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

.startPagehead img {
  width: auto;
  height: 12vw;
  margin-right: 4%;
  transform: rotate(45deg);
  opacity: 0.7;
}

.startLanguage {
  font-family: 'Comfortaa', cursive;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  filter: invert(1);
}

.startPic {
  margin-top: 120px;
  width: 5rem;
  height: 2.5rem;
  border-radius: 70px;
  border-color: rgb(49, 72, 110);
  border: 50px;
}

.startPic:hover {
  cursor: pointer;
  transform: scale(1.1); 
}

body {
  background-color: #d8ecff;
}

.startWrapper1 {
  padding: 10%;
}

.startBackground {
  background-image: url("https://static.vecteezy.com/system/resources/previews/001/198/033/non_2x/world-map-png.png");
  background-size: cover;
  background-position: center;
  filter: invert(1);
  height: 100vh;
}


.startButtonCreate:hover {
  cursor: pointer;
  background-color: rgb(42, 83, 149);
}

.startButtonPlay:hover {
  cursor: pointer;
  background-color: rgb(42, 83, 149);
}

.startButtonCreate {
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

.startButtonPlay {
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

  .startWrapper1 {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: min-content;
    justify-items: center;
  }

  .startLanguage {
    padding-bottom: 50%;
  }

}
</style>
