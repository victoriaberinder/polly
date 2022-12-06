<template>
<body>
  <div class="container">
    <div class="wrap">
      <h1> Add Dynamic Table</h1>
      <a href="#" class="add">&plus;</a>
  </div>
  <div class="inp-group">
  </div>
  </div>
</body>

</template>

<script >

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
