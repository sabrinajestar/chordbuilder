<template>
  <div id="app">
    <div>current Key: {{ currentKey ? currentKey.name : 'No key selected' }}</div>
    <div>current Scale: {{ currentScale ? currentScale.name : 'No scale selected' }}</div>
    <Keyboard :scaleNotes="keyNotes"></Keyboard>
    <KeyPicker @select-key="handleKeySelection"></KeyPicker>
    <ScalePicker @select-scale="handleScaleSelection"></ScalePicker>
  </div>
</template>

<script>
import Keyboard from './components/Keyboard.vue'
import KeyPicker from './components/KeyPicker.vue';
import ScalePicker from './components/ScalePicker.vue';
import { buildScale, nextNote } from './models/theory.ts';

function handleKeySelection(note) {
  // Handle key selection logic here
  // For example, update a data property or log the selected note
  console.log('Selected key in App:', JSON.parse(JSON.stringify(note)));
  this.currentKey = note;
  if (this.currentScale) {
    // Update keyNotes based on the new key if necessary
    this.keyNotes = buildScale(this.currentKey, this.currentScale);
    console.log('Updated keyNotes:', JSON.parse(JSON.stringify(this.keyNotes)));
  }
}

function handleScaleSelection(scale) {
  // Handle scale selection logic here
  // For example, update a data property or log the selected scale
  console.log('Selected scale in App:', JSON.parse(JSON.stringify(scale)));
  this.currentScale = scale;
    if (this.currentKey) {
    // Update keyNotes based on the new key if necessary
    this.keyNotes = buildScale(this.currentKey, this.currentScale);
    console.log('Updated keyNotes:', JSON.parse(JSON.stringify(this.keyNotes)));
  }
}

export default {
  name: 'App',
  components: {
    Keyboard,
    KeyPicker,
    ScalePicker
  },
  data() {
    return {
      currentKey: null,
      currentScale: null,
      keyNotes: null
    };
  },
  methods: {
    handleKeySelection,
    handleScaleSelection
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightblue;
}
</style>
