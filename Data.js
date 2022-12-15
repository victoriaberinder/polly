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
  console.log("Nu är vi i create quiz i data.js och vi har parametrarna quizId och lang. Det är följande:", quizId, lang)
  if (typeof this.quizes[quizId] === "undefined") {
    let quiz = {};
    quiz.lang = lang;  
    quiz.words = [];
    quiz.translations = [];
    quiz.title = "";
    //quiz.currentQuestion = 0;              
    this.quizes[quizId] = quiz;
    console.log("quiz created", quizId, quiz);
  }
  return this.quizes[quizId];

}

Data.prototype.addQuestion = function(pollId, q) {
  const poll = this.polls[pollId];
  console.log("question added to", pollId, q);
  if (typeof poll !== 'undefined') {
    poll.questions.push(q);
  }
}

Data.prototype.addWord = function(quizId, word, translation) {
  const quiz = this.quizes[quizId];
  console.log("word added to", quizId, word, translation)
  if (typeof quiz !== 'undefined') {
    for(let i=1; i<word.length;i++){
      quiz.words.push(word[i]);
      quiz.translations.push(translation[i]);
    }
    console.log("quiz updated", quizId, this.quizes[quizId]);
  }
}

Data.prototype.addTitle = function(quizId, title){
  const quiz = this.quizes[quizId];
  if (typeof quiz !== 'undefined'){
    quiz.title = title;
    console.log("quiz updated", quizId, this.quizes[quizId]);
  }
}

Data.prototype.getAllQuizes = function () {
  return this.quizes;
};

Data.prototype.editQuestion = function(pollId, index, newQuestion) {
  const poll = this.polls[pollId];
  if (typeof poll !== 'undefined') {
    poll.questions[index] = newQuestion;
  }
}

Data.prototype.getQuestion = function(pollId, qId=null) {
  const poll = this.polls[pollId];
  console.log("question requested for ", pollId, qId);
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
module.exports = Data;



