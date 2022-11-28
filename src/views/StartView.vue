<template>
  <header>
    <div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav">
    </div>
    <div class="logo"><img src="/img/logo.png">Glosor</div>
  </header>

  <body id="body">
    <h1 class="headline">
      WELCOME!
    </h1>
    <img id="background" src="https://static.vecteezy.com/system/resources/previews/001/198/033/non_2x/world-map-png.png" alt="map">
    <div class="wrapper">
      <button class="buttons" @click="$router.push('/create/'+lang)">CREATE</button>
      <button class="buttons" @click="$router.push('/play/'+lang)">PLAY</button>
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
      hideNav: true
    }
  },
  created: function () {
    socket.on("init", (labels) => {
      this.uiLabels = labels
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
    }
  }
}
</script>
<style scoped>
  header {
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
    background-color: #b8f3ff;
  }
  .logo {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 2.5rem;
    color: white;
    padding-top:0.2em;
  }
  .logo img {
    height:2.5rem;
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
    background-color: #b8f3ff;
  }
  #background {
    margin-left: 160px;
    width: 70%;
    display: grid;
    padding: 3%;
    background-color: #b8f3ff;
  }

.buttons:hover {
    cursor: pointer;
    background-color:#a1f196;
  }

.languagebutton:hover {
    cursor: pointer;
    background-color: white;
}

.languagebutton{
  background-color: grey;
}

.boxA {
    float: left;
    width: 200px;
    margin-left: 200px;
    margin-top: 10px;
    padding: 5px;
    border: 2px solid blue;
    text-align: center;
}
.boxB {
    float: left;
    width: 200px;
    margin-left: 200px;
    margin-top: 10px;
    padding: 5px;
    border: 2px solid blue;
    text-align: center;
}

.headline{
  font-size: 75px;
  position: absolute;
  text-align: center;
  margin-left: 520px;
  color: white;
}
.wrapper{
  position: absolute;
  margin-left: 350px;
  margin-top: -500px;
}
  .buttons {
    font-size: 50px;
    object-position: center;
    width: 18rem;
    height: 6rem;
    border-radius: 15px;
    border-color: white;
    margin: 2.5rem;
    color: white;
    background-color: #63e2fb;
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
