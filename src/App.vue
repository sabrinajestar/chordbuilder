<template>
  <div id="app">
    <v-container>
      <v-row align="center">
        <v-col cols="2" class="d-flex align-items-center">
          <TonePlayer :chordNotes="chordNotes"></TonePlayer>
        </v-col>
        <v-col cols="2" class="d-flex align-items-center">
          <KeyPicker @select-key="handleKeySelection" :key-in="currentKey"></KeyPicker>
        </v-col>
        <v-col cols="4" class="d-flex align-items-center">
            <ScalePicker @select-scale="handleScaleSelection"></ScalePicker>
        </v-col>
        <v-col cols="12">
          <div>
            <p>Current Key & Scale: {{ currentKey && currentScale ? (currentKey.displayName || currentKey.name) + ' ' + currentScale.name : 'No key or scale selected' }}</p>
            <p>Cycle of Fifths: <span v-for="note in cycleOfFifths" :key="`fifths-${note.name}`"><a href="#" v-on:click="handleKeySelection(note)">{{ note.displayName || note.name }}</a> &nbsp;</span></p>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Functional Chord</th>
                <th>Chord</th>
                <th>Secondary Dominant Cadence</th>
                <th>Deceptive Resolution</th>
                <th>Substitute Dominant Cadence</th>
                <th>Tritone Substitutes</th>
                <th>Chromatic Mediants</th>
              </tr>
              <tr v-for="chord in keyChords" :key="chord.notation" :style="{ backgroundColor: this.fillBasedOnChordFunction(chord) }">
                <td>{{ chord.romanNumeral(this.keyNotes) }}</td>
                <td><a href="#" v-on:click="handleChordSelection(chord)">{{ chord.notation }}</a></td>
                <td><p v-if="chord.relatedChords"><a href="#" v-on:click="handleChordSelection(chord.relatedChords.relatedIIChord)">{{ chord.relatedChords.relatedIIChord.notation }}</a> -> <a href="#" v-on:click="handleChordSelection(chord.relatedChords.secondaryDominantChord)">{{chord.relatedChords.secondaryDominantChord.notation + " (V/" + this.getRomanNumeral(chord.relatedChords.targetChordIndex) + ")"}}</a></p></td>
                <td><p v-if="chord.relatedChords"><a href="#" v-on:click="handleChordSelection(chord.relatedChords.deceptiveResolutionChord)">{{ chord.relatedChords.deceptiveResolutionChord.notation + " (VI/" + this.getRomanNumeral(chord.relatedChords.targetChordIndex) + ")" }}</a></p></td>
                <td><p v-if="chord.relatedChords"><a href="#" v-on:click="handleChordSelection(chord.relatedChords.subVRelatedIIChord)">{{ chord.relatedChords.subVRelatedIIChord.notation }}</a> -> <a href="#" v-on:click="handleChordSelection(chord.relatedChords.substituteDominantChord)">{{ chord.relatedChords.substituteDominantChord.notation + " (subV/" + this.getRomanNumeral(chord.relatedChords.targetChordIndex) + ")" }}</a></p></td>
                <td><p v-if="chord.relatedChords && chord.relatedChords.tritoneSubstituteChord"><a href="#" v-on:click="handleChordSelection(chord.relatedChords.tritoneSubstituteChord)">{{ chord.relatedChords.tritoneSubstituteChord.notation }}</a></p></td>
                <td><p v-if="chord.relatedChords && chord.relatedChords.chromaticMediantChord"><a href="#" v-on:click="handleChordSelection(chord.relatedChords.chromaticMediantChord)">{{ chord.relatedChords.chromaticMediantChord.notation }}</a></p></td>
              </tr>
            </tbody>
          </table>
          <div>
            <p>Other Chromatics: <span v-for="chord in otherChromaticChords" :key="chord.notation"><a href="#" v-on:click="handleChordSelection(chord)">{{ chord.notation + " (" + chord.romanNumeral(this.keyNotes) + ")" }}</a> &nbsp;</span></p>
          </div>
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
              @play="playProgression"
              @select-step="handleStepSelection" 
              @shift-left="handleShiftLeft"
              @shift-right="handleShiftRight"
              @delete-step="handleDeleteStep"
              @delete-all-steps="handleDeleteAllSteps"
            ></ChordProgressionView>
          </v-row>
        </v-col>
        <v-col cols="5">
          <v-row>
            <ChordBuilder @select-chord="handleChordSelection"
              :chordIn="currentChord"
              :step="currentStep"
              :scaleNotes="keyNotes" 
              @add-step-to-progression="handleAddStepToProgression"
              @modify-progression="handleModifyProgression"
             ></ChordBuilder>
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
import { buildScale, buildScaleSevenths, ChordProgression, Step, cloneChord, Note,
  romanNumerals as theoryRomanNumerals,
  analyzeChordFunctionByRoman as theoryAnalyzeChordFunctionByRoman,
  populateOtherChromaticChords as theoryPopulateOtherChromaticChords,
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
      currentChord: null,
      currentStep: null,
      currentStepIndex: null,
      relatedChords: null,
      chordProgression: new ChordProgression(),
      otherChromaticChords: [],
      play: null,
      cycleOfFifths: [Note.C, Note.G, Note.D, Note.A, Note.E, Note.B, Note.FSHARP, Note.CSHARP, Note.GSHARP, Note.DSHARP, Note.ASHARP, Note.F],
    };
  },
  methods: {
    handleChordSelection(chord) {
      console.log('Selected chord in App:', JSON.parse(JSON.stringify(chord)));
      this.chordNotes = chord ? [...chord.notes] : null;
      this.currentChord = chord;
      // console.log('Updated chord notes in App:', JSON.parse(JSON.stringify(this.chordNotes)));
      console.log('Current values in App after selecting chord:', {
        currentKey: JSON.parse(JSON.stringify(this.currentKey)),
        currentScale: JSON.parse(JSON.stringify(this.currentScale)),
        currentChord: JSON.parse(JSON.stringify(this.currentChord)),
        chordProgression: JSON.parse(JSON.stringify(this.chordProgression))
      });
    },
    handleStepSelection(step) {
      console.log('Selected step in App:', JSON.parse(JSON.stringify(step)));
      this.currentStep = step ? new Step(step.beats, cloneChord(step.chord), step.keyRoot, step.keyScale, step.index) : null;
      this.currentStepIndex = step ? step.index : null;
      this.chordNotes = step?.chord ? [...step.chord.notes] : null;
      this.currentChord = step?.chord || null;
      if (step?.keyRoot) {
        this.currentKey = step.keyRoot;
      }
      if (step?.keyScale) {
        this.currentScale = step.keyScale;
      }
      // console.log('Updated current step in App:', JSON.parse(JSON.stringify(this.currentStep)));
    },
    handleKeySelection(note) {
      // console.log('Selected key in App:', JSON.parse(JSON.stringify(note)));
      // console.log('this in handleKeySelection:', this);
      // console.log('buildScaleAndTriads on this is:', typeof this.buildScaleAndTriads);
      this.currentKey = note;
      this.buildScaleAndTriads();
      this.chordNotes = null; // Reset chord notes on key change
      this.otherChromaticChords = theoryPopulateOtherChromaticChords(this.currentKey, this.currentScale);
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
        this.keyChords = buildScaleSevenths(this.currentKey, this.currentScale, this.keyNotes);
        console.log('Built scale notes:', JSON.parse(JSON.stringify(this.keyNotes)));
        // console.log('Built scale and triads:', JSON.parse(JSON.stringify(this.keyChords)));
        console.log('Determined related chords:', JSON.parse(JSON.stringify(this.relatedChords)));
      }
    },
    handleAddStepToProgression(step) {
      console.log('Adding step to progression in App:', JSON.parse(JSON.stringify(step)));
      const stepKeyRoot = step?.keyRoot || this.currentKey;
      const stepKeyScale = step?.keyScale || this.currentScale;
      const newStep = new Step(step.beats, cloneChord(step.chord), stepKeyRoot, stepKeyScale, this.chordProgression.steps.length);
      this.chordProgression.steps.push(newStep);
      console.log('Updated chord progression in App:', JSON.parse(JSON.stringify(this.chordProgression)));
      console.log('Current values in App after adding step:', {
        currentKey: JSON.parse(JSON.stringify(this.currentKey)),
        currentScale: JSON.parse(JSON.stringify(this.currentScale)),
        currentChord: JSON.parse(JSON.stringify(this.currentChord)),
        chordProgression: JSON.parse(JSON.stringify(this.chordProgression))
      });
    },
    handleModifyProgression(step) {
      console.log("current step index in App before modification:", JSON.parse(JSON.stringify(this.currentStepIndex)));
      console.log('Modifying step in progression in App:', JSON.parse(JSON.stringify(step)));
      const stepIndex = this.currentStepIndex;
      const existingStep = this.chordProgression.steps[stepIndex];
      const stepKeyRoot = step?.keyRoot || existingStep?.keyRoot || this.currentKey;
      const stepKeyScale = step?.keyScale || existingStep?.keyScale || this.currentScale;
      const updatedStep = new Step(step.beats, cloneChord(step.chord), stepKeyRoot, stepKeyScale, stepIndex);
      this.chordProgression.steps[stepIndex] = updatedStep;
      this.currentStep = new Step(updatedStep.beats, cloneChord(updatedStep.chord), updatedStep.keyRoot, updatedStep.keyScale, updatedStep.index);
      console.log('Updated chord progression in App:', JSON.parse(JSON.stringify(this.chordProgression)));
    },
    handleShiftLeft() {
      console.log('Shifting progression step left in App');
      if (this.chordProgression.steps.length > 1 && this.currentStepIndex > 0) {
        const thisStep = this.chordProgression.steps[this.currentStepIndex];
        thisStep.index = this.currentStepIndex-1;
        const previousStep = this.chordProgression.steps[this.currentStepIndex - 1];
        previousStep.index = this.currentStepIndex;
        this.chordProgression.steps[this.currentStepIndex - 1] = thisStep;
        this.chordProgression.steps[this.currentStepIndex] = previousStep;
        this.currentStepIndex -= 1;
        console.log('Updated chord progression after shift left:', JSON.parse(JSON.stringify(this.chordProgression)));
      }
    },
    handleShiftRight() {
      console.log('Shifting progression step right in App');
      if (this.chordProgression.steps.length > 1 && this.currentStepIndex < this.chordProgression.steps.length - 1) {
        const thisStep = this.chordProgression.steps[this.currentStepIndex];
        thisStep.index = this.currentStepIndex+1;
        const nextStep = this.chordProgression.steps[this.currentStepIndex + 1];
        nextStep.index = this.currentStepIndex;
        this.chordProgression.steps[this.currentStepIndex + 1] = thisStep;
        this.chordProgression.steps[this.currentStepIndex] = nextStep;
        this.currentStepIndex += 1;
        console.log('Updated chord progression after shift right:', JSON.parse(JSON.stringify(this.chordProgression)));
      }
    },
    handleDeleteStep() {
      console.log('Deleting progression step in App');
      if (this.chordProgression.steps.length > 0) {
        this.chordProgression.steps.splice(this.currentStepIndex, 1);
        // Update indices of remaining steps
        for (let i = 0; i < this.chordProgression.steps.length; i++) {
          this.chordProgression.steps[i].index = i;
        }
        // Update current step index and selection
        if (this.currentStepIndex >= this.chordProgression.steps.length) {
          this.currentStepIndex = this.chordProgression.steps.length - 1;
        }
        this.currentStep = this.chordProgression.steps[this.currentStepIndex] || null;
        console.log('Updated chord progression after deletion:', JSON.parse(JSON.stringify(this.chordProgression)));
      }
    },
    handleDeleteAllSteps() {
      console.log('Deleting all progression steps in App');
      this.chordProgression.steps = [];
      this.currentStepIndex = null;
      this.currentStep = null;
      console.log('Updated chord progression after deleting all steps:', JSON.parse(JSON.stringify(this.chordProgression)));
    },
    analyzeChordFunctionByRoman(chord, keyNotes) {
      return theoryAnalyzeChordFunctionByRoman(chord, keyNotes);
    },
    fillBasedOnChordFunction(chord) {
      return theoryFillBasedOnChordFunction(chord, this.currentKey, this.currentScale);
    },
    getRomanNumeral(num) {
      return theoryRomanNumerals[num];
    },
    async playProgression() {
      console.log('In App, play progression');
      this.chordNotes = null;
      for (let step of this.chordProgression.steps) {
        // Update key/scale once per step and rebuild the table before playing beats
        if (step.keyRoot && step.keyScale) {
          this.currentKey = step.keyRoot;
          this.currentScale = step.keyScale;
          this.buildScaleAndTriads();
          await this.$nextTick(); // let Vue flush the table re-render before the first beat
        }
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
