<template>
<body>
    <body>
        <form action="/url" method="GET" class="text">
        <p>Name your quiz</p>
    </form>
    </body>
    <input type="text" placeholder="Enter" class="wrapper">

    
    
</body>
</template>

<script>

</script>

<style>
body {
    background-color: #d8ecff;
}

.wrapper {
    text-align: center;
    color: black;
    border: 1px ridge rgb(177, 177, 177);
    border-radius: 50px;
    background-color: #b6d8f8;
    margin-top: 10px;
    justify-content: center;
    height: 50px;
    width: 300px;
    font-size: 15px;
    font-family: 'Courier New', Courier, monospace;
}

.text{
    color: black;
    font-size: 35px;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    margin-top: 150px;
}
.saveQuizButton {
  width: 50%;
  background: #3f51b5;
  color: white;
  border: 0;
  padding: 7px;
  border-radius: 5px;
}

.saveQuizButton:hover {
  cursor: pointer;
  width: 32rem;
  height: 2rem;
  background-color: #56c770;
}
</style>