<template>
  <div id="chordprogression" v-if="progression !== null">
    <p>Current Progression</p>
    <div>
      <div class="progressionsteps"
      v-for="step in progression.steps" :key="step.chord.name">{{ step.chord.name }}</div>
    </div>
  </div>
</template>

<script>
// import { ChordProgression } from '../models/theory.ts';

export default {
  name: 'ChordProgressionView',
  props: {
    progression: Object
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
.currentTonic{
  background-color: yellow;
}
</style>
