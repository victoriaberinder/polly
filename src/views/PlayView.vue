<template>
    <body>
    <header>
    <div class="logo"><img src="/img/logo.png">Quiz library</div>
  </header>
    <div>
      Play link: 
      <input type="text" v-model="playId">
      <button v-on:click="playCross">
        Create cross
      </button>
    </div>
    <div class="wrapper">
    <button class="exitbutton" @click="$router.push('/')">Exit</button>
    </div>
    <table class="center">
  <tbody>
    <tr>
      <td>Demo</td>
      <td>Play</td>
    </tr>
    <tr>
      <td>Djur</td>
      <td>Play</td>
    </tr>
    <tr>
      <td>Huvudstäder</td>
      <td>PLay</td>
    </tr>
    
  </tbody>
</table>
    
</body>
  </template>
  
  <script>
  /*import io from 'socket.io-client'; 
  const socket = io();*/
  
  </script>

  <style>
 header {
    background-color: rgb(194, 241, 255);
    width: 100%;
    height: 33%;
  }
  body {
    background-color: rgb(194, 241, 255);
  }

  .logo {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 2.5rem;
    color: white;
    padding-top:0.2em;
    text-align: center;
  }

  .logo img {
    height:2.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem; 
  }

  .exitbutton {
    width: 5rem;
    height: 2rem;
    border-radius: 15px;
    border-color: rgb(227, 123, 123);
    margin: 2.5rem;
    color: white;
    background-color: rgb(235, 76, 76);
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 15px; 
  }

  .quizlibary{
    width: 100px;
    height: 300px;
    border-radius: 15px;
    border-color: aquamarine;
    margin: 2.5rem;
  }

table { 
    border-collapse: collapse; 
    width:100%;
}

tr + tr > td{
  border-top: 2px solid #dee2e6;
}

.center{
  margin-right: 1000px;
  margin-top: 10%;
}

</style>