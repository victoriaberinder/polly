<template>
  <header>
    <div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav">
    </div>
    <div class="logo">Polly polling tool</div>
  </header>
  <ResponsiveNav v-bind:hideNav="hideNav">
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <router-link v-bind:to="'/create/'+lang">{{uiLabels.createPoll}}</router-link>
    <a href="">Pricing</a>
    <a href="">About</a>
    <a href="">FAQ</a>
  </ResponsiveNav>

  <label>
    Write poll id: 
    <input type="text" v-model="id">
  </label>
  <router-link v-bind:to="'/poll/'+id" tag="button">{{uiLabels.participatePoll}}</router-link>
</template>

<script>
import ResponsiveNav from '@/components/ResponsiveNav.vue';
import io from 'socket.io-client';
const socket = io();

export default {
  name: 'Start',
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
    background-color: gray;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  }

  nav {
    background-color: lightgray;
    width:100%;
    height: 4em;
    display: grid;
    grid-template-columns: repeat(auto-fit, 10em);
  }

  nav a {
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: gray;
    display: grid;
    align-items: center;
    justify-content: center;
    border-left: 1px solid gray;
  }
  .logo {
    text-transform: uppercase;
    letter-spacing: 0.3em;
    font-size: 2.5rem;
    color: white;
    padding-top:0.2em;
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

@media screen and (max-width:50em) {
  nav {
    position: absolute;
    height:100vh;
    top: 3em;
    left: 0;
    width:12em;
    display: grid;
    grid-template-rows: repeat(auto-fit, 2em);
    transition: 0.5s;
  }
  nav a {
    justify-content: left;
    padding-left: 1em;
  }
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
