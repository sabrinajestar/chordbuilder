<template>
  <div id="app">
    <v-container>
      <v-row>
        <v-col>
          <div>current Key & Scale: {{ currentKey && currentScale ? displaySharpsAndFlats(currentKey.name) + ' ' + displaySharpsAndFlats(currentScale.name) : 'No key or scale selected' }}</div>
          <div>scale Triads: {{ keyChords ? keyChords.map(chord => displaySharpsAndFlats(chord.name)).join(', ') : 'No triads available' }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="7">
          <Keyboard :scaleNotes="keyNotes" :chordNotes="chordNotes"></Keyboard>
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
      <v-row>
        <v-col cols="6">
          Chord Progression tool goes here
        </v-col>
        <v-col cols="6">
          <ChordBuilder @select-chord="handleChordSelection" :scaleNotes="keyNotes"></ChordBuilder>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Keyboard from './components/Keyboard.vue'
import KeyPicker from './components/KeyPicker.vue';
import ScalePicker from './components/ScalePicker.vue';
import ChordBuilder from './components/ChordBuilder.vue';
import { buildScale, buildScaleTriads, displaySharpsAndFlats } from './models/theory';

export default {
  name: 'App',
  components: {
    Keyboard,
    KeyPicker,
    ScalePicker,
    ChordBuilder
  },
  data() {
    return {
      currentKey: null,
      currentScale: null,
      keyNotes: null,
      keyChords: null,
      chordNotes: null
    };
  },
  methods: {
    displaySharpsAndFlats,
    handleChordSelection(chord) {
      // console.log('Selected chord in App:', JSON.parse(JSON.stringify(chord)));
      this.chordNotes = chord ? [...chord.notes] : null;
      // console.log('Updated chord notes in App:', JSON.parse(JSON.stringify(this.chordNotes)));
      // Additional logic for handling chord selection can be added here
    },
    handleKeySelection(note) {
      // console.log('Selected key in App:', JSON.parse(JSON.stringify(note)));
      // console.log('this in handleKeySelection:', this);
      // console.log('buildScaleAndTriads on this is:', typeof this.buildScaleAndTriads);
      this.currentKey = note;
      this.buildScaleAndTriads();
      this.chordNotes = null; // Reset chord notes on key change
    },
    handleScaleSelection(scale) {
      // console.log('Selected scale in App:', JSON.parse(JSON.stringify(scale)));
      // console.log('this in handleScaleSelection:', this);
      // console.log('buildScaleAndTriads on this is:', typeof this.buildScaleAndTriads);
      this.currentScale = scale;
      this.buildScaleAndTriads();
      this.chordNotes = null; // Reset chord notes on scale change
    },
    buildScaleAndTriads() {
      // console.log('Building scale and triads with key:', this.currentKey, 'and scale:', this.currentScale);
      if (this.currentKey && this.currentScale) {
        this.keyNotes = buildScale(this.currentKey, this.currentScale);
        this.keyChords = buildScaleTriads(this.currentKey, this.currentScale);
        // console.log('Built scale and triads:', JSON.parse(JSON.stringify(this.keyChords)));
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
