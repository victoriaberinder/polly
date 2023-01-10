<template>

    <body>
        <div class="wrapper8">
            <h1 class="myResultHeader" type="text"> {{ uiLabels.myResultHeader }}</h1>
        </div>
        <div class="wrapperWords">
            <div v-if="allCorrectWords.length > 0" class="correctWords"> {{ uiLabels.MyCorrectWords }}
                <div class="correct">
                    <div v-for="(word, index) in allCorrectWords" v-bind:key="index">
                        {{ word }}
                    </div>
                </div>
            </div>
            <div v-if="failedWords.length > 0" class="failedWords"> {{ uiLabels.MyFailedWords }}
                <div class="failed">
                    <div v-for="(word, index) in failedWords" v-bind:key="index">
                        {{ word }} </div>
                </div>
            </div>
        </div>
        <div>
            <button v-if="failedWords.length > 0" class="tryagain" @click="tryAgain">
                {{uiLabels.tryAgain}}</button>
            <button v-else-if="failedWords.length == 0" class="tryagain" @click="tryAgain"> {{uiLabels.endQuiz}}</button>
        </div>

    </body>


</template>
    
<script>


export default {
    name: 'MyResult',
    props: {
        uiLabels: Object,
        failedWords: Object,
        correctWords: Array,
        allCorrectWords: Array,
        data: function () {
            return {
                uiLabels: {}
            }

        }


    },

    methods: {
        tryAgain: function () {
            this.$emit('clicked')

        },

    },

}

</script>
  
<style>
body {
    background-color: #d8ecff;
    font-family: 'Comfortaa', cursive;
}



.wrapper8 {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    text-align: center;
    height: 50px;
    width: 300px;
    font-size: 25px;
    font-family: 'Comfortaa', cursive;
    margin-top: 100px;
    color: #2c3e50;
    margin-bottom: 5vw;
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

.failedWords {
    float: left;
    flex: 1;
    width: 7vw;
    height: auto;
    background-color: rgb(235, 76, 76);
    border-radius: 10px;
    margin-left: 3%;
    margin-right: 3%;
    border-radius: 50px;
    color: #2c3e50;
    padding-top: 25px;
}

.correctWords {
    float: left;
    flex: 1;
    width: 7vw;
    height: auto;
    background-color: #56c770;
    border-radius: 10px;
    margin-left: 3%;
    margin-right: 3%;
    border-radius: 50px;
    color: #2c3e50;
    padding-top: 25px;
}

.correct {
    margin-top: 7vw;
    margin-bottom: 7vw;
}

.failed {
    margin-top: 7vw;
    margin-bottom: 7vw;
}

.wrapperWords {
    display: flex;
    margin-top: 50px;
    font-size: 3vw;
    color: #2c3e50;
}

.tryagain {
    text-align: center;
    color: white;
    border: 1px ridge rgb(177, 177, 177);
    border-radius: 50px;
    background-color: #3f51b5;
    margin-top: 40px;
    justify-content: center;
    height: 50px;
    width: 300px;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
}

.tryagain:hover {
    cursor: pointer;
    background-color: #2d3981;
}




@media screen and (max-width:50em) {
    .logo {
        font-size: 5vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }



    .hamburger::before {
        content: "☰";
    }

    .close::before {
        content: "✕";
    }

    .hide {
        left: -12em;
    }
}
</style>