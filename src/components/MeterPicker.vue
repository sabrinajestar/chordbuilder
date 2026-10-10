<template>
  <div id="meterpicker">
    <input class="compact-number" type="number" :value="currentBeats" @input="onBeatsInput($event)">
    / 
    <input class="compact-number" type="number" :value="currentBeatUnit" @input="onBeatUnitInput($event)">
  </div>
</template>

<script>
import { Meter } from '../models/theory.ts';

export default {
  name: 'MeterPicker',
  props: {
    msg: String
  },
  data() {
    return {
      meter: Meter,
      currentMeter: null,
      currentBeats: 4,
      currentBeatUnit: 4
    };
  },
  methods: {
    onBeatsInput(event) {
      const parsed = parseInt(event.target.value, 10);
      this.currentBeats = Number.isFinite(parsed) && parsed > 0 ? parsed : 4;
      this.updateMeter();
    },
    onBeatUnitInput(event) {
      const parsed = parseInt(event.target.value, 10);
      this.currentBeatUnit = Number.isFinite(parsed) && parsed > 0 ? parsed : 4;
      this.updateMeter();
    },
    selectBeats(beats) {
      this.currentBeats = beats;
      this.updateMeter();
    },
    selectBeatUnit(beatUnit) {
      this.currentBeatUnit = beatUnit;
      this.updateMeter();
    },
    updateMeter() {
      const newMeter = new Meter(this.currentBeats, this.currentBeatUnit);
      this.$emit('select-meter', newMeter);
      this.currentMeter = newMeter;
    },
  },
  mounted() {
    this.selectBeats(4);
    this.selectBeatUnit(4);
    // eslint-disable-next-line no-console
    // console.log('Initial current Meter at mount:', this.currentMeter);
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
  color: #42b983;
}
#meterpicker{
  text-align: left;
}
</style>
