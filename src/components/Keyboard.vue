<template>
  <div class="keyboard">
    <div id="C3" class="whitekey"></div>
    <div id="C#3" class="blackkey"></div>
    <div id="D3" class="whitekey"></div>
    <div id="D#3" class="blackkey"></div>
    <div id="E3" class="whitekey"></div>
    <div id="F3" class="whitekey"></div>
    <div id="F#3" class="blackkey"></div>
    <div id="G3" class="whitekey"></div>
    <div id="G#3" class="blackkey"></div>
    <div id="A3" class="whitekey"></div>
    <div id="A#3" class="blackkey"></div>
    <div id="B3" class="whitekey"></div>
    <div id="C4" class="whitekey"></div>
    <div id="C#4" class="blackkey"></div>
    <div id="D4" class="whitekey"></div>
    <div id="D#4" class="blackkey"></div>
    <div id="E4" class="whitekey"></div>
    <div id="F4" class="whitekey"></div>
    <div id="F#4" class="blackkey"></div>
    <div id="G4" class="whitekey"></div>
    <div id="G#4" class="blackkey"></div>
    <div id="A4" class="whitekey"></div>
    <div id="A#4" class="blackkey"></div>
    <div id="B4" class="whitekey"></div>
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
.keyboard{
  display: inline-block;
  font-size: 0; /* remove inline-block whitespace */
}

.whitekey,
.blackkey{
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  font-size: initial;
  margin: 0; /* controlled by layout rules */
}

.whitekey{
  width: 40px;
  height: 200px;
  background: white;
  border: 5px solid black;
  position: relative;
  z-index: 1;
}

.blackkey{
  width: 25px;
  height: 130px;
  background: black;
  border: 5px solid black;
  position: relative;
  margin-left: -13px;
  margin-right: -12px;
  margin-top: 0px;
  z-index: 3;
}
</style>
