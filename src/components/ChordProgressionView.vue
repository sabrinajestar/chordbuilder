<template>
  <div id="chordprogression" v-if="progression !== null">
    <p>Current Progression</p>
    <div style="display: flex; flex-direction: column; align-items: flex-start;">
      <svg width="640" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="640" height="100" class="progressionview" fill="url(#beatHash)" />
        <g>
          <line v-for="i in 32" :key="i" :x1="i * 20" y1="70" y2="100" :x2="i * 20" style="stroke:black;stroke-width:1" />
        </g>
        <g>
          <line v-for="i in 8" :key="i" :x1="i * 80" y1="50" y2="100" :x2="i * 80" style="stroke:black;stroke-width:2" />
        </g>
        <g>
          <rect v-for="(step, i) in progression.steps" :key="step.chord.name" :x="getStepX(i)" y="0" :width="step.beats * 20" height="50" :fill="fillBasedOnChordFunction(step.chord, this.keyNotes)" stroke="gray" stroke-width="1"/>
          <text v-for="(step, i) in progression.steps" :key="'text-' + step.chord.name" :x="getStepX(i) + (step.beats * 20) / 2" y="30" text-anchor="middle" dominant-baseline="middle" font-size="14" style="cursor: grab;">{{ step.chord.romanNumeral(this.keyNotes) }}</text>
        </g>
      </svg>
      <svg width="640" height="100" xmlns="http://www.w3.org/2000/svg">
        <a @click="play">
          <polygon points="0,5 0,25 17,15" style="fill:green;stroke:black;stroke-width:1" />
        </a>
        <a @click="pause">
          <rect x="30" y="5" width="10" height="20" fill-opacity="0"/>
          <rect x="30" y="5" width="3" height="20" style="fill:yellow;" />
          <rect x="37" y="5" width="3" height="20" style="fill:yellow;" />
        </a>
        <a @click="stop">
          <rect x="55" y="5" width="20" height="20" style="fill:red;stroke:black;stroke-width:1" />
        </a>
      </svg>
    </div>
  </div>
</template>

<script>
import { ChordProgression, Note, fillBasedOnChordFunction as theoryFillBasedOnChordFunction } from '../models/theory.ts';
// import { setTimeout as delay } from 'timers/promises';

export default {
  name: 'ChordProgressionView',
  props: {
    progression: ChordProgression,
    keyNotes: Array[Note]
  },
  methods: {
    getStepX(index) {
      let x = 0;
      for (let i = 0; i < index; i++) {
        x += this.progression.steps[i].beats * 20;
      }
      return x;
    },
    fillBasedOnChordFunction(chord, keyNotes) {
      return theoryFillBasedOnChordFunction(chord, keyNotes);
    },
    play() {
      console.log('Emit play event');
      this.$emit('play');
    },
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
