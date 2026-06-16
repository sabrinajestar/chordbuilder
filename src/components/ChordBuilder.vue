<template>
  <div id="chordbuilder">
    
    <div>
      <v-container>
        <v-row>
          <div>{{ currentChord ? currentChord.notation : 'Choose Chord Root, Shape, and number of beats' }}</div>
        </v-row>
        <v-row>
          <div class="button" @click="resetSelections">Reset Chord</div>
          <div class="button" @click="addProgressionStep">Add to Chord Progression</div>
          <div class="button" @click="modifyProgressionStep">Modify Chord in Progression</div>
          Beats:
          <select :key="`beats-${selectRenderKey}`" class="app-select" id="beats-select" v-model.number="currentBeats">
            <option v-for="i in 8" :key="i" :value="i" :selected="currentBeats === i">{{ i }}</option>
          </select>
        </v-row>
        <v-row>
          <v-col cols="4">
            Select Chord Root
            <select :key="`root-${selectRenderKey}`" class="app-select" id="chord-root-select" v-model="selectedRootIndex" @change="handleChordRootChange">
              <option value="">Choose root</option>
              <option v-for="note in notes" :key="note.index" :value="String(note.index)">
                {{ note.displayName || note.name }}
              </option>
            </select>
          </v-col>
          <v-col cols="8">
            Select Chord Shape
            <select :key="`shape-${selectRenderKey}`" class="app-select" id="chord-shape-select" v-model="selectedShapeName" @change="handleShapeChange">
              <option value="">Choose shape</option>
              <option v-for="shape in shapes" :key="shape.name" :value="shape.name">
                {{ shape.name }}
              </option>
            </select>
          </v-col>
        </v-row>
        <v-row>
          <div>Select Chord Modifications</div> {{ currentChord && currentChord.modifications.length > 0 ? '(Current: ' + currentChord.modifications.map(mod => mod.notation).join(', ') + ')' : '' }}
        </v-row>
        <v-row>
          <div @click="toggleChordMod(chordmod)" :class="setChordModClass(chordmod)"
          v-for="chordmod in chordMods" :key="chordmod.name">{{ chordmod.notation }}
          </div>
        </v-row>
        <v-row>
          <div class="button" @click="shiftChordDown">Shift Chord Down</div>
          <div class="button" @click="shiftChordUp">Shift Chord Up</div>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { Note, Chord, ChordShape, ChordModification, populateChordNotes, cloneChord, toggleChordModification, applyChordModifications, Step, shiftChord } from '../models/theory.ts';

export default {
  name: 'ChordBuilder',
  props: {
    scaleNotes: Array,
    step: {
      type: Object,
      default: null
    },
    chordIn: Chord
  },
  data() {
    return {
      currentRoot: null,
      currentShape: null,
      currentChord: null,
      currentStep: null,
      currentBeats: 4,
      chordNotes: null,
      selectedRootIndex: '',
      selectedShapeName: '',
      selectRenderKey: 0
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
  mounted() {
    // Initialize with default selections
    this.selectChordRoot(this.notes[0]); // C
    this.selectShape(this.shapes[4]); // Major Seventh
    this.handleChordRootChange();
    this.handleShapeChange();
  },
  watch: {
    step(newStep) {
      console.log('detected step prop change in ChordBuilder');
      if (newStep != undefined) {
        console.log('detected step change in ChordBuilder watch:', newStep);
        this.currentStep = new Step(newStep.beats, cloneChord(newStep.chord), newStep.index);
        this.currentRoot = this.currentStep.chord?.rootNote || this.currentStep.chord?.notes?.[0] || null;
        this.currentShape = this.currentStep.chord?.shape || null;
        this.currentChord = this.currentStep.chord || null;
        this.selectedRootIndex = this.currentRoot ? String(this.currentRoot.index) : '';
        this.selectedShapeName = this.currentShape ? this.currentShape.name : '';
      } else {
        this.resetSelections();
      }
    },
    chordIn(newChord) {
      this.newChord(newChord);
    }
  },
  methods: {
    newChord(chord) {
      this.currentRoot = chord?.rootNote || chord?.notes?.[0] || null;
      this.currentShape = chord?.shape || null;
      this.currentChord = chord || null;
      this.chordNotes = chord?.notes || null;
    },
    handleChordRootChange() {
      if (this.selectedRootIndex === '') {
        this.currentRoot = null;
        this.currentChord = null;
        this.$emit('select-chord', null);
        return;
      }
      const selectedNote = this.notes.find(note => String(note.index) === this.selectedRootIndex);
      if (selectedNote) {
        this.selectChordRoot(selectedNote);
      }
    },
    handleShapeChange() {
      if (this.selectedShapeName === '') {
        this.currentShape = null;
        this.currentChord = null;
        this.$emit('select-chord', null);
        return;
      }
      const selectedShape = this.shapes.find(shape => shape.name === this.selectedShapeName);
      if (selectedShape) {
        this.selectShape(selectedShape);
      }
    },
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
        this.currentChord.notes = populateChordNotes(this.currentRoot, this.currentChord);
        this.$emit('select-chord', this.currentChord);
      }
    },
    selectChordRoot(note) {
      this.currentRoot = note;
      this.selectedRootIndex = String(note.index);
      // eslint-disable-next-line no-console
      // console.log('Selected chord root:', JSON.parse(JSON.stringify(note)));
      this.setChordNotes();
    },
    selectShape(shape) {
      this.currentShape = shape;
      this.selectedShapeName = shape.name;
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
    resetSelections() {
      this.currentRoot = null;
      this.currentShape = null;
      this.currentChord = null;
      this.currentStep = null;
      this.chordNotes = null;
      this.currentBeats = 4;
      this.selectedRootIndex = '';
      this.selectedShapeName = '';
      this.selectRenderKey += 1;
      this.$emit('select-chord', null);
      // console.log('Selections have been reset.');
    },
    addProgressionStep() {
      if (this.currentChord) {
        const newStep = new Step(this.currentBeats, cloneChord(this.currentChord));
        this.$emit('add-step-to-progression', newStep);
        this.resetSelections();
        // console.log('Added step to progression:', JSON.parse(JSON.stringify(newStep)));
      }
    },
    modifyProgressionStep() {
      if (this.currentChord) {
        const dupeChord = cloneChord(this.currentChord);
        const updatedStep = new Step(this.currentBeats, dupeChord, this.currentStep?.index);
        this.resetSelections();
        this.$emit('modify-progression', updatedStep);
        // console.log('Added or updated chord to progression:', JSON.parse(JSON.stringify(this.currentStep)));
      }
    },
    shiftChordDown() {
      if (this.currentChord) {
        let shiftedChord = shiftChord(this.currentChord, -1);
        console.log('Chord after shifting down:', JSON.parse(JSON.stringify(shiftedChord)));
        this.$emit('select-chord', shiftedChord);
        this.newChord(shiftedChord);
      }
    },
    shiftChordUp() {
      if (this.currentChord) {
        let shiftedChord = shiftChord(this.currentChord, 1);
        console.log('Chord after shifting up:', JSON.parse(JSON.stringify(shiftedChord)));
        this.$emit('select-chord', shiftedChord);
        this.newChord(shiftedChord);
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
.rootSelect, .shapeSelect, .beatsSelect, .chordModsSelect, .button{
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
.currentRoot, .currentChords, .currentShape, .currentBeats{
  background-color: yellow;
}
</style>
