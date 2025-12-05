<template>
  <div id="chordpicker">
    <p>Select a Chord</p>
    <div>
      <div class="chordSelected" @click="selectChord(chord)"
      :class="{ 'currentChord': currentChord && chord.name === currentChord.name }"
       v-for="chord in chords" :key="chord.name">{{ chord.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChordPicker',
  props: {
    chords: Array
  },
  data() {
    return {
      currentChord: null
    };
  },
  methods: {
    selectChord(chord) {
      // Emit the selected chord to the parent component
      this.$emit('select-chord', chord);
      this.currentChord = chord;
      // eslint-disable-next-line no-console
      console.log('Selected chord:', JSON.parse(JSON.stringify(chord)));
    }
  }
  // },
  // mounted() {
  //   this.selectChord(Chord.Major);
  //   // eslint-disable-next-line no-console
  //   console.log('Initial current Chord at mount:', this.currentChord);
  // }
}
</script>

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
#chordpicker{
  text-align: left;
}
.chordSelected{
  text-align: center;
  height:30px;
  border: 1px solid black;
  margin: 2px;
  line-height: 30px;
  float: left;
  cursor: pointer;
  padding: 0 5px 0 5px;
}
.currentChord{
  background-color: yellow;
}
</style>
