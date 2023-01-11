const { text } = require("express");

function sockets(io, socket, data) {
  socket.emit('init', data.getUILabels());
  
  socket.on('pageLoaded', function (lang) {
    socket.emit('init', data.getUILabels(lang));
  });

  socket.on('switchLanguage', function(lang) {
    socket.emit('init', data.getUILabels(lang));
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

  socket.on('addWord', function(d) {
    data.addWord( d.q, d.w, d.t, d.title);
   
  });

  socket.on('getAllQuizes', function() {
    socket.emit('allQuizes', data.getAllQuizes() );
  
  });

  socket.on("deleteQuiz", function(key) {
    data.deleteQuiz(key);
    console.log("Efter delete: ", data.getAllQuizes());
  }
  );
  socket.on("getQuiz", function(key){
    socket.emit('quiz', data.getQuiz(key) );
    
  });

  socket.on("saveTime", function(d){
    data.saveTime(d.quizId, d.username, d.totalSeconds)
  })

  socket.on("getResults", function(quizId){
    io.to(quizId).emit('getResults', data.getQuiz(quizId))
  })

  socket.on("makeUser", function(d){
    data.makeUser(d.q, d.u)
  });

  socket.on('deleteUsers', function(quizId){
    data.deleteUsers(quizId)
  });

  socket.on('resetAll', () => {
    data = new Data();
    data.initializeData();
  })
 
}

module.exports = sockets;





