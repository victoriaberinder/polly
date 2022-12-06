const { text } = require("express");

function sockets(io, socket, data, document, survey_options) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('editQuestion', function(d) {
    data.editQuestion(d.pollId, d.index, {q: d.q, a: d.a});
    socket.emit('questionEdited', data.getAllQuestions(d.pollId));
  });

  socket.on('joinPoll', function(pollId) {
    socket.join(pollId);
    socket.emit('newQuestion', data.getQuestion(pollId))
    socket.emit('dataUpdate', data.getAnswers(pollId));
  });

  socket.on('runQuestion', function(d) {
    io.to(d.pollId).emit('newQuestion', data.getQuestion(d.pollId, d.questionNumber));
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('submitAnswer', function(d) {
    data.submitAnswer(d.pollId, d.answer);
    io.to(d.pollId).emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })

  var survey_options = document.getElementById('survey_options');
  var add_more_fields = document.getElementById('add_more_fields');
  var remove_fields = document.getElementById('remove_fields');
  
  add_more_fields.onclick = function(){
    var newField = document.createElement('input');
    newField.setAttribute('type','text');
    newField.setAttribute('name','survey_options[]');
    newField.setAttribute('class','survey_options');
    newField.setAttribute('siz',50);
    newField.setAttribute('placeholder','Another Field');
    survey_options.appendChild(newField);
  }
  
  remove_fields.onclick = function(){
    var input_tags = survey_options.getElementsByTagName('input');
    if(input_tags.length > 2) {
      survey_options.removeChild(input_tags[(input_tags.length) - 1]);
    }
  }
  
  document.getElementById('print-values-btn').onclick = function() {
    let allTextBoxes = document.getElementsByName('survey_options[]');  
    for(let i of allTextBoxes){
        console.log(i.value) //here you will be able to see all values in the console
    }
  }
  
  module.exports = sockets;
 
}

const addBtn = document.querySelector(".add");

const input = document.querySelector(".inp-group");

function addInput(){
  const name = document.createElement("input");
  name.type="text";
  name.placeholder="Enter your name";

  const email = document.createElement("input");
  email.type="text";
  name.placeholder="Enter your Email";

  const btn=document.createElement("a");
  btn.className = "delete";
  btn.innerHTML = "&times";
}

addBtn.addEventListener("click", addInput);


