<template>
  <div class="keyboard">
    <svg width="570" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect id="C3" x="0" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="D3" x="40" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="E3" x="80" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="F3" x="120" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="G3" x="160" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="A3" x="200" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="B3" x="240" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="C4" x="280" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="D4" x="320" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="E4" x="360" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="F4" x="400" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="G4" x="440" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="A4" x="480" y="0" width="40" height="200" class="whitekey"></rect>
      <rect id="B4" x="520" y="0" width="40" height="200" class="whitekey"></rect>

      <rect id="C#3" x="28" y="0" width="25" height="120" class="blackkey"></rect>
      <rect id="D#3" x="68" y="0" width="25" height="120" class="blackkey"></rect>
      <rect id="F#3" x="148" y="0" width="25" height="120" class="blackkey"></rect>
      <rect id="G#3" x="188" y="0" width="25" height="120" class="blackkey"></rect>
      <rect id="A#3" x="228" y="0" width="25" height="120" class="blackkey"></rect>
      <rect id="C#4" x="308" y="0" width="25" height="120" class="blackkey"></rect>
      <rect id="D#4" x="348" y="0" width="25" height="120" class="blackkey"></rect>
      <rect id="F#4" x="428" y="0" width="25" height="120" class="blackkey"></rect>
      <rect id="G#4" x="468" y="0" width="25" height="120" class="blackkey"></rect>
      <rect id="A#4" x="508" y="0" width="25" height="120" class="blackkey"></rect>

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
</template>

<script>
export default {
  name: 'Keyboard',
  props: {
    scaleNotes: Array,
    chordNotes: Array
  },
  methods: {
    displayKeyboard(newScaleNotes, newChordNotes) {
      // Reset all keys to default styles
      const allKeys = document.querySelectorAll('.whitekey, .blackkey');
      allKeys.forEach(key => {
        key.style.fill = key.classList.contains('whitekey') ? 'white' : 'black';
      });

      if (newScaleNotes) {
        // Highlight the keys that are in the scaleNotes prop
        newScaleNotes.forEach(note => {
          const keyElement = document.getElementById(`${note.name}${note.octaveIndex}`);
          if (keyElement) {
            keyElement.style.fill = 'yellow'; // Highlight color
          }
        });
      }

      if (newChordNotes) {
        newChordNotes.forEach(note => {
          const circleElement = document.getElementById(`${note.name}${note.octaveIndex}circle`);
          if (circleElement) {
            circleElement.style.fill = 'yellow'; // Highlight color
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
</style>
