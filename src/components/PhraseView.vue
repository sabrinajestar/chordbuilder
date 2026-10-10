<template>
  <div id="phrase" v-if="phrase !== null">
    <p class="phrasetitle">{{  phrase.label }}</p>
    <div style="display: flex; flex-direction: column; align-items: flex-start;">
      <p id="label"><span id="phraseLabel">{{ phrase.title }}</span></p>
      <svg v-for="line in getNumberOfLines()" :key="`phrase-line-${line}`" width="640" :height="100" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="640" height="100" class="phraseview" fill="url(#beatHash)" />
        <g>
          <line v-for="i in 32" :key="`beat-${line}-${i}`" :x1="i * 20" y1="85" y2="100" :x2="i * 20" style="stroke:black;stroke-width:1" />
        </g>
        <g>
          <line v-for="x in getMeasureLinePositions(line)" :key="`measure-${line}-${x}`" :x1="x" y1="70" y2="100" :x2="x" style="stroke:black;stroke-width:2" />
        </g>
        <g
            v-for="(step, i) in phrase.steps"
            :key="`step-${i}`"
            :transform="`translate(${getStepXOnLine(i, line)}, 0)`">
          <text
            :id="`phrase-step-${i}-key`"
            x="3"
            y="4"
            class="step-label-svg">{{ displayKey(i, step.keyRoot, step.keyScale) }} {{ displayMeter(i) }}</text>
          <g
            :style="{ display: isStepOnLine(i, line) ? 'block' : 'none', cursor: 'pointer' }"
            @click="selectStep(i)">
            <rect
              :width="step.beats * 20"
              height="50"
              y="20"
              :fill="fillBasedOnChordFunction(step.chord, step.keyRoot, step.keyScale)"
              stroke="gray"
              stroke-width="1" />
            <text
              :id="`phrase-step-${i}`"
              :x="(step.beats * 20) / 2"
              y="50"
              text-anchor="middle"
              dominant-baseline="middle"
              font-size="14">{{ stepRomanNumeral(step) }}</text>
          </g>
        </g>
      </svg>
      <div>
        <button class="iconButton" @click="shiftLeft" aria-label="Shift Left" title="Shift this chord left">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g transform="translate(2,2) scale(1.25)">
              <path fill="black" stroke="black" stroke-width="0.6" fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
            </g>
          </svg>
        </button>
        <button class="iconButton" @click="shiftRight" aria-label="Shift Right" title="Shift this chord right">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g transform="translate(2,2) scale(1.25)">
              <path fill="black" stroke="black" stroke-width="0.6" fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
            </g>
          </svg>
        </button>
        <button class="iconButton" @click="deleteStep" aria-label="Delete This Step" title="Delete this chord">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g transform="translate(2,2)">
              <line x1="0" y1="0" x2="20" y2="20" style="stroke:red;stroke-width:5" />
              <line x1="20" y1="0" x2="0" y2="20" style="stroke:red;stroke-width:5" />
            </g>
          </svg>
        </button>
        <button class="iconButton" @click="deleteAll" aria-label="Delete All Steps" title="Delete all chords">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <!-- based on https://icons.getbootstrap.com/icons/trash/ -->
            <g transform="translate(2,2) scale(1.25)">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </g>
          </svg>
        </button>
        <button class="iconButton" @click="$emit('play-phrase')" aria-label="Play phrase" title="Play this phrase">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon points="4,3 4,21 20,12" style="fill:green;stroke:black;stroke-width:1" />
          </svg>
        </button>
      </div>
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
import { Phrase, buildScale, Scale, Meter,
  fillBasedOnChordFunction as theoryFillBasedOnChordFunction } from '../models/theory.ts';
// import { setTimeout as delay } from 'timers/promises';

export default {
  name: 'PhraseView',
  props: {
    phrase: Phrase,
    currentMeter: Meter
  },
  methods: {
    getFallbackMeter() {
      return this.currentMeter || new Meter(4, 4);
    },
    getTotalBeats() {
      return this.phrase.steps.reduce((total, step) => total + step.beats, 0);
    },
    getNumberOfLines() {
      const totalBeats = this.getTotalBeats();
      return Math.ceil(totalBeats / 32);
    },
    getStepStartBeat(index) {
      let beat = 0;
      for (let i = 0; i < index; i++) {
        beat += this.phrase.steps[i].beats;
      }
      return beat;
    },
    isStepOnLine(stepIndex, line) {
      const stepStartBeat = this.getStepStartBeat(stepIndex);
      const stepEndBeat = stepStartBeat + this.phrase.steps[stepIndex].beats;
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
    getEffectiveMeterForStep(index) {
      if (!this.phrase?.steps?.length) {
        return this.getFallbackMeter();
      }
      for (let i = index; i >= 0; i -= 1) {
        const stepMeter = this.phrase.steps[i]?.meter;
        if (stepMeter) {
          return stepMeter;
        }
      }
      return this.getFallbackMeter();
    },
    getMeterChanges() {
      const steps = this.phrase?.steps || [];
      const totalBeats = this.getTotalBeats();

      if (steps.length === 0) {
        return [{ beat: 0, meter: this.getFallbackMeter() }];
      }

      const changes = [{ beat: 0, meter: this.getEffectiveMeterForStep(0) }];
      let currentMeter = changes[0].meter;
      let currentBeat = 0;

      for (let i = 1; i < steps.length; i += 1) {
        currentBeat += steps[i - 1].beats;
        const nextMeter = this.getEffectiveMeterForStep(i);
        if (!this.metersMatch(currentMeter, nextMeter)) {
          changes.push({ beat: currentBeat, meter: nextMeter });
          currentMeter = nextMeter;
        }
      }

      const trailingMeter = this.getFallbackMeter();
      if (totalBeats > 0 && !this.metersMatch(currentMeter, trailingMeter)) {
        changes.push({ beat: totalBeats, meter: trailingMeter });
      }

      return changes;
    },
    getMeasureLinePositions(line) {
      const lineStartBeat = (line - 1) * 32;
      const lineEndBeat = line * 32;
      const positions = new Set();

      const meterChanges = this.getMeterChanges();
      let activeMeter = meterChanges[0]?.meter || this.getFallbackMeter();
      let pendingMeter = null;
      let nextChangeIndex = 1;
      let measureBoundaryBeat = 0;

      while (measureBoundaryBeat < lineEndBeat) {
        const nextMeasureBoundaryBeat = measureBoundaryBeat + activeMeter.beatsPerMeasure;

        while (nextChangeIndex < meterChanges.length && meterChanges[nextChangeIndex].beat <= nextMeasureBoundaryBeat) {
          pendingMeter = meterChanges[nextChangeIndex].meter;
          nextChangeIndex += 1;
        }

        if (nextMeasureBoundaryBeat > lineStartBeat && nextMeasureBoundaryBeat < lineEndBeat) {
          positions.add((nextMeasureBoundaryBeat - lineStartBeat) * 20);
        }

        measureBoundaryBeat = nextMeasureBoundaryBeat;

        if (pendingMeter) {
          activeMeter = pendingMeter;
          pendingMeter = null;
        }
      }

      return Array.from(positions).sort((left, right) => left - right);
    },
    getStepX(index) {
      let x = 0;
      for (let i = 0; i < index; i++) {
        x += this.phrase.steps[i].beats * 20;
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
      if (step.majorScale) {
        const majorScaleNotes = buildScale(step.keyRoot, Scale.Major);
        return step.chord.romanNumeral(majorScaleNotes);
      }
      return step.chord.romanNumeral(buildScale(step.keyRoot, step.keyScale));
    },
    play() {
      console.log('Emit play event');
      this.$emit('play-phrase');
    },
    setStepIndex(step, index) {
      step.index = index;
    },
    selectStep(index) {
      console.log('Selected step in phrase:', JSON.parse(JSON.stringify(this.phrase.steps[index])));
      this.$emit('select-step', this.phrase.steps[index]);
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
      if (index === 0 || keyRoot != this.phrase.steps[index-1].keyRoot || keyScale != this.phrase.steps[index-1].keyScale) {
        console.log('Displaying key for step', index, ':', keyRoot.name, keyScale.name);
        return (keyRoot.displayName || keyRoot.name) + ' ' + keyScale.name;
      } else {
        return '';
      }
    },
    metersMatch(leftMeter, rightMeter) {
      if (!leftMeter && !rightMeter) {
        return true;
      }
      if (!leftMeter || !rightMeter) {
        return false;
      }
      return Number(leftMeter.beatsPerMeasure) === Number(rightMeter.beatsPerMeasure)
        && Number(leftMeter.beatUnit) === Number(rightMeter.beatUnit);
    },
    formatMeter(meter) {
      if (!meter) return '';
      return Number(meter.beatsPerMeasure) + '/' + Number(meter.beatUnit);
    },
    displayMeter(index) {
      console.log('Displaying meter for step', index, this.phrase.steps[index]);
      const meter = this.phrase?.steps?.[index]?.meter;
      if (!meter) {
        return '';
      }
      if (index === 0) {
        return this.formatMeter(meter);
      }
      const previousMeter = this.phrase?.steps?.[index - 1]?.meter;
      return this.metersMatch(meter, previousMeter) ? '' : this.formatMeter(meter);
    },
    deleteAll() {
      console.log('Emit delete all steps event');
      this.$emit('delete-all-steps');
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
#label{
  width: 640px;
  display: inline-flex;
  flex-direction: column;
}
#phraseLabel{
  vertical-align: bottom;
  text-align: left;
  font-weight: bold;
  font-size: 0.7em;
}
#phraseReps{
  vertical-align: bottom;
  text-align: right;
  font-weight: bold;
  font-size: 0.7em;
}
.phrasesteps{
  text-align: center;
  height:30px;
  border: 1px solid black;
  margin: 2px;
  line-height: 30px;
  float: left;
  cursor: pointer;
  padding: 0 5px 0 5px;
}
.phraseview{
  border: 1px solid black;
  fill:white;
  stroke-width:3;
  stroke:black
}
.currentTonic{
  background-color: yellow;
}
.phrasetitle{
    text-align: left;
    font-weight: bold;
    font-size: 1.2em;
}
.step-label-svg {
  font-size: 11px;
  text-anchor: start;
  dominant-baseline: hanging;
}
</style>
