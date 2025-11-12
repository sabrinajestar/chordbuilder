<template>
  <div class="keyboard">
    <div id="c3" class="whitekey" style="position: absolute; left:40px; top:50px"></div>
    <div id="c#3" class="blackkey" style="position: absolute; left:73px; top:50px"></div>
    <div id="d3" class="whitekey" style="position: absolute; left:85px; top:50px"></div>
    <div id="d#3" class="blackkey" style="position: absolute; left:118px; top:50px"></div>
    <div id="e3" class="whitekey" style="position: absolute; left:130px; top:50px"></div>
    <div id="f3" class="whitekey" style="position: absolute; left:175px; top:50px"></div>
    <div id="f#3" class="blackkey" style="position: absolute; left:208px; top:50px"></div>
    <div id="g3" class="whitekey" style="position: absolute; left:220px; top:50px"></div>
    <div id="g#3" class="blackkey" style="position: absolute; left:253px; top:50px"></div>
    <div id="a3" class="whitekey" style="position: absolute; left:265px; top:50px"></div>
    <div id="a#3" class="blackkey" style="position: absolute; left:298px; top:50px"></div>
    <div id="b3" class="whitekey" style="position: absolute; left:310px; top:50px"></div>
    <div id="c4" class="whitekey" style="position: absolute; left:355px; top:50px"></div>
    <div id="c#4" class="blackkey" style="position: absolute; left:388px; top:50px"></div>
    <div id="d4" class="whitekey" style="position: absolute; left:400px; top:50px"></div>
    <div id="d#4" class="blackkey" style="position: absolute; left:433px; top:50px"></div>
    <div id="e4" class="whitekey" style="position: absolute; left:445px; top:50px"></div>
    <div id="f4" class="whitekey" style="position: absolute; left:490px; top:50px"></div>
    <div id="f#4" class="blackkey" style="position: absolute; left:523px; top:50px"></div>
    <div id="g4" class="whitekey" style="position: absolute; left:535px; top:50px"></div>
    <div id="g#4" class="blackkey" style="position: absolute; left:568px; top:50px"></div>
    <div id="a4" class="whitekey" style="position: absolute; left:580px; top:50px"></div>
    <div id="a#4" class="blackkey" style="position: absolute; left:613px; top:50px"></div>
    <div id="b4" class="whitekey" style="position: absolute; left:625px; top:50px"></div>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.whitekey{
    width:40px;
    height:200px;
    background:white;
    border: black;
    border-width: 5px;
    border-style: solid;
    z-index: 1;
}
.blackkey{
    width:30px;
    height:120px;
    background:black;
    z-index: 2;
}
</style>
