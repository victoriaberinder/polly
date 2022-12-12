<template>
  <header>
    <div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav">
    </div>
    <div class="logo"><img src="https://static.showit.co/400/1yzlYawSRsyajrqRf5NsQg/115216/books1.png">Glosor</div>
  </header>

  <body id="body">
    <img id="background" src="https://static.vecteezy.com/system/resources/previews/001/198/033/non_2x/world-map-png.png" alt="map">
    <div class="wrapper1">
      <button class="buttons" @click="create">{{uiLabels.createButton}}</button>
      <button class="buttons" @click="$router.push('/play/'+lang)">{{uiLabels.playButton}}</button>
    </div>

    <ResponsiveNav v-bind:hideNav="hideNav">
      <button class="languagebutton" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
      <!--<router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>-->
    </ResponsiveNav>
  </body>

  <!--<router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>
  <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>-->


</template>


<script>
import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  components: {
    ResponsiveNav
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: "en",
      hideNav: true,
      quizId: ""
    }
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
      console.log("StartView.vue created")
      console.log(labels)
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en")
        this.lang = "sv"
      else
        this.lang = "en"
      socket.emit("switchLanguage", this.lang)
    },
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    },

    create: function() {
      this.$router.push('/create/'+this.lang)
      for(let i=0; i<5; i++){
        let random= Math.floor(Math.random()*10)
        this.quizId+= random.toString()
      }
      console.log(this.quizId)
      socket.emit("createQuiz", {quizId: this.quizId, lang: this.lang })
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa&display=swap');

  header {
    font-family: 'Comfortaa', cursive;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
    background-color: #d8ecff;
  }
  .logo {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 5.0rem;
    color: white;
    padding-top:0.2em;
  }
  .logo img {
    height:6.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem; 
  }
  .hamburger {
    color:white;
    width:1em;
    display: flex;
    align-items: center;
    justify-content: left;
    padding:0.5rem;
    top:0;
    left:0;
    height: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
  }
  #body{
    font-family: 'Comfortaa', cursive;
    background-color: #d8ecff;
    


  }
  #background {
    margin-left: 160px;
    width: 70%;
    display: grid;
    padding: 3%;
    filter: invert(1);
  }

.buttons:hover {
    cursor: pointer;
    background-color:#56c770;
  }

.languagebutton:hover {
    cursor: pointer;
    background-color: white;
}

.languagebutton{
  font-family: 'Comfortaa', cursive;
  background-color: rgb(225, 224, 224);
  border-radius: 15px;
  border-color: white;
  margin-left: 20px;
  margin-top: -50px;
  text-transform: uppercase;
  width: 12rem;
  height: 3rem;
}

.headline{
  font-size: 75px;
  position: absolute;
  text-align: center;
  margin-left: 520px;
  color: white;
}
.wrapper1{
  position: absolute;
  margin-left: 350px;
  margin-top: -500px;
}
  .buttons {
    font-family: 'Comfortaa', cursive;
    font-size: 50px;
    object-position: center;
    width: 18rem;
    height: 6rem;
    border-radius: 15px;
    border-color: white;
    margin: 2.5rem;
    color: white;
    background-color: #3c78d8ff;
    text-transform: uppercase;
  }

.hide {
  background-color: #d8ecff;
}

@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }
}

</style>
