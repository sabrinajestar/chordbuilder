<template>
  <div id="app">
    <v-container>
      <v-row>
        <v-col cols="2">
          <TonePlayer :chordNotes="chordNotes"></TonePlayer>
        </v-col>
        <v-col>
          <div>current Key & Scale: {{ currentKey && currentScale ? (currentKey.displayName || currentKey.name) + ' ' + currentScale.name : 'No key or scale selected' }}</div>
          <table>
            <tr>
              <th>Functional Chord</th>
              <th>Chord</th>
              <th>Secondary Dominant Cadence</th>
              <th>Deceptive Resolution</th>
              <th>Substitute Dominant Cadence</th>
            </tr>
            <tr v-for="chord in keyChords" :key="chord.notation" :style="{ backgroundColor: this.fillBasedOnChordFunction(chord, keyNotes) }">
              <td>{{ chord.romanNumeral(this.keyNotes) }}</td>
              <td>{{ chord.notation }}</td>
              <td>{{ chord.secondaryDominant ? chord.secondaryDominant.relatedIIChord.notation + " -> " + chord.secondaryDominant.secondaryDominantChord.notation + " (V/" + this.getRomanNumeral(chord.secondaryDominant.targetChordIndex) + ")" : '&nbsp;' }}</td>
              <td>{{ chord.secondaryDominant ? chord.secondaryDominant.deceptiveResolutionChord.notation + " (VI/" + this.getRomanNumeral(chord.secondaryDominant.targetChordIndex) + ")" : '&nbsp;' }}</td>
              <td>{{ chord.secondaryDominant ? chord.secondaryDominant.subVRelatedIIChord.notation + " -> " + chord.secondaryDominant.substituteDominantChord.notation + " (subV/" + this.getRomanNumeral(chord.secondaryDominant.targetChordIndex) + ")" : '&nbsp;' }}</td>
            </tr>
          </table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="7">
          <v-row>
            <Keyboard :scaleNotes="keyNotes" :chordNotes="chordNotes"></Keyboard>
          </v-row>
          <v-row>
            <ChordProgressionView
              :progression="chordProgression"
              :keyNotes="keyNotes"
              @play="playProgression"
            />
          </v-row>
        </v-col>
        <v-col cols="5">
          <v-row>
            <v-col cols="5">
              <KeyPicker @select-key="handleKeySelection"></KeyPicker>
            </v-col>
            <v-col cols="7">
              <ScalePicker @select-scale="handleScaleSelection"></ScalePicker>
            </v-col>
          </v-row>
          <v-row>
            <v-divider :thickness="4" ></v-divider>
          </v-row>
          <v-row>
            <ChordBuilder @select-chord="handleChordSelection" 
              :scaleNotes="keyNotes" 
              @add-step-to-progression="handleAddStepToProgression"
            />
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
import ChordBuilder from './components/ChordBuilder.vue';
import ChordProgressionView from './components/ChordProgressionView.vue';
import TonePlayer from './components/TonePlayer.vue';
import { buildScale, buildScaleSevenths, ChordProgression, romanNumerals as theoryRomanNumerals,
  analyzeChordFunctionByRoman as theoryAnalyzeChordFunctionByRoman,
  fillBasedOnChordFunction as theoryFillBasedOnChordFunction } from './models/theory';

export default {
  name: 'App',
  components: {
    Keyboard,
    KeyPicker,
    ScalePicker,
    ChordBuilder,
    ChordProgressionView,
    TonePlayer
  },
  data() {
    return {
      currentKey: null,
      currentScale: null,
      keyNotes: null,
      keyChords: null,
      chordNotes: null,
      secondaryDominants: null,
      chordProgression: new ChordProgression(),
      play: null
    };
  },
  methods: {
    handleChordSelection(chord) {
      console.log('Selected chord in App:', JSON.parse(JSON.stringify(chord)));
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
        // this.keyChords = buildScaleTriads(this.currentKey, this.currentScale);
        this.keyChords = buildScaleSevenths(this.currentKey, this.currentScale);
        console.log('Built scale notes:', JSON.parse(JSON.stringify(this.keyNotes)));
        // console.log('Built scale and triads:', JSON.parse(JSON.stringify(this.keyChords)));
        console.log('Determined secondary dominants:', JSON.parse(JSON.stringify(this.secondaryDominants)));
      }
    },
    handleAddStepToProgression(step) {
      console.log('Adding step to progression in App:', JSON.parse(JSON.stringify(step)));
      this.chordProgression.steps.push(step);
      console.log('Updated chord progression in App:', JSON.parse(JSON.stringify(this.chordProgression)));
    },
    analyzeChordFunctionByRoman(chord, keyNotes) {
      return theoryAnalyzeChordFunctionByRoman(chord, keyNotes);
    },
    fillBasedOnChordFunction(chord, keyNotes) {
      return theoryFillBasedOnChordFunction(chord, keyNotes);
    },
    getRomanNumeral(num) {
      return theoryRomanNumerals[num];
    },
    async playProgression() {
      console.log('In App, play progression');
      this.chordNotes = null;
      for (let step of this.chordProgression.steps) {
        console.log(`Playing chord: ${step.chord.romanNumeral(this.keyNotes)} for ${step.beats} beats`);
        for (let i = 1; i <= step.beats; i++) {
          this.chordNotes = step.chord.notes;
          await new Promise(resolve => setTimeout(resolve, 500));
        }
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
.app-select {
  -webkit-appearance: listbox;
  border: 1px solid black;
  border-radius: 4px;
}
</style>
