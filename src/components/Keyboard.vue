<template>
  <div class="keyboard">
    <div>
      <svg width="570" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect id="C3rect" x="0" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="D3rect" x="40" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="E3rect" x="80" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="F3rect" x="120" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="G3rect" x="160" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="A3rect" x="200" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="B3rect" x="240" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="C4rect" x="280" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="D4rect" x="320" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="E4rect" x="360" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="F4rect" x="400" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="G4rect" x="440" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="A4rect" x="480" y="0" width="40" height="200" class="whitekey"></rect>
        <rect id="B4rect" x="520" y="0" width="40" height="200" class="whitekey"></rect>

        <rect id="C#3rect" x="28" y="0" width="25" height="120" class="blackkey"></rect>
        <rect id="D#3rect" x="68" y="0" width="25" height="120" class="blackkey"></rect>
        <rect id="F#3rect" x="148" y="0" width="25" height="120" class="blackkey"></rect>
        <rect id="G#3rect" x="188" y="0" width="25" height="120" class="blackkey"></rect>
        <rect id="A#3rect" x="228" y="0" width="25" height="120" class="blackkey"></rect>
        <rect id="C#4rect" x="308" y="0" width="25" height="120" class="blackkey"></rect>
        <rect id="D#4rect" x="348" y="0" width="25" height="120" class="blackkey"></rect>
        <rect id="F#4rect" x="428" y="0" width="25" height="120" class="blackkey"></rect>
        <rect id="G#4rect" x="468" y="0" width="25" height="120" class="blackkey"></rect>
        <rect id="A#4rect" x="508" y="0" width="25" height="120" class="blackkey"></rect>

        <circle id="C3circ" cx="20" cy="175" r="10" class="blackcircle"></circle>
        <circle id="D3circ" cx="60" cy="175" r="10" class="blackcircle"></circle>
        <circle id="E3circ" cx="100" cy="175" r="10" class="blackcircle"></circle>
        <circle id="F3circ" cx="140" cy="175" r="10" class="blackcircle"></circle>
        <circle id="G3circ" cx="180" cy="175" r="10" class="blackcircle"></circle>
        <circle id="A3circ" cx="220" cy="175" r="10" class="blackcircle"></circle>
        <circle id="B3circ" cx="260" cy="175" r="10" class="blackcircle"></circle>
        <circle id="C4circ" cx="300" cy="175" r="10" class="blackcircle"></circle>
        <circle id="D4circ" cx="340" cy="175" r="10" class="blackcircle"></circle>
        <circle id="E4circ" cx="380" cy="175" r="10" class="blackcircle"></circle>
        <circle id="F4circ" cx="420" cy="175" r="10" class="blackcircle"></circle>
        <circle id="G4circ" cx="460" cy="175" r="10" class="blackcircle"></circle>
        <circle id="A4circ" cx="500" cy="175" r="10" class="blackcircle"></circle>
        <circle id="B4circ" cx="540" cy="175" r="10" class="blackcircle"></circle>

        <circle id="C#3circ" cx="40" cy="95" r="10" class="whitecircle"></circle>
        <circle id="D#3circ" cx="80" cy="95" r="10" class="whitecircle"></circle>
        <circle id="F#3circ" cx="160" cy="95" r="10" class="whitecircle"></circle>
        <circle id="G#3circ" cx="200" cy="95" r="10" class="whitecircle"></circle>
        <circle id="A#3circ" cx="240" cy="95" r="10" class="whitecircle"></circle>
        <circle id="C#4circ" cx="320" cy="95" r="10" class="whitecircle"></circle>
        <circle id="D#4circ" cx="360" cy="95" r="10" class="whitecircle"></circle>
        <circle id="F#4circ" cx="440" cy="95" r="10" class="whitecircle"></circle>
        <circle id="G#4circ" cx="480" cy="95" r="10" class="whitecircle"></circle>
        <circle id="A#4circ" cx="520" cy="95" r="10" class="whitecircle"></circle>
      </svg>
    </div>
    <div>
      <input id="soundToggle" type="button" value="Toggle Sound" @click="toggleSound()"/>
    </div>
  </div>
</template>

<script>
import * as Tone from "tone";
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
var sound = false;

export default {
  name: 'Keyboard',
  props: {
    scaleNotes: Array,
    chordNotes: Array
  },
  methods: {
    toggleSound() {
      sound = !sound;
      if (sound) {
        document.getElementById("soundToggle").style = "background-color: green; color: white;";
      } else {
        document.getElementById("soundToggle").style = "background-color: red; color: white;";
      }
    },
    displayKeyboard(newScaleNotes, newChordNotes) {
      // Reset all keys to default styles
      const allKeys = document.querySelectorAll('.whitekey, .blackkey');
      allKeys.forEach(key => {
        key.style.fill = key.classList.contains('whitekey') ? 'white' : 'black';
      });
      const allChordNotes = document.querySelectorAll('.whitecircle, .blackcircle');
      allChordNotes.forEach(key => {
        key.style.display = 'none';
      });

      if (newScaleNotes) {
        // Highlight the keys that are in the scaleNotes prop
        newScaleNotes.forEach(note => {
          const keyElement = document.getElementById(`${note.name}${note.octaveIndex}`+'rect');
          if (keyElement) {
            keyElement.style.fill = 'yellow'; // Highlight color
          }
        });
      }

      if (newChordNotes) {
        newChordNotes.forEach(note => {
          console.log("Highlighting chord note on keyboard:", note.name + note.octaveIndex);
          const circleElement = document.getElementById(`${note.name}${note.octaveIndex}`+'circ');
          console.log("looking for circleElement: " + `${note.name}${note.octaveIndex}`+'circ');
          console.log("circleElement found:", circleElement);
          var onKey = false;
          for (let scaleNote in this.scaleNotes) {
            if (note.name === this.scaleNotes[scaleNote].name) {
              onKey = true;
              break;
            }
          }
          if (circleElement) {
            if (onKey) {
              circleElement.style.fill = 'green';
            } else {
              console.log("Note", note, "not in scaleNotes", this.scaleNotes);
              circleElement.style.fill = 'red';
            }
            circleElement.style.display = 'block';
          }
          if(sound && synth && typeof synth.triggerAttackRelease === 'function') {
            console.log("Playing note:", note.name + note.octaveIndex);
            synth.triggerAttackRelease(note.name + note.octaveIndex, "8n");
          }
        });
      }
    }
  },
  watch: {
    scaleNotes: {
      immediate: true,
      handler(newNotes) {
        this.displayKeyboard(newNotes, this.chordNotes);
      }
    },
    chordNotes: {
      immediate: true,
      handler(newNotes) {
        this.displayKeyboard(this.scaleNotes, newNotes);
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

.whitekey{
  border: 1px solid black;
  fill:white;
  stroke-width:3;
  stroke:black
}

.whitecircle{
  fill:white;
  display:none;
}

.blackkey{
  position: relative;
  stroke-width:3;
  stroke:black
}

.blackcircle{
  fill:black;
  display:none;
}

#soundToggle{
  margin-top:10px;
  padding:5px 10px;
  font-size:16px;
  background-color: red;
  color: white;
}
</style>
