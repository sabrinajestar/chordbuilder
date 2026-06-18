<template>
  <div id="keypicker">
    Select a Key:
    <select class="app-select" id="key-select" v-model="currentTonicName" @change="handleKeyChange">
      <option v-for="note in notes" :key="note.index" :value="note.name">
        {{ note.displayName || note.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { Note } from '../models/theory.ts';

export default {
  name: 'KeyPicker',
  props: {
    msg: String,
    keyIn: Note
  },
  data() {
    return { 
      notes: Note.Notes,
      currentTonic: null,
      currentTonicName: ''
    };
  },
  watch: {
    keyIn(newKey) {
      console.log('KeyPicker received new keyIn prop:', newKey);
      if (!newKey) {
        return;
      }
      this.selectKey(newKey);
    }
  },
  methods: {
    handleKeyChange() {
      const selectedNote = this.notes.find(note => note.name === this.currentTonicName);
      if (!selectedNote) {
        return;
      }
      this.selectKey(selectedNote);
    },
    selectKey(note) {
      if (!note) {
        return;
      }
      // console.log('In KeyPicker, selectKey called with note:', note.name);
      this.$emit('select-key', note);
      this.currentTonic = note;
      this.currentTonicName = note.name;
      console.log('KeyPicker name of selected key:', this.currentTonicName);
      // eslint-disable-next-line no-console
      // console.log('Selected key:', JSON.parse(JSON.stringify(this.currentTonic)));
    }
  },
  mounted() {
    this.selectKey(this.keyIn || Note.C);
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
