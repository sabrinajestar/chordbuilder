<template>
  <div id="scalepicker">
    Select a Scale:
    <select class="app-select" id="scale-select" @change="selectScale(scales[$event.target.selectedIndex])">
      <option v-for="scale in scales" :key="scale.index" :value="scale.index" :selected="scale.index === 0">
        {{ scale.displayName || scale.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { Scale } from '../models/theory.ts';

export default {
  name: 'ScalePicker',
  props: {
    msg: String
  },
  data() {
    return {
      scales: Scale.Scales,
      currentScale: null
    };
  },
  methods: {
    selectScale(scale) {
      // Emit the selected scale to the parent component
      this.$emit('select-scale', scale);
      this.currentScale = scale;
      // eslint-disable-next-line no-console
      // console.log('Selected scale:', JSON.parse(JSON.stringify(scale)));
    }
  },
  mounted() {
    this.selectScale(Scale.Major);
    // eslint-disable-next-line no-console
    // console.log('Initial current Scale at mount:', this.currentScale);
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
#scalepicker{
  text-align: left;
}
.scaleSelected{
  text-align: center;
  height:30px;
  border: 1px solid black;
  margin: 2px;
  line-height: 30px;
  float: left;
  cursor: pointer;
  padding: 0 5px 0 5px;
}
.currentScale{
  background-color: yellow;
}
</style>
