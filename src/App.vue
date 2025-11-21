<template>
  <div id="app">
    <v-container>
      <v-row>
        <v-col>
          <div>current Key: {{ currentKey ? currentKey.name : 'No key selected' }}</div>
          <div>current Scale: {{ currentScale ? currentScale.name : 'No scale selected' }}</div>
          <div>scale Triads: {{ keyChords ? keyChords.map(chord => chord.name).join(', ') : 'No triads available' }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="7">
          <Keyboard :scaleNotes="keyNotes"></Keyboard>
        </v-col>
        <v-col cols="5">
          <v-row>
            <KeyPicker @select-key="handleKeySelection"></KeyPicker>
          </v-row>
          <v-row>
            <ScalePicker @select-scale="handleScaleSelection"></ScalePicker>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Keyboard from './components/Keyboard.vue'
import KeyPicker from './components/KeyPicker.vue';
import ScalePicker from './components/ScalePicker.vue';
import { buildScale, buildScaleTriads } from './models/theory.ts';

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
      keyNotes: null,
      keyChords: null
    };
  },
  methods: {
    handleKeySelection(note) {
      console.log('Selected key in App:', JSON.parse(JSON.stringify(note)));
      console.log('this in handleKeySelection:', this);
      console.log('buildScaleAndTriads on this is:', typeof this.buildScaleAndTriads);
      this.currentKey = note;
      this.buildScaleAndTriads();
    },
    handleScaleSelection(scale) {
      console.log('Selected scale in App:', JSON.parse(JSON.stringify(scale)));
      console.log('this in handleScaleSelection:', this);
      console.log('buildScaleAndTriads on this is:', typeof this.buildScaleAndTriads);
      this.currentScale = scale;
      this.buildScaleAndTriads();
    },
    buildScaleAndTriads() {
      console.log('Building scale and triads with key:', this.currentKey, 'and scale:', this.currentScale);
      if (this.currentKey && this.currentScale) {
        this.keyNotes = buildScale(this.currentKey, this.currentScale);
        this.keyChords = buildScaleTriads(this.currentKey, this.currentScale);
        console.log('Built scale and triads:', JSON.parse(JSON.stringify(this.keyChords)));
      }
    }
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
