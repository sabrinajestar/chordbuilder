<template>
  <div id="keypicker">
    <p>Select a Key</p>
    <div>
      <div class="keytonics"
      :class="{ 'currentTonic': currentTonic && note.index === currentTonic.index }" 
      @click="selectKey(note)"
      v-for="note in notes" :key="note.index">{{ displaySharpsAndFlats(note.name) }}</div>
    </div>
  </div>
</template>

<script>
import { Note, displaySharpsAndFlats } from '../models/theory.ts';

export default {
  name: 'KeyPicker',
  props: {
    msg: String
  },
  data() {
    return { 
      notes: Note.Notes,
      currentTonic: null
    };
  },
  methods: {
    displaySharpsAndFlats,
    selectKey(note) {
      // console.log('In KeyPicker, selectKey called with note:', note.name);
      this.$emit('select-key', note);
      this.currentTonic = note;
      // eslint-disable-next-line no-console
      // console.log('Selected key:', JSON.parse(JSON.stringify(this.currentTonic)));
    }
  },
  mounted() {
    this.selectKey(Note.C);
    // eslint-disable-next-line no-console
    // console.log('Initial current Tonic at mount:', this.currentTonic);
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
.keytonics{
  text-align: center;
  width:30px;
  height:30px;
  border: 1px solid black;
  margin: 2px;
  line-height: 30px;
  float: left;
  cursor: pointer;
}
.currentTonic{
  background-color: yellow;
}
</style>
