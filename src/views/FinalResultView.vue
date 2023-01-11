<template>

  <main>
    <audio ref="audio" :src="audioUrl"></audio>
    <div class="pyro">
      <div class="before"></div>
      <div class="after"></div>
    </div>
    <div class="finalH1"> {{ uiLabels.finalResultHeader }} </div>


    <div class="finalWrapper">
      <div class="finalTopList">
        <div class="finalTextCSS">
          <div id="finalText" class="user-info" v-for="(user, key, index) in users" v-bind:key="key">
            <span class="user-index">{{ index + 1 }}.</span> <span class="key-index">{{ key }}: </span> {{ user.time }}
            s

          </div>
        </div>
        <img class="winnerImg" src="/img/award.png">
      </div>
    </div>
    <footer>
      <div>
        <button class="exitbutton" @click="exit">Exit</button>
      </div>
    </footer>
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

  methods: {
    exit: function () {
      this.$router.push('/')
    }
  },

  mounted() {
    this.$refs.audio.play();
  }
}


</script>

<style>
hr {
  margin-top: 2px;
  border-top: 1px solid #d8ecff;
}

.finalH1 {
  font-family: 'Comfortaa', cursive;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
  margin-bottom: 10px;
  font-size: 70px;
  font-weight: bold;
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
  margin-right: 90%;
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
  height: auto;
  margin: 3vw auto;
  padding: 1vw;
  border-radius: 30px;

  font-size: 50px;
  font-family: 'Comfortaa', cursive;
  color: #2c3e50;
  text-align: left;
  animation: colorBack 14s linear infinite;
  background-image: linear-gradient(90deg, #ffc899, #ffcc99, #7ed9ff, #b3e0ff, #67a9ff, #ff99e6, #db73ff, #d5ff99);
  background-size: 700% 100%;

  /*box-shadow: 0px 10px 40px 0px rgba(47, 47, 47, .1);*/
}

@keyframes colorBack {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 0%;
  }

}

.winnerImg {
  width: 14%;
  margin-left: 80%;
  margin-top: 5%;

}

.finalTopList {
  display: grid;

}

#finalText {
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 10px
}

.user-info {
  font-size: 35px;
  color: white;
  font-weight: bold;
  font-family: 'Comfortaa', cursive;
}

.user-index {
  color: white;
  font-size: 35px;
  font-weight: bold;
  font-family: 'Comfortaa', cursive;
  padding-right: 5%;
}

.key-index {
  margin-right: 5%;
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
    300px 30px #ffcc99,

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
    
    animation: explosion 1s ease-out infinite backwards, grav 1s ease-in infinite backwards, pos 5s linear infinite backwards;
}

.pyro>.after {
  animation-duration: 3s, 3s, 10s;
  animation-delay: 3s, 3s, 3s;
}

@keyframes explosion {
  from {
    box-shadow: 0 0 white
  }
}

@keyframes grav {
  to {
    transform: translateY(220px);
    opacity: 0;
  }
}

@keyframes pos {

  0%,
  20% {
    margin: 10% 40%;
  }

  21%,
  40% {
    margin: 40% 30%;
  }

  41%,
  60% {
    margin: 20% 70%;
  }

  61%,
  80% {
    margin: 30% 20%;
  }

  81%,
  100% {
    margin: 30% 80%;
  }
}

@media only screen and (max-width: 750px) {
  .user-info {
    font-size: 15px;
  }

  .user-index {
    font-size: 15px;
  }

  .finalWrapper {
    width: 70vw;
    height: auto;
  }


}
</style>