'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
  this.quizes = {};

}


/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

Data.prototype.getUILabels = function (lang = "en") {
  const ui = require("./data/labels-" + lang + ".json");
  return ui;
}


Data.prototype.createQuiz = function (quizId, lang = "en") {
  if (typeof this.quizes[quizId] === "undefined") {
    let quiz = {};
    quiz.lang = lang;
    quiz.words = [];
    quiz.translations = [];
    quiz.title = [];
    quiz.users = {};
    //quiz.currentQuestion = 0;              
    this.quizes[quizId] = quiz;
    //console.log("Quizes:", this.quizes)

  }
  return this.quizes[quizId];

}

Data.prototype.addTitle = function (quizId, title) {
  const quiz = this.quizes[quizId];
  if (typeof quiz !== 'undefined') {
    quiz.title = title;
  }
}


Data.prototype.addWord = function (quizId, word, translation, title) {
  const quiz = this.quizes[quizId];
  quiz.words = [];
  quiz.translations = [];
  if (typeof quiz !== 'undefined') {
    for (let i = 0; i < word.length; i++) {
      quiz.words.push(word[i]);
      quiz.translations.push(translation[i]);
    }

    quiz.title = title;
  }
 
}

Data.prototype.getAllQuizes = function () {
  return this.quizes;
};

Data.prototype.getQuiz = function (key) {
  return this.quizes[key];
}


Data.prototype.getQuestion = function (pollId, qId = null) {
  const poll = this.polls[pollId];

  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.getAnswers = function (pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return { q: poll.questions[poll.currentQuestion].q, a: answers };
    }
  }
  return {}
}

Data.prototype.deleteQuiz = function (key) {
  delete this.quizes[key];

}

Data.prototype.deleteUsers = function(quizId){
  this.quizes[quizId].users = {}
  console.log('Delete' , this.quizes[quizId].users)
}

Data.prototype.saveTime = function (quizId, username, totalSeconds){
  const quiz = this.quizes[quizId];
  quiz.users[username].time = totalSeconds
  console.log(quiz.users)
}

Data.prototype.makeUser = function (quizId, username){
  const quiz = this.quizes[quizId];

  let user = {};
  
  this.quizes[quizId].users[username] = user;
}


module.exports = Data;
