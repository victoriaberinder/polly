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
      <button class="buttonCreate" @click="create">{{uiLabels.createButton}}</button>
      <button class="buttonPlay" @click="$router.push('/play/'+lang)">{{uiLabels.playButton}}</button>
    </div>

    
      <button class="languagebutton" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
      <!--<router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>-->
   
  </body>

  <!--<router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>
  <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link>-->


</template>


<script>
//import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'StartView',
  //components: {
    //ResponsiveNav
 // },
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
      //console.log("StartView.vue created")
      //console.log(labels)
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
      
      for(let i=0; i<5; i++){
        let random= Math.floor(Math.random()*10)
        this.quizId+= random.toString()
      }
      this.$router.push('/create/'+this.lang+'/'+this.siteId +'/'+this.quizId)
      console.log(this.quizId)
      //socket.emit("createQuiz", {quizId: this.quizId, lang: this.lang })
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


.wrapper1{
  margin: 0;
  top:50%;
  left:50%;
 
  
} 
  .buttons {
    font-family: 'Comfortaa', cursive;
    font-size: 50px;
    width: 18rem;
    height: 6rem;
    border-radius: 15px;
    border-color: white;
    margin: 2.5rem;
    color: white;
    background-color: #3c78d8ff;
    text-transform: uppercase;
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

  .buttons {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hide {
    left:-12em;
  }
}

</style>
