<template>
  <body>
    <div class="container">
      <div class="wrap">
        <h1> Add Dynamic Table</h1>
        <a href="/addInput" class="add">&plus;</a>
    </div>
    <div class="inp-group">
    </div>
    </div>
  </body>
  
  </template>
  
  <script >
import io from 'socket.io-client';
const socket = io();

const addBtn = document.querySelector(".add");
const input = document.querySelector(".inp-group");

export default {
  name: 'CreateView',
  data: function () {
    return {
      lang: "",
      pollId: "",
      question: "",
      answers: ["", ""],
      questionNumber: 0,
      data: {},
      uiLabels: {}
    }
  },

  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data)
  },



removeInput:function (){
  this.parentElement.remove();
  socket.emit("removeInput", {pollId: this.removeInput, lang: this.lang })
},

addInput:function (){
  socket.emit("addInput", {pollId: this.addInput, lang: this.lang })
  const name = document.createElement("input");
  name.type="text";
  name.placeholder="Enter your name";

  const email = document.createElement("input");
  email.type="text";
  name.placeholder="Enter your Email";

  const btn=document.createElement("a");
  btn.className = "delete";
  btn.innerHTML = "&times";

  btn.addEventListener("click", this.removeInput);

  const flex=document.createElement("div");
  flex.className="flex";

  input.appendChild(flex);
  flex.appendChild(name);
  flex.appendChild(email);
  flex.appendChild(btn);

  addBtn.addEventListener("click", this.addInput);
}

}
  </script>
  
  <style>
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  body {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to top right, white 0%);
  }
  .container{
    max-width: 600px;
    background: grey;
    border-radius: 5px;
    width: 600px;
    padding: 20px;
    box-shadow: 0 2px 2px 3px black;
  }
  .wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 40px;
    padding-bottom: 10px;
    border-bottom: 2px solid #ccc;
  }
  .add{
    text-decoration: none;
    display: inline-block;
    width: 30px;
    height: 30px;
    background: pink;
    font-size: 2rem;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>