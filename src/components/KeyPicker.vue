<template>
  <div id="keypicker">
    <p>Keypicker Goes Here</p>
    <ul>
      <li v-for="note in notes" :key="note.name">{{ note.name }}</li>
    </ul>
  </div>
</template>

<script>
import { Note } from '../models/theory.ts';

export default {
  name: 'KeyPicker',
  props: {
    msg: String
  },
  data() {
    return { notes: Note.Notes };
  },
  mounted() {
    // Debug: check what was imported and what's available on the component
    // Open the browser console when running the app to inspect these logs.
    // This will reveal whether `Notes` is undefined/empty or if the template
    // binding was incorrect.
    // eslint-disable-next-line no-console
    console.log('imported Notes:', Note.Notes);
    // eslint-disable-next-line no-console
    console.log('this.notes (component data):', this.notes, Array.isArray(this.notes) ? this.notes.length : typeof this.notes);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  position: absolute;
  left: 800px;
  top: 40px;
}
</style>
