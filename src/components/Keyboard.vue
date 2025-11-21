<template>
  <div class="keyboard">
    <div id="C3" class="whitekey" style="position: absolute; left:40px; top:50px"></div>
    <div id="C#3" class="blackkey" style="position: absolute; left:65px; top:50px"></div>
    <div id="D3" class="whitekey" style="position: absolute; left:75px; top:50px"></div>
    <div id="D#3" class="blackkey" style="position: absolute; left:100px; top:50px"></div>
    <div id="E3" class="whitekey" style="position: absolute; left:110px; top:50px"></div>
    <div id="F3" class="whitekey" style="position: absolute; left:145px; top:50px"></div>
    <div id="F#3" class="blackkey" style="position: absolute; left:170px; top:50px"></div>
    <div id="G3" class="whitekey" style="position: absolute; left:180px; top:50px"></div>
    <div id="G#3" class="blackkey" style="position: absolute; left:205px; top:50px"></div>
    <div id="A3" class="whitekey" style="position: absolute; left:215px; top:50px"></div>
    <div id="A#3" class="blackkey" style="position: absolute; left:240px; top:50px"></div>
    <div id="B3" class="whitekey" style="position: absolute; left:250px; top:50px"></div>
    <div id="C4" class="whitekey" style="position: absolute; left:285px; top:50px"></div>
    <div id="C#4" class="blackkey" style="position: absolute; left:310px; top:50px"></div>
    <div id="D4" class="whitekey" style="position: absolute; left:320px; top:50px"></div>
    <div id="D#4" class="blackkey" style="position: absolute; left:345px; top:50px"></div>
    <div id="E4" class="whitekey" style="position: absolute; left:355px; top:50px"></div>
    <div id="F4" class="whitekey" style="position: absolute; left:390px; top:50px"></div>
    <div id="F#4" class="blackkey" style="position: absolute; left:415px; top:50px"></div>
    <div id="G4" class="whitekey" style="position: absolute; left:425px; top:50px"></div>
    <div id="G#4" class="blackkey" style="position: absolute; left:450px; top:50px"></div>
    <div id="A4" class="whitekey" style="position: absolute; left:460px; top:50px"></div>
    <div id="A#4" class="blackkey" style="position: absolute; left:485px; top:50px"></div>
    <div id="B4" class="whitekey" style="position: absolute; left:495px; top:50px"></div>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  props: {
    scaleNotes: Array,
  },
  watch: {
    scaleNotes: {
      immediate: true,
      handler(newNotes) {
        if (!newNotes) {
          return;
        }
        // Reset all keys to default styles
        const allKeys = document.querySelectorAll('.whitekey, .blackkey');
        allKeys.forEach(key => {
          key.style.backgroundColor = key.classList.contains('whitekey') ? 'white' : 'black';
        });

        // Highlight the keys that are in the scaleNotes prop
        newNotes.forEach(note => {
          const keyElement = document.getElementById(`${note.name}${note.octaveIndex}`);
          if (keyElement) {
            keyElement.style.backgroundColor = 'yellow'; // Highlight color
          }
        });
      }
    }
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
    width:25px;
    height:120px;
    background:black;
    border: black;
    border-width: 5px;
    border-style: solid;
    z-index: 2;
}
</style>
