const { text } = require("express");

function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    //console.log('Pageloaded function')
    //console.log(data.getUILabels(lang))
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('createPoll', function(d) {
    socket.emit('pollCreated', data.createPoll(d.pollId, d.lang));
  });

  socket.on('createQuiz', function(d) {
    socket.emit('quizCreated', data.createQuiz(d.quizId, d.lang));
  });

  socket.on('save', function(d) {
    data.addTitle(d.q, d.t)
    console.log("quizes: ", data.getAllQuizes())
    
  });


    socket.on('joinQuiz', function(quizId){
    socket.join(quizId);
    console.log(data.getAllQuizes())
    
  });

  socket.on('startQuiz', function(quizId){
    io.to(quizId).emit('newQuiz', data.getQuiz(quizId));
  });


  socket.on('addQuestion', function(d) {
    data.addQuestion(d.pollId, {q: d.q, a: d.a});
    socket.emit('dataUpdate', data.getAnswers(d.pollId));
  });

  socket.on('addWord', function(d) {
    data.addWord( d.q, d.w, d.t, d.title);
   
  });

  socket.on('getAllQuizes', function() {
    socket.emit('allQuizes', data.getAllQuizes() );
    //io.emit('allQuizes',  { quizes: data.getAllQuizes() })
  
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
  });

  socket.on("deleteQuiz", function(key) {
    data.deleteQuiz(key);
    //socket.emit("quizesUpdated", data.getAllQuizes());
    console.log("Efter delete: ", data.getAllQuizes());
  }
  );
  socket.on("getQuiz", function(key){
    //console.log("quiz", data.getQuiz(key))
    socket.emit('quiz', data.getQuiz(key) );
    
  });

  socket.on("saveTime", function(d){
    data.saveTime(d.quizId, d.username, d.totalSeconds)
    io.to(d.quizId).emit('getResults', data.getQuiz(d.quizId))
  })

  socket.on("makeUser", function(d){
    data.makeUser(d.q, d.u)
  });

  socket.on("getMyResult", function(d){
    console.log("User:", data.getMyResult(d.quizId, d.user))
    socket.emit("MyResult", data.getMyResult(d.quizId, d.user))
   })
}

module.exports = sockets;





