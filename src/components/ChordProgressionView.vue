<template>
  <div id="chordprogression" v-if="progression !== null">
    <p>Current Progression</p>
    <div style="display: flex; flex-direction: column; align-items: flex-start;">
      <svg v-for="line in getNumberOfLines()" :key="`progression-line-${line}`" width="640" :height="100" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="640" height="80" class="progressionview" fill="url(#beatHash)" />
        <g>
          <line v-for="i in 32" :key="`beat-${line}-${i}`" :x1="i * 20" y1="65" y2="80" :x2="i * 20" style="stroke:black;stroke-width:1" />
        </g>
        <g>
          <line v-for="i in 8" :key="`measure-${line}-${i}`" :x1="i * 80" y1="50" y2="80" :x2="i * 80" style="stroke:black;stroke-width:2" />
        </g>
        <g>
          <rect v-for="(step, i) in progression.steps" :key="`step-${i}`" :x="getStepXOnLine(i, line)" y="0" :width="step.beats * 20" height="50" :fill="fillBasedOnChordFunction(step.chord, step.keyRoot, step.keyScale)" stroke="gray" stroke-width="1" :style="{ display: isStepOnLine(i, line) ? 'block' : 'none' }"/>
          <text v-for="(step, i) in progression.steps" :key="`key-${line}-${i}`" :id="`progression-step-${i}-key`" :x="getStepXOnLine(i, line) + (step.beats * 20) / 2" y="10" text-anchor="middle" dominant-baseline="text-top" font-size="11" :style="{ display: isStepOnLine(i, line) ? 'block' : 'none' }">{{ displayKey(i, step.keyRoot, step.keyScale) }}</text>
          <text v-for="(step, i) in progression.steps" :key="`text-${line}-${i}`" :id="`progression-step-${i}`" v-on:click="selectStep(i)" :x="getStepXOnLine(i, line) + (step.beats * 20) / 2" y="30" text-anchor="middle" dominant-baseline="middle" font-size="14" style="cursor: grab;" :style="{ display: isStepOnLine(i, line) ? 'block' : 'none' }">{{ stepRomanNumeral(step) }}</text>
        </g>
      </svg>
      <svg width="640" height="100" xmlns="http://www.w3.org/2000/svg">
        <a @click="play">
          <polygon points="0,5 0,25 17,15" style="fill:green;stroke:black;stroke-width:1" />
          <title>Play Progression</title>
        </a>
        <a @click="pause">
          <rect x="30" y="5" width="10" height="20" fill-opacity="0"/>
          <rect x="30" y="5" width="3" height="20" style="fill:yellow;" />
          <rect x="37" y="5" width="3" height="20" style="fill:yellow;" />
        </a>
        <a @click="stop">
          <rect x="55" y="5" width="20" height="20" style="fill:red;stroke:black;stroke-width:1" />
        </a>
        <a @click="shiftLeft">
          <polygon points="112,5 112,25 95,15" style="fill:white;stroke:black;stroke-width:1" />
          <rect x="112" y="12.5" width="10" height="5" style="fill:white;stroke:black;stroke-width:1" />
          <title>Shift This Chord Left</title>
        </a>
        <a @click="shiftRight">
          <polygon points="135,5 135,25 152,15" style="fill:white;stroke:black;stroke-width:1" />
          <rect x="125" y="12.5" width="10" height="5" style="fill:white;stroke:black;stroke-width:1" />
          <title>Shift This Chord Right</title>
        </a>
        <a @click="deleteStep">
          <line x1="175" y1="5" x2="200" y2="30" style="stroke:red;stroke-width:5" />
          <line x1="200" y1="5" x2="175" y2="30" style="stroke:red;stroke-width:5" />
          <title>Delete This Chord</title>
        </a>
        <a @click="deleteAll">
          <!-- based on https://icons.getbootstrap.com/icons/trash/ -->
          <g transform="translate(220, 3) scale(1.875)">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </g>
          <title>Clear The Progression</title>
        </a>
        <a @click="exportToMIDI">
          <!-- based on https://icons.getbootstrap.com/icons/file-earmark-arrow-down/ -->
          <g transform="translate(265, 3) scale(1.875)">
            <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
          </g>
          <title>Export To MIDI</title>
        </a>
      </svg>
      <p>Color codes:</p>
      <ul>
        <li><span style="background-color: palegreen;">Diatonic Tonic Chord</span></li>
        <li><span style="background-color: mediumSeaGreen;">Chromatically Altered Tonic Chord</span></li>
        <li><span style="background-color: lightyellow;">Diatonic Subdominant Chord</span></li>
        <li><span style="background-color: khaki;">Chromatically Altered Subdominant Chord</span></li>
        <li><span style="background-color: lightcoral;">Diatonic Dominant Chord</span></li>
        <li><span style="background-color: indianred;">Chromatically Altered Dominant Chord</span></li>
        <li><span style="background-color: plum;">Other chromatic chords</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ChordProgression, buildScale, Note, fillBasedOnChordFunction as theoryFillBasedOnChordFunction } from '../models/theory.ts';
// import { setTimeout as delay } from 'timers/promises';

export default {
  name: 'ChordProgressionView',
  props: {
    progression: ChordProgression
  },
  methods: {
    getTotalBeats() {
      return this.progression.steps.reduce((total, step) => total + step.beats, 0);
    },
    getNumberOfLines() {
      const totalBeats = this.getTotalBeats();
      return Math.ceil(totalBeats / 32);
    },
    getStepStartBeat(index) {
      let beat = 0;
      for (let i = 0; i < index; i++) {
        beat += this.progression.steps[i].beats;
      }
      return beat;
    },
    isStepOnLine(stepIndex, line) {
      const stepStartBeat = this.getStepStartBeat(stepIndex);
      const stepEndBeat = stepStartBeat + this.progression.steps[stepIndex].beats;
      const lineStartBeat = (line - 1) * 32;
      const lineEndBeat = line * 32;
      
      // Check if step overlaps with this line
      return stepStartBeat < lineEndBeat && stepEndBeat > lineStartBeat;
    },
    getStepXOnLine(stepIndex, line) {
      const stepStartBeat = this.getStepStartBeat(stepIndex);
      const lineStartBeat = (line - 1) * 32;
      const xOnLine = (stepStartBeat - lineStartBeat) * 20;
      return Math.max(0, xOnLine);
    },
    getStepX(index) {
      let x = 0;
      for (let i = 0; i < index; i++) {
        x += this.progression.steps[i].beats * 20;
      }
      return x;
    },
    fillBasedOnChordFunction(chord, keyRoot, keyScale) {
      if (!chord || !keyRoot || !keyScale) {
        return 'gray';
      }
      return theoryFillBasedOnChordFunction(chord, keyRoot, keyScale);
    },
    stepRomanNumeral(step) {
      if (!step?.chord) {
        return '';
      }
      if (!step.keyRoot || !step.keyScale) {
        return step.chord.notation;
      }
      const stepScaleNotes = buildScale(step.keyRoot, step.keyScale);
      return step.chord.romanNumeral(stepScaleNotes);
    },
    play() {
      console.log('Emit play event');
      this.$emit('play');
    },
    setStepIndex(step, index) {
      step.index = index;
    },
    // pause() {
    //   console.log('Emit pause event');
    //   this.$emit('pause');
    // },
    // stop() {
    //   console.log('Emit stop event');
    //   this.$emit('stop');
    // },
    selectStep(index) {
      console.log('Selected step in progression:', JSON.parse(JSON.stringify(this.progression.steps[index])));
      this.$emit('select-step', this.progression.steps[index]);
    },
    shiftLeft() {
      console.log('Emit shift left event');
      this.$emit('shift-left');
    },
    shiftRight() {
      console.log('Emit shift right event');
      this.$emit('shift-right');
    },
    deleteStep() {
      console.log('Emit delete step event');
      this.$emit('delete-step');
    },
    displayKey(index, keyRoot, keyScale) {
      if (!keyRoot || !keyScale) return '';
      if (index === 0 || keyRoot != this.progression.steps[index-1].keyRoot) {
        console.log('Displaying key for step', index, ':', keyRoot.name, keyScale.name);
        return (keyRoot.displayName || keyRoot.name) + ' ' + keyScale.name;
      } else {
        return '';
      }
    },
    deleteAll() {
      console.log('Emit delete all steps event');
      this.$emit('delete-all-steps');
    },
    exportToMIDI() {
      console.log('Begin export to MIDI process');
      const MidiWriter = require('midi-writer-js');
      const track = new MidiWriter.Track();
      track.setTempo(120);
      this.progression.steps.forEach(step => {
        const chordNotes = step.chord.notes.filter(note => note !== Note.NullNote).map(note => note.name + note.octaveIndex);
        const duration = 'T' + (step.beats * 128); // Convert beats to ticks (assuming 128 ticks per beat)
        console.log('Adding step to MIDI track:', chordNotes, 'with duration:', duration);
        const chordEvent = new MidiWriter.NoteEvent({pitch: chordNotes, duration: duration});
        console.log('Created MIDI event:', chordEvent);
        track.addEvent(chordEvent);
      });
      const write = new MidiWriter.Writer(track);
      const midiData = write.buildFile();
      console.log('MIDI data:', midiData);

      const saveFile = async (blob) => {
        try {
          const handle = await window.showSaveFilePicker({
            types: [{
              accept: {
                'audio/midi': ['.midi', '.mid']
              },
            }],
          });
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
          return handle;
        } catch (err) {
          console.error(err.name, err.message);
        }
      };

      const blob = new Blob([midiData], { type: 'audio/midi' });
      saveFile(blob);
      console.log('Export to MIDI process completed');
    }
  }
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
  cursor: pointer;
}
#keypicker{
  text-align: left;
}
.progressionsteps{
  text-align: center;
  height:30px;
  border: 1px solid black;
  margin: 2px;
  line-height: 30px;
  float: left;
  cursor: pointer;
  padding: 0 5px 0 5px;
}
.progressionview{
  border: 1px solid black;
  fill:white;
  stroke-width:3;
  stroke:black
}
.currentTonic{
  background-color: yellow;
}
</style>
