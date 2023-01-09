<template>
  <h1>{{ uiLabels.finalResultHeader }}</h1>
  <div>

    <h1>Music Player</h1>
    <audio ref="audio" :src="audioUrl" controls></audio>
    <button @click="play">Play</button>
    <button @click="pause">Pause</button>
  </div>


  <div class="wrapper3">
    <div v-for="(username, key) in username" v-bind:key="key">
      {{ user[key] }}
    </div>

  </div>

  <div>
    <!-- skapa lyssnare som skickar iväg pageLoaded, som i sin tur returnerar uiLabels (och eventuellt annan typ av data)-->
    <button class="exitbutton" @click="$router.push('/')">Exit</button>
  </div>
  <!--<div class="firework">Firework</div>-->

  <div ref="dottedLine" :class="'animation-' + animationId">
    <div class="dot" v-for="i in dots" :key="i">
    </div>
    <div class="firework" v-for="i in 5" :key="i">FIREWORK</div>
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
      newQuizId: "",
      username: "",
      user: {},
      audioUrl: '/audio/musik.mp3'
    }
  },


  created: function () {

    this.lang = this.$route.params.lang;
    this.quizId = this.$route.params.id;
    //this.username = this.$route.params.username;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.emit("getQuiz", this.quizId);
    socket.on("quiz", (data) => {
      this.quiz = data

    })


  },

  mounted() {
    this.$refs.audio.play();
  },

  methods: {
    play() {
      this.$refs.audio.play();
    },
    pause() {
      this.$refs.audio.pause();
    }
  }
}

</script>

<style>
body {
  background-color: #d8ecff;
}

hr {
  margin-top: 2px;
  border-top: 1px solid #d8ecff;
}

h1 {
  font-family: 'Comfortaa', cursive;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#title {
  text-align: left;
  font-size: 25px;
  margin-left: 5%;
}

.size {
  width: 500px;
  height: 60px;
  display: inline-block;

}

.sizeButtons {
  text-align: right;

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
  font-family: 'Comfortaa', cursive;
  /*box-shadow: 0px 10px 40px 0px rgba(47, 47, 47, .1);*/
}

.firework {
  background: linear-gradient(to top, rgb(111, 0, 255), rgb(174, 0, 255), rgb(255, 0, 204));
  background-size: 100% 100%;
  animation: firework 1s linear infinite;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #f00;
  display: inline-block;
}


@keyframes firework {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  80% {
    transform: translateY(-50vh) scale(1.5);
    opacity: 0.5;
  }

  100% {
    transform: translateY(-100vh) scale(2);
    opacity: 0;
  }
}

.firework {
  animation: firework 2s linear;
}

.explosion {
  animation: explosion 0.5s linear;
  animation-delay: 2s;
}
</style>