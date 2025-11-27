<template>
  <div id="chordbuilder">
    
    <div>
      <v-container>
        <v-row>
          <p>Build a Chord</p><div class="resetButton" @click="resetSelections">Reset Chord</div>
        </v-row>
        <v-row>
          <div>Select Chord Root</div>
        </v-row>
        <v-row>
          <div class="rootSelect" @click="selectChordRoot(note)"
          :class="{ 'currentRoot': currentRoot && note.name === currentRoot.name }"
          v-for="note in notes" :key="note.name">{{ note.name }}
          </div>
        </v-row>
        <v-row>
          <div>Select Chord Shape</div>
        </v-row>
        <v-row>
          <div class="baseChordSelect" @click="selectBaseChord(chord)"
          :class="{ 'currentBaseChord': currentBaseChord && chord.name === currentBaseChord.name }"
          v-for="chord in chords" :key="chord.name">{{ chord.name }}
          </div>
        </v-row>
        <v-row>
          <div>Select Chord Modifications</div>
        </v-row>
        <v-row>
          <div class="chordModsSelect" @click="selectChordMods(chordmods)"
          :class="{ 'currentChordMods': currentChordMods && currentChordMods.includes(chordmods) }"
          v-for="chordmods in chordMods" :key="chordmods.name">{{ chordmods.name }}
          </div>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { Note, Chord, ChordModification, popuplateChordNotes, applyChordModification } from '../models/theory.ts';

export default {
  name: 'ChordBuilder',
  props: {
    scaleNotes: Array
  },
  data() {
    return {
      currentRoot: null,
      currentBaseChord: null,
      currentChord: null,
      currentChordMods: [],
      chordNotes: null
    };
  },
  computed: {
    notes() {
      return Note.Notes;
    },
    chords() {
      return Chord.Chords;
    },
    chordMods() {
      return ChordModification.ChordMods;
    }
  },
  methods: {
    setChordNotes() {
      if (this.currentRoot && this.currentChord) {
        this.currentChord.notes = popuplateChordNotes(this.currentRoot, this.currentChord);
        this.chordNotes = this.currentChord.notes
        console.log('chord after buildChord:', JSON.parse(JSON.stringify(this.currentChord)));
        console.log('Updated chord notes:', JSON.parse(JSON.stringify(this.chordNotes)));
        this.$emit('select-chord', this.chordNotes);
      }
    },
    selectChordRoot(note) {
      this.currentRoot = note;
      // eslint-disable-next-line no-console
      console.log('Selected chord root:', JSON.parse(JSON.stringify(note)));
      this.setChordNotes();
    },
    selectBaseChord(chord) {
      this.currentBaseChord = chord;
      this.currentChord = new Chord(chord.classification, chord.intervals, chord.notes);
      // eslint-disable-next-line no-console
      console.log('Selected base chord:', JSON.parse(JSON.stringify(chord)));
      this.setChordNotes();
    },
    selectChordMods(chordmod) {
      this.currentChordMods.push(chordmod);
      // eslint-disable-next-line no-console
      console.log('Selected chord modification:', JSON.parse(JSON.stringify(chordmod)));
      console.log('Current chord modifications:', JSON.parse(JSON.stringify(this.currentChordMods)));
      applyChordModification(this.currentChord, chordmod);
      console.log('Chord after modification:', JSON.parse(JSON.stringify(this.currentChord)));
      this.$emit('select-chord', this.currentChord.notes);
    },
    resetSelections() {
      this.currentRoot = null;
      this.currentBaseChord = null;
      this.currentChordMods = [];
      this.chordNotes = null;
      this.$emit('select-chord', null);
      console.log('Selections have been reset.');
    }
  }
  // },
  // mounted() {
  //   this.selectChord(Chord.Major);
  //   // eslint-disable-next-line no-console
  //   console.log('Initial current Chord at mount:', this.currentChord);
  // }
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
#chordbuilder{
  text-align: left;
}
.rootSelect, .baseChordSelect, .chordModsSelect, .resetButton{
  text-align: center;
  height:40px;
  border: 1px solid black;
  margin: 2px;
  line-height: 40px;
  float: left;
  cursor: pointer;
  padding: 0 10px 0 10px;
}
.currentRoot, .currentChordMods, .currentBaseChord{
  background-color: yellow;
}
</style>
