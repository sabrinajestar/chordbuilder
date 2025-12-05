<template>
  <div id="chordbuilder">
    
    <div>
      <v-container>
        <v-row>
          <div>{{ currentChord ? currentChord.notation : 'Choose Chord Root and Shape' }}</div>
        </v-row>
        <v-row>
          <div class="button" @click="resetSelections">Reset Chord</div>
          <div class="button" @click="addToProgression">Add to Chord Progression</div>
        </v-row>
        <v-row>
          <div>Select Chord Root</div>
        </v-row>
        <v-row>
          <div class="rootSelect" @click="selectChordRoot(note)"
          :class="{ 'currentRoot': currentRoot && note.name === currentRoot.name }"
          v-for="note in notes" :key="note.name">{{ note.displayName || note.name }}
          </div>
        </v-row>
        <v-row>
          <div>Select Chord Shape</div>
        </v-row>
        <v-row>
          <div class="shapeSelect" @click="selectShape(shape)"
          :class="{ 'currentShape': currentShape && shape.name === currentShape.name }"
          v-for="shape in shapes" :key="shape.name">{{ shape.name }}
          </div>
        </v-row>
        <v-row>
          <div>Select Chord Modifications</div> {{ currentChord && currentChord.modifications.length > 0 ? '(Current: ' + currentChord.modifications.map(mod => mod.notation).join(', ') + ')' : '' }}
        </v-row>
        <v-row>
          <div @click="toggleChordMod(chordmod)" :class="setChordModClass(chordmod)"
          v-for="chordmod in chordMods" :key="chordmod.name">{{ chordmod.notation }}
          </div>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { Note, Chord, ChordShape, ChordModification, popuplateChordNotes, cloneChord, toggleChordModification, applyChordModifications, Step } from '../models/theory.ts';

export default {
  name: 'ChordBuilder',
  props: {
    scaleNotes: Array
  },
  data() {
    return {
      currentRoot: null,
      currentShape: null,
      currentChord: null,
      chordNotes: null
    };
  },
  computed: {
    notes() {
      return Note.Notes;
    },
    shapes() {
      return ChordShape.ChordShapes;
    },
    chordMods() {
      return ChordModification.ChordMods;
    },
  },
  methods: {
    setChordModClass(mod) {
      var modClass = 'chordModsSelect';
      if (!this.currentShape || !this.currentRoot) {
        modClass += ' chordModsDisabled';
      } else if (mod.notation === 'I/VII' && this.currentShape.name.toLowerCase().includes('seventh') === false) {
        // don't allow third inversion if not a seventh chord
        modClass += ' chordModsDisabled';
      }
      if (this.currentChord !== null && this.currentChord.modifications && this.currentChord.modifications.some(m => m.name === mod.name)) {
        modClass += ' currentChords';
      }
      return modClass;
    },
    setChordNotes() {
      if (this.currentRoot && this.currentChord) {
        this.currentChord.notes = popuplateChordNotes(this.currentRoot, this.currentChord);
        this.$emit('select-chord', this.currentChord);
      }
    },
    selectChordRoot(note) {
      this.currentRoot = note;
      // eslint-disable-next-line no-console
      // console.log('Selected chord root:', JSON.parse(JSON.stringify(note)));
      this.setChordNotes();
    },
    selectShape(shape) {
      this.currentShape = shape;
      this.currentChord = new Chord(this.currentRoot, shape);
      // eslint-disable-next-line no-console
      // console.log('Selected base chord:', JSON.parse(JSON.stringify(shape)));
      this.setChordNotes();
    },
    toggleChordMod(chordmod) {
      if (!this.currentShape || !this.currentRoot) {
        return;
      }
      this.currentChord = toggleChordModification(this.currentChord, chordmod);
      this.setChordNotes();
      console.log('current chord before reapplying chord modifications', JSON.parse(JSON.stringify(this.currentChord)));
      this.currentChord = applyChordModifications(this.currentChord);
      // // eslint-disable-next-line no-console
      // console.log('Selected chord modification:', JSON.parse(JSON.stringify(chordmod)));
      // console.log('Current chord modifications after toggle and filtering:', JSON.parse(JSON.stringify(this.currentChord.modifications)));
      // console.log('Chord after modification toggle:', JSON.parse(JSON.stringify(this.currentChord)));
      this.$emit('select-chord', this.currentChord);
    },
    removeConflictingMods(newMod) {
      console.log('Removing conflicting modifications for:', JSON.parse(JSON.stringify(newMod)));
      const conflictingMods = [['♭5', '♯5', 'no5'], ['♭9', 'add9'], ['♭11', 'add11'], ['I/III', 'I/V', 'I/VII']];
      conflictingMods.forEach(group => {
        if (group.includes(newMod.notation)) {
          console.log('Conflicting group found:', JSON.parse(JSON.stringify(group)), "for mod:", JSON.stringify(newMod));
          this.currentChord.modifications = this.currentChord.modifications.filter(mod => !group.includes(mod.notation));
        }
      });
      console.log('Current chord modifications after removing conflicts:', JSON.parse(JSON.stringify(this.currentChord.modifications)));
    },
    resetSelections() {
      this.currentRoot = null;
      this.currentShape = null;
      this.currentChord = null;
      this.chordNotes = null;
      this.$emit('select-chord', null);
      // console.log('Selections have been reset.');
    },
    addToProgression() {
      if (this.currentChord) {
        const dupeChord = cloneChord(this.currentChord);
        const step = new Step(4, dupeChord); // Assuming 4 beats for now
        this.resetSelections();
        this.$emit('add-step-to-progression', step);
        // console.log('Added chord to progression:', JSON.parse(JSON.stringify(step)));
      }
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
  color: #42b983;
}
#chordbuilder{
  text-align: left;
}
.rootSelect, .shapeSelect, .chordModsSelect, .button{
  text-align: center;
  height:30px;
  border: 1px solid black;
  margin: 2px;
  line-height: 30px;
  float: left;
  cursor: pointer;
  padding: 0 5px 0 5px;
}
.chordModsDisabled {
  text-align: center;
  height:30px;
  border: 1px solid grey;
  margin: 2px;
  line-height: 30px;
  float: left;
  cursor: not-allowed;
  padding: 0 5px 0 5px;
}
.currentRoot, .currentChords, .currentShape{
  background-color: yellow;
}
</style>
