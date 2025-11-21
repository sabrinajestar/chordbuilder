<template>
  <div id="scalepicker">
    <p>Select a Scale</p>
    <div>
      <div class="scaleSelected" @click="selectScale(scale)"
      :class="{ 'currentScale': currentScale && scale.name === currentScale.name }"
       v-for="scale in scales" :key="scale.name">{{ scale.name }}</div>
    </div>
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
      console.log('Selected scale:', JSON.parse(JSON.stringify(scale)));
      

    }
  },
  mounted() {
    this.selectScale(Scale.Major);
    // eslint-disable-next-line no-console
    console.log('Initial current Scale at mount:', this.currentScale);
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
  height:40px;
  border: 1px solid black;
  margin: 2px;
  line-height: 40px;
  float: left;
  cursor: pointer;
  padding: 0 10px 0 10px;
}
.currentScale{
  background-color: yellow;
}
</style>
