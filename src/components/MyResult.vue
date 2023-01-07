<template>

    <body>
        <div class="wrapper8">
            <h1 type="text"> My result</h1>
        </div>
        <div class="wrapperWords">
            <div v-if="allCorrectWords.length > 0" class="correctWords">
                <div class="correct">
                    <div  v-for="(word, index) in allCorrectWords" v-bind:key="index">
                        {{ word }}
                    </div>
                </div>
            </div>
            <div v-if="failedWords.length > 0" class="failedWords">
                <div class="failed">
                    <div v-for="(word, index) in failedWords" v-bind:key="index">
                        {{ word }} </div>
                </div>
            </div>
        </div>
        <div>
            <button v-if="failedWords.length > 0" class="tryagain" @click="tryAgain">
                Try again</button>
            <button v-else-if="failedWords.length == 0" class="tryagain"
                @click="tryAgain"> End quiz</button>
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

h1 {
    color: #2c3e50;
    font-size: 35px;
    font-family: 'Comfortaa', cursive;
    text-align: center;
    margin-top: 60px;
}

.wrapper8 {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    text-align: center;
    height: 50px;
    width: 300px;
    font-size: 15px;
    font-family: 'Comfortaa', cursive;
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

    width: 100px;
    height: auto;
    background-color: rgb(229, 140, 140);
    border-radius: 10px;
    margin-left: 5%;
    margin-right: 5%;
}

.correctWords {
    float: left;
    flex: 1;

    width: 100px;
    height: auto;
    background-color: #a8e58cff;
    border-radius: 10px;
    margin-left: 5%;
    margin-right: 5%;
}

.correct {
    margin-top: 100px;
    margin-bottom: 100px;
}

.failed {
    margin-top: 100px;
    margin-bottom: 100px;
}

.wrapperWords {
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
    margin-top:50px;
    font-size: 3vw;
    color: #2c3e50;
    padding-left: 10%;
    padding-right: 10%;
}

.tryagain {
    text-align: center;
    color: white;
    border: 1px ridge rgb(177, 177, 177);
    border-radius: 50px;
    background-color: #3f51b5;
    margin-top: 10px;
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