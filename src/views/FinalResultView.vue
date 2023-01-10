<template>

  <main>
    <audio ref="audio" :src="audioUrl"></audio>
    <div class="pyro">
      <div class="before"></div>
      <div class="after"></div></div>
    <h1> {{ uiLabels.finalResultHeader }} </h1>

    <div class="finalWrapper">
      <div id="finalText" v-for="(user, key, index) in users" v-bind:key="key">
        {{ index+1 }} . {{ key }} :  &nbsp; &nbsp; {{ user.time }} s
     
      </div>
    
    </div>

    <div>
      <button class="exitbutton" @click="exit">Exit</button>
    </div>
  </main>

</template>
  
<script>
import io from 'socket.io-client';
const socket = io();

export default {

  data: function () {
    return {

      lang: "",
      quizId: "",
      quiz: {},
      uiLabels: {},
      newQuizId: "",
      username: "",
      users: {},
      audioUrl: '/audio/musik.mp3',
      visibility: 'hidden',
      isPlaying: false,
      topListCounter: 1,

      beforeDestroy() {
      this.$refs.audio.pause();
  }
    }
  },


  created: function () {

    this.lang = this.$route.params.lang;
    this.quizId = this.$route.params.id;
    socket.emit('joinQuiz', this.quizId)
    //this.username = this.$route.params.username;
    socket.emit("pageLoaded", this.lang);
    socket.emit('getResults', this.quizId)
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    // socket.emit("getQuiz", this.quizId);
    // socket.on("quiz", (data) => {
    //   this.quiz = data

    // })


    socket.on('getResults', (data) => {
      this.quiz = data
      this.users = data.users
      console.log(data.users)
    })
  },

  methods:{
    exit: function(){
      this.$router.push('/')
    }
  },

  mounted() {
    this.$refs.audio.play();
  }
}


</script>

<style>
body {
  
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

.finalWrapper {

  width: 50vw;
  height: 40vh;
  margin: 3vw auto;
  padding: 1vw;
  border-radius: 30px;
  background: #ffffff;
  font-size: 50px;
  font-family: 'Comfortaa', cursive;
  color: #2c3e50;
  text-align: left;

  /*box-shadow: 0px 10px 40px 0px rgba(47, 47, 47, .1);*/
}

#finalText{
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px
}

button {
  background-color: #d1c4e9;
  border: none;
  border-radius: 5px;
  color: #4a148c;
  font-size: 18px;
  padding: 10px 20px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #ba68c8;
}

button:active {
  background-color: #9575cd;
}

body {
  margin: 0;
  padding: 0;
  background: #d8ecff;
  overflow: hidden;
}

.pyro>.before,
.pyro>.after {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow:
    -120px -220px #b3e0ff,
    250px -20px #c5f5e5,
    190px 20px #a9d9ff,
    -110px -310px #ffc6e8,
    -110px -290px #fff4cc,
    -50px -310px #ffcce0,
    230px -30px #ffd9cc,
    180px -350px #ffc4f2,
    -10px -340px #9ff9ff,
    220px -390px #c9ff99,
    -70px -30px #ffc8d9,
    -110px -340px #c1c9ff,
    155px -240px #7df0ff,
    -150px -380px #9fffdb,
    -50px -40px #7fffeb,
    -95px -175px #d3ff99,
    -90px 10px #67a9ff,
    110px -310px #80dfff,
    70px -415px #ff99e6,
    170px -100px #ff7cb3,
    -245px 25px #ffcc99,
    100px -325px #ff99b3,
    -210px -180px #a8ffe6,
    240px -130px #e6a8ff,
    140px -200px #db73ff,
    125px -175px #7ed9ff,
    120px -380px #ff7da3,
    145px -110px #ffc899,
    35px -80px #ff99e6,
    -60px -200px #cf73ff,
    -200px -230px #e6ff99,
    -130px -380px #f299ff,
    -40px -410px #ff99e6,
    210px -110px #a3fff2,
    90px -280px #80cfff,
    -20px -190px #d5ff99,
    140px -390px #c9ff99,
    60px -3px #7dccff,
    -160px -280px #f299ff,
    -160px -230px #9bfff7,
    -240px -350px #7dffb9,
    60px -360px #80cfff,
    245px -170px #7dc6ff,
    225px -140px #e6a3ff,
    140px -210px #db73ff,
    210px -285px #ffcc99,
    180px -130px #73a8ff,
    90px -120px #cf73ff,
    190px 70px #7df0ff,
    -20px -380px #7dff80,
    100px -10px #ff80d1,
    20px 30px #f299ff,

    /* FLER POS*/

    10px -300px #b3e0ff,
    -50px -350px #c5f5e5,
    -30px -50px #a9d9ff,
    -70px -200px #ffc6e8,
    -80px -450px #fff4cc,
    -90px -100px #ffcce0,
    100px 250px #ffd9cc,
    -110px 300px #ffc4f2,
    -120px -150px #9ff9ff,
    -130px 400px #c9ff99,
    140px 250px #ffc8d9,
    150px -350px #c1c9ff,
    -160px 200px #7df0ff,
    170px -450px #9fffdb,
    -180px 100px #7fffeb,
    190px -275px #d3ff99,
    200px 50px #67a9ff,
    210px 310px #80dfff,
    220px -415px #ff99e6,
    -230px 150px #ff7cb3,
    240px -25px #ffcc99,
    -250px 325px #ff99b3,
    260px -180px #a8ffe6,
    270px 130px #e6a8ff,
    -280px -200px #db73ff,
    290px 175px #7ed9ff,
    -300px -380px #ff7da3,
    -310px 110px #ffc899,
    -320px -80px #ff99e6,
    330px 200px #cf73ff,
    -340px -230px #e6ff99,
    350px 380px #f299ff,
    360px -410px #ff99e6,
    370px 110px #a3fff2,
    -380px -280px #80cfff,
    -390px 190px #d5ff99,
    400px -390px #c9ff99,
    -410px 3px #7dccff,
    420px -280px #f299ff,
    -430px 230px #9bfff7,
    -440px -350px #7dffb9,
    450px -360px #80cfff,
    -460px 170px #7dc6ff,
    470px -140px #e6a3ff,
    480px 210px #db73ff,
    -490px -285px #ffcc99,
    500px -130px #73a8ff,
    -510px 120px #cf73ff,
    520px -70px #7df0ff,
    -530px 380px #7dff80,
    540px 10px #ff80d1;

  /*box-shadow: -120px -218.66667px #b3e0ff, 248px -16.66667px #c5f5e5, 190px 16.33333px #a9d9ff, -113px -308.66667px #ffc6e8, -109px -287.66667px #fff4cc, -50px -313.66667px #ffcce0, 226px -31.66667px #ffd9cc, 180px -351.66667px #ffc4f2, -12px -338.66667px #9ff9ff, 220px -388.66667px #c9ff99, -69px -27.66667px #ffc8d9, -111px -339.66667px #c1c9ff, 155px -237.66667px #7df0ff, -152px -380.66667px #9fffdb, -50px -37.66667px #7fffeb, -95px -175.66667px #d3ff99, -88px 10.33333px #67a9ff, 112px -309.66667px #80dfff, 69px -415.66667px #ff99e6, 168px -100.66667px #ff7cb3, -244px 24.33333px #ffcc99, 97px -325.66667px #ff99b3, -211px -182.66667px #a8ffe6, 236px -126.66667px #e6a8ff, 140px -196.66667px #db73ff, 125px -175.66667px #7ed9ff, 118px -381.66667px #ff7da3, 144px -111.66667px #ffc899, 36px -78.66667px #ff99e6, -63px -196.66667px #cf73ff, -218px -227.66667px #e6ff99, -134px -377.66667px #f299ff, -36px -412.66667px #ff99e6, 209px -106.66667px #a3fff2, 91px -278.66667px #80cfff, -22px -191.66667px #d5ff99, 139px -392.66667px #c9ff99, 56px -2.66667px #7dccff, -156px -276.66667px #f299ff, -163px -233.66667px #9bfff7, -238px -346.66667px #7dffb9, 62px -363.66667px #80cfff, 244px -170.66667px #7dc6ff, 224px -142.66667px #e6a3ff, 141px -208.66667px #db73ff, 211px -285.66667px #ffcc99, 181px -128.66667px #73a8ff, 90px -123.66667px #cf73ff, 189px 70.33333px #7df0ff, -18px -383.66667px #7dff80, 100px -6.66667px #ff80d1;*/
  animation: explosion 1s ease-out infinite backwards, grav 1s ease-in infinite backwards, pos 5s linear infinite backwards;
}

.pyro>.after {
  animation-duration: 3s, 3s, 10s;
  animation-delay: 3s, 3s, 3s;
}

@keyframes explosion {
  from {box-shadow: 0 0 white}
}

@keyframes grav {
  to {transform: translateY(220px); opacity: 0;}
}

@keyframes pos {
  0%, 20% { margin: 10% 40%;}
  21%, 40% {margin: 40% 30%;}
  41%, 60% {margin: 20% 70%;}
  61%, 80% {margin: 30% 20%;}
  81%, 100% {margin: 30% 80%;}
}
</style>