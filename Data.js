'use strict';

const languages = ["en", "se"];

// Store data in an object to keep the global namespace clean
function Data() {
  this.polls = {};
  this.quizes ={};

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

Data.prototype.createPoll = function(pollId, lang="en") {
  if (typeof this.polls[pollId] === "undefined") {
    let poll = {};
    poll.lang = lang;  
    poll.questions = [];
    poll.answers = [];
    poll.currentQuestion = 0;              
    this.polls[pollId] = poll;
    console.log("poll created", pollId, poll);
  }
  return this.polls[pollId];
}

Data.prototype.createQuiz = function(quizId, lang="en"){
  if (typeof this.quizes[quizId] === "undefined") {
    let quiz = {};
    quiz.lang = lang;  
    quiz.words = [];
    quiz.translations = [];
    quiz.title = "";
    quiz.users = {};
    //quiz.currentQuestion = 0;              
    this.quizes[quizId] = quiz;
    //console.log("Quizes:", this.quizes)
    
  }
  return this.quizes[quizId];

}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.addWord = function(quizId, word, translation) {
  const quiz = this.quizes[quizId];
  quiz.words = [];
  quiz.translations =[];
  if (typeof quiz !== 'undefined') {
    for(let i=0; i<word.length;i++){
      quiz.words.push(word[i]);
      quiz.translations.push(translation[i]);
    }
  }
}

Data.prototype.addTitle = function(quizId, title){
  const quiz = this.quizes[quizId];
  if (typeof quiz !== 'undefined'){
    quiz.title = title;
  }
}

Data.prototype.getAllQuizes = function () {
  return this.quizes;
};

Data.prototype.getQuiz = function(key) {
  return this.quizes[key];
}

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];

  if (typeof poll !== 'undefined') {
    if (qId !== null) {
      poll.currentQuestion = qId;
    }
    return poll.questions[poll.currentQuestion];
  }
  return []
}

Data.prototype.submitAnswer = function(pollId, answer) {
  const poll = this.polls[pollId];
  console.log("answer submitted for ", pollId, answer);
  if (typeof poll !== 'undefined') {
    let answers = poll.answers[poll.currentQuestion];
    if (typeof answers !== 'object') {
      answers = {};
      answers[answer] = 1;
      poll.answers.push(answers);
    }
    else if (typeof answers[answer] === 'undefined')
      answers[answer] = 1;
    else
      answers[answer] += 1
    console.log("answers looks like ", answers, typeof answers);
  }
}

Data.prototype.getAnswers = function(pollId) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    const answers = poll.answers[poll.currentQuestion];
    if (typeof poll.questions[poll.currentQuestion] !== 'undefined') {
      return {q: poll.questions[poll.currentQuestion].q, a: answers};
    }
  }
  return {}
}

Data.prototype.deleteQuiz = function(key) {
  delete this.quizes[key];

}

Data.prototype.saveMyResult = function(quizId, username, failedWords, correctWords){

  const quiz = this.quizes[quizId];
  if (typeof quiz.users[username] === "undefined") {
    let user = {};
    user.failedWords = failedWords;  
    user.correctWords = correctWords;       
    this.quizes[quizId].users[username] = user;
  }

  console.log("Efter save my result rätta ord: ", this.quizes[quizId].users[username].correctWords, "failed words:", this.quizes[quizId].users[username].failedWords)
  
}

Data.prototype.getMyResult = function(quizId, user){
  return this.quizes[quizId].users[user]
}

module.exports = Data;



