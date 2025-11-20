<template>
  <div class="keyboard">
    <div id="C3" class="whitekey" style="position: absolute; left:40px; top:50px"></div>
    <div id="C#3" class="blackkey" style="position: absolute; left:73px; top:50px"></div>
    <div id="D3" class="whitekey" style="position: absolute; left:85px; top:50px"></div>
    <div id="D#3" class="blackkey" style="position: absolute; left:118px; top:50px"></div>
    <div id="E3" class="whitekey" style="position: absolute; left:130px; top:50px"></div>
    <div id="F3" class="whitekey" style="position: absolute; left:175px; top:50px"></div>
    <div id="F#3" class="blackkey" style="position: absolute; left:208px; top:50px"></div>
    <div id="G3" class="whitekey" style="position: absolute; left:220px; top:50px"></div>
    <div id="G#3" class="blackkey" style="position: absolute; left:253px; top:50px"></div>
    <div id="A3" class="whitekey" style="position: absolute; left:265px; top:50px"></div>
    <div id="A#3" class="blackkey" style="position: absolute; left:298px; top:50px"></div>
    <div id="B3" class="whitekey" style="position: absolute; left:310px; top:50px"></div>
    <div id="C4" class="whitekey" style="position: absolute; left:355px; top:50px"></div>
    <div id="C#4" class="blackkey" style="position: absolute; left:388px; top:50px"></div>
    <div id="D4" class="whitekey" style="position: absolute; left:400px; top:50px"></div>
    <div id="D#4" class="blackkey" style="position: absolute; left:433px; top:50px"></div>
    <div id="E4" class="whitekey" style="position: absolute; left:445px; top:50px"></div>
    <div id="F4" class="whitekey" style="position: absolute; left:490px; top:50px"></div>
    <div id="F#4" class="blackkey" style="position: absolute; left:523px; top:50px"></div>
    <div id="G4" class="whitekey" style="position: absolute; left:535px; top:50px"></div>
    <div id="G#4" class="blackkey" style="position: absolute; left:568px; top:50px"></div>
    <div id="A4" class="whitekey" style="position: absolute; left:580px; top:50px"></div>
    <div id="A#4" class="blackkey" style="position: absolute; left:613px; top:50px"></div>
    <div id="B4" class="whitekey" style="position: absolute; left:625px; top:50px"></div>
  </div>
</template>

<script lang="ts">
import { Note } from '../models/theory';
import type { PropType } from 'vue'

export default {
  name: 'Keyboard',
  props: {
    scaleNotes: {
      type: Array as PropType<Note[]>,
      default: () => [],
    },
  },
  watch: {
    scaleNotes: {
      immediate: true,
      handler(newNotes: Note[]) {
        if (!newNotes) {
          return;
        }
        // Reset all keys to default styles
        const allKeys = document.querySelectorAll('.whitekey, .blackkey');
        allKeys.forEach(key => {
          (key as HTMLElement).style.backgroundColor = key.classList.contains('whitekey') ? 'white' : 'black';
        });

        // Highlight the keys that are in the scaleNotes prop
        newNotes.forEach(note => {
          const keyElement = document.getElementById(`${note.name}${note.octaveIndex}`);
          if (keyElement) {
            (keyElement as HTMLElement).style.backgroundColor = 'yellow'; // Highlight color
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
    width:30px;
    height:120px;
    background:black;
    border: black;
    border-width: 5px;
    border-style: solid;
    z-index: 2;
}
</style>
