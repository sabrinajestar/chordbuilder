<template>
  <div id="app">
    <v-container>
      <v-row align="center">
        <v-col cols="12">
          <div>
            <p>Current Key & Scale: {{ currentKey && currentScale ? (currentKey.displayName || currentKey.name) + ' ' + currentScale.name : 'No key or scale selected' }}</p>
            <p>Cycle of Fifths: <span v-for="note in cycleOfFifths" :key="`fifths-${note.name}`"><a href="#" v-on:click="handleKeySelection(note)">{{ note.displayName || note.name }}</a> &nbsp;</span></p>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Functional Chord</th>
                <th>Chord</th>
                <th>Secondary Dominant Cadence</th>
                <th>Deceptive Resolution</th>
                <th>Substitute Dominant Cadence</th>
                <th>Tritone Substitutes</th>
                <th>Chromatic Mediants</th>
              </tr>
              <tr v-for="chord in keyChords" :key="chord.notation" :style="{ backgroundColor: this.fillBasedOnChordFunction(chord) }">
                <td>{{ chord.romanNumeral(this.majorScale) }}</td>
                <td><a href="#" v-on:click="handleChordSelection(chord)">{{ chord.notation }}</a></td>
                <td><p v-if="chord.relatedChords"><a href="#" v-on:click="handleChordSelection(chord.relatedChords.relatedIIChord)">{{ chord.relatedChords.relatedIIChord.notation }}</a> -> <a href="#" v-on:click="handleChordSelection(chord.relatedChords.secondaryDominantChord)">{{chord.relatedChords.secondaryDominantChord.notation + " (V/" + this.getRomanNumeral(chord.relatedChords.targetChordIndex) + ")"}}</a></p></td>
                <td><p v-if="chord.relatedChords"><a href="#" v-on:click="handleChordSelection(chord.relatedChords.deceptiveResolutionChord)">{{ chord.relatedChords.deceptiveResolutionChord.notation + " (VI/" + this.getRomanNumeral(chord.relatedChords.targetChordIndex) + ")" }}</a></p></td>
                <td><p v-if="chord.relatedChords"><a href="#" v-on:click="handleChordSelection(chord.relatedChords.subVRelatedIIChord)">{{ chord.relatedChords.subVRelatedIIChord.notation }}</a> -> <a href="#" v-on:click="handleChordSelection(chord.relatedChords.substituteDominantChord)">{{ chord.relatedChords.substituteDominantChord.notation + " (subV/" + this.getRomanNumeral(chord.relatedChords.targetChordIndex) + ")" }}</a></p></td>
                <td><p v-if="chord.relatedChords && chord.relatedChords.tritoneSubstituteChord"><a href="#" v-on:click="handleChordSelection(chord.relatedChords.tritoneSubstituteChord)">{{ chord.relatedChords.tritoneSubstituteChord.notation }}</a></p></td>
                <td><p v-if="chord.relatedChords && chord.relatedChords.chromaticMediantChord"><a href="#" v-on:click="handleChordSelection(chord.relatedChords.chromaticMediantChord)">{{ chord.relatedChords.chromaticMediantChord.notation }}</a></p></td>
              </tr>
            </tbody>
          </table>
          <div>
            <p>Other Chromatics: <span v-for="chord in otherChromaticChords" :key="chord.notation"><a href="#" v-on:click="handleChordSelection(chord)">{{ chord.notation + " (" + chord.romanNumeral(this.keyNotes) + ")" }}</a> &nbsp;</span></p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="7">
          <v-row>
            <Keyboard :scaleNotes="keyNotes" :chordNotes="chordNotes"></Keyboard>
          </v-row>
          <v-row>
            <PhraseView
              :phrase="currentPhrase"
              :current-meter="currentMeter"
              @select-step="handleStepSelection" 
              @shift-left="handleShiftLeft"
              @shift-right="handleShiftRight"
              @delete-step="handleDeleteStep"
              @delete-all-steps="handleDeleteAllSteps"
              @play-phrase="playPhrase(currentPhrase.steps)"
            ></PhraseView>
          </v-row>
        </v-col>
        <v-col cols="5">
          <v-row>
            <v-col cols="12">
              <TonePlayer
                :chordNotes="chordNotes"
                :song-bpm="currentSong.bpm"
                :is-playing-song="isPlayingSong"
                :is-playback-paused="isPlaybackPaused"
                :beat-pulse="playbackBeatPulse"
                @play-song="playSong"
                @pause-song="pauseSong"
                @stop-song="stopSong"
                @delete-song="deleteSong"
                @export-song-to-midi="exportSongToMIDI"
                @save-song="saveSong"
                @import-song-from-file="importSongFromFile"
                @update-song-bpm="handleUpdateSongBPM"
              ></TonePlayer>
            </v-col>
          </v-row>
          <v-row>
            <SongBuilder
              :songIn="currentSong"
              :key-in="currentKey"
              @play-song="playSong"
              @select-key="handleKeySelection"
              @select-scale="handleScaleSelection"
              @update-song-title="handleUpdateSongTitle"
              @update-phrase-label="handleUpdatePhraseLabel"
              @update-phrase-repetitions="handleUpdatePhraseRepetitions"
              @select-phrase="handleSelectPhrase"
              @move-phrase-up="handleMovePhraseUp"
              @move-phrase-down="handleMovePhraseDown"
              @delete-phrase="handleDeletePhrase"
              @add-phrase-after="handleAddPhraseAfter"
              @duplicate-phrase-after="handleDuplicatePhraseAfter"
            ></SongBuilder>
          </v-row>
          <v-row>
            <v-col cols="3" class="d-flex align-items-center">
              <KeyPicker @select-key="handleKeySelection" :key-in="currentKey"></KeyPicker>
            </v-col>
            <v-col cols="5" class="d-flex align-items-center">
                <ScalePicker @select-scale="handleScaleSelection"></ScalePicker>
            </v-col>
            <v-col cols="4" class="d-flex align-items-center">
                <MeterPicker @select-meter="handleMeterSelection"></MeterPicker>
            </v-col>
          </v-row>
          <v-row>
            <ChordBuilder @select-chord="handleChordSelection"
              :chordIn="currentChord"
              :step="currentStep"
              :current-meter="currentMeter"
              :scaleNotes="keyNotes" 
              @add-step-to-phrase="handleAddStepToPhrase"
              @modify-phrase="handleModifyPhrase"
             ></ChordBuilder>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Keyboard from './components/Keyboard.vue'
import ChordBuilder from './components/ChordBuilder.vue';
import PhraseView from './components/PhraseView.vue';
import TonePlayer from './components/TonePlayer.vue';
import KeyPicker from './components/KeyPicker.vue';
import ScalePicker from './components/ScalePicker.vue';
import { buildScale, buildScaleSevenths, Phrase, Step, cloneChord, Note, Scale, Song, Meter,
  romanNumerals as theoryRomanNumerals,
  analyzeChordFunctionByRoman as theoryAnalyzeChordFunctionByRoman,
  populateOtherChromaticChords as theoryPopulateOtherChromaticChords,
  fillBasedOnChordFunction as theoryFillBasedOnChordFunction } from './models/theory';
import SongBuilder from './components/SongBuilder.vue';
import MeterPicker from './components/MeterPicker.vue';

export default {
  name: 'App',
  components: {
    Keyboard,
    ChordBuilder,
    PhraseView,
    TonePlayer,
    SongBuilder,
    KeyPicker,
    ScalePicker,
    MeterPicker
  },
  data() {
    return {
      currentKey: null,
      currentScale: null,
      currentMeter: null,
      majorScale: null,
      keyNotes: null,
      keyChords: null,
      chordNotes: null,
      currentChord: null,
      currentStep: null,
      currentStepIndex: null,
      currentSong: new Song(),
      nextPhraseId: 1,
      relatedChords: null,
      currentPhrase: null,
      otherChromaticChords: [],
      isPlayingSong: false,
      isPlaybackPaused: false,
      playbackSessionId: 0,
      playbackBeatPulse: 0,
      cycleOfFifths: [Note.C, Note.G, Note.D, Note.A, Note.E, Note.B, Note.FSHARP, Note.CSHARP, Note.GSHARP, Note.DSHARP, Note.ASHARP, Note.F],
    };
  },
  created() {
    this.ensureCurrentSongHasPhrase();
    this.ensurePhraseIds();
    this.currentPhrase = this.currentSong.phrases[0] || null;
  },
  methods: {
    deleteSong() {
      if(confirm("Are you sure you want to delete the current song? This action cannot be undone.")) {
        this.currentSong = new Song();
        this.nextPhraseId = 1;
        this.ensureCurrentSongHasPhrase();
        this.ensurePhraseIds();
        this.currentPhrase = this.currentSong.phrases[0] || null;
        this.currentStep = null;
        this.currentStepIndex = null;
        this.chordNotes = null;
        this.currentChord = null;
      }
    },
    ensureCurrentSongHasPhrase() {
      if (!this.currentSong.phrases || this.currentSong.phrases.length === 0) {
        const initialPhrase = new Phrase();
        initialPhrase.label = 'Phrase 1';
        this.currentSong.phrases = [initialPhrase];
      }
    },
    ensurePhraseIds() {
      this.currentSong.phrases.forEach(phrase => {
        if (!phrase._songBuilderId) {
          phrase._songBuilderId = this.nextPhraseId;
          this.nextPhraseId += 1;
        }
      });
    },
    assignPhraseId(phrase) {
      phrase._songBuilderId = this.nextPhraseId;
      this.nextPhraseId += 1;
    },
    handleUpdateSongTitle(title) {
      this.currentSong.title = title;
    },
    handleUpdatePhraseLabel({ index, label }) {
      const phrase = this.currentSong.phrases[index];
      if (phrase) {
        phrase.label = label;
      }
    },
    handleUpdatePhraseRepetitions({ index, repetitions }) {
      const phrase = this.currentSong.phrases[index];
      if (phrase) {
        phrase.repetitions = Number.isFinite(repetitions) ? repetitions : 1;
      }
    },
    handleSelectPhrase(index) {
      this.currentPhrase = this.currentSong.phrases[index] || null;
      this.currentStep = null;
      this.currentStepIndex = null;
    },
    handleMovePhraseUp(index) {
      if (index > 0) {
        [this.currentSong.phrases[index - 1], this.currentSong.phrases[index]] = [
          this.currentSong.phrases[index],
          this.currentSong.phrases[index - 1]
        ];
      }
    },
    handleMovePhraseDown(index) {
      if (index < this.currentSong.phrases.length - 1) {
        [this.currentSong.phrases[index], this.currentSong.phrases[index + 1]] = [
          this.currentSong.phrases[index + 1],
          this.currentSong.phrases[index]
        ];
      }
    },
    handleDeletePhrase(index) {
      if (this.currentSong.phrases.length <= 1) {
        this.currentSong.phrases.splice(0, 1);
        const replacement = new Phrase();
        replacement.label = 'Phrase 1';
        this.assignPhraseId(replacement);
        this.currentSong.phrases.push(replacement);
        this.currentPhrase = replacement;
        this.currentStep = null;
        this.currentStepIndex = null;
        return;
      }

      const deletedPhrase = this.currentSong.phrases[index];
      this.currentSong.phrases.splice(index, 1);
      if (this.currentPhrase === deletedPhrase) {
        const fallbackIndex = Math.min(index, this.currentSong.phrases.length - 1);
        this.currentPhrase = this.currentSong.phrases[fallbackIndex] || null;
        this.currentStep = null;
        this.currentStepIndex = null;
      }
    },
    handleAddPhraseAfter(index) {
      const newPhrase = new Phrase();
      this.assignPhraseId(newPhrase);
      newPhrase.label = `New Phrase ${this.currentSong.phrases.length + 1}`;
      this.currentSong.phrases.splice(index + 1, 0, newPhrase);
    },
    handleDuplicatePhraseAfter(index) {
      const originalPhrase = this.currentSong.phrases[index];
      if (originalPhrase) {
        const duplicatedPhrase = new Phrase();
        duplicatedPhrase.label = `${originalPhrase.label} Copy`;
        duplicatedPhrase.steps = originalPhrase.steps.map(step => new Step(step.beats, cloneChord(step.chord), step.index, step.keyRoot, step.keyScale, step.majorScale, step.meter || this.currentMeter || undefined));
        this.assignPhraseId(duplicatedPhrase);
        this.currentSong.phrases.splice(index + 1, 0, duplicatedPhrase);
      }
    },
    handleChordSelection(chord) {
      console.log('Selected chord in App:', JSON.parse(JSON.stringify(chord)));
      this.chordNotes = chord ? [...chord.notes] : null;
      this.currentChord = chord;
      // console.log('Updated chord notes in App:', JSON.parse(JSON.stringify(this.chordNotes)));
      console.log('Current values in App after selecting chord:', {
        currentKey: JSON.parse(JSON.stringify(this.currentKey)),
        currentScale: JSON.parse(JSON.stringify(this.currentScale)),
        currentChord: JSON.parse(JSON.stringify(this.currentChord)),
        currentPhrase: JSON.parse(JSON.stringify(this.currentPhrase))
      });
    },
    handleStepSelection(step) {
      console.log('Selected step in App:', JSON.parse(JSON.stringify(step)));
      this.currentStep = step ? new Step(step.beats, cloneChord(step.chord), step.index, step.keyRoot, step.keyScale, step.majorScale, step.meter) : null;
      this.currentStepIndex = step ? step.index : null;
      this.chordNotes = step?.chord ? [...step.chord.notes] : null;
      this.currentChord = step?.chord || null;
      if (step?.keyRoot) {
        this.currentKey = step.keyRoot;
      }
      if (step?.keyScale) {
        this.currentScale = step.keyScale;
      }
      // console.log('Updated current step in App:', JSON.parse(JSON.stringify(this.currentStep)));
    },
    handleKeySelection(note) {
      // console.log('Selected key in App:', JSON.parse(JSON.stringify(note)));
      // console.log('this in handleKeySelection:', this);
      // console.log('buildScaleAndTriads on this is:', typeof this.buildScaleAndTriads);
      this.currentKey = note;
      this.majorScale = buildScale(this.currentKey, Scale.Major);
      this.buildScaleAndTriads();
      this.chordNotes = null; // Reset chord notes on key change
      this.otherChromaticChords = theoryPopulateOtherChromaticChords(this.currentKey, this.currentScale);
    },
    handleScaleSelection(scale) {
      // console.log('Selected scale in App:', JSON.parse(JSON.stringify(scale)));
      // console.log('this in handleScaleSelection:', this);
      // console.log('buildScaleAndTriads on this is:', typeof this.buildScaleAndTriads);
      this.currentScale = scale;
      this.buildScaleAndTriads();
      this.chordNotes = null; // Reset chord notes on scale change
    },
    handleMeterSelection(meter) {
      console.log('Selected meter in App:', JSON.parse(JSON.stringify(meter)));
      this.currentMeter = meter;
      if (this.currentStep) {
        this.currentStep.meter = meter;
      }
      if (this.currentPhrase && this.currentStepIndex !== null && this.currentPhrase.steps[this.currentStepIndex]) {
        this.currentPhrase.steps[this.currentStepIndex].meter = meter;
      }
    },
    handleUpdateSongBPM(bpm) {
      if (this.currentSong) {
        const parsedBPM = parseInt(bpm, 10);
        if (Number.isFinite(parsedBPM) && parsedBPM > 0) {
          this.currentSong.bpm = parsedBPM;
        }
      }
    },
    buildScaleAndTriads() {
      // console.log('Building scale and triads with key:', this.currentKey, 'and scale:', this.currentScale);
      if (this.currentKey && this.currentScale) {
        this.keyNotes = buildScale(this.currentKey, this.currentScale);
        // this.keyChords = buildScaleTriads(this.currentKey, this.currentScale);
        this.keyChords = buildScaleSevenths(this.currentKey, this.currentScale, this.keyNotes);
        console.log('Built scale notes:', JSON.parse(JSON.stringify(this.keyNotes)));
        // console.log('Built scale and triads:', JSON.parse(JSON.stringify(this.keyChords)));
        console.log('Determined related chords:', JSON.parse(JSON.stringify(this.relatedChords)));
      }
    },
    handleAddStepToPhrase(step) {
      console.log('Adding step to phrase in App:', JSON.parse(JSON.stringify(step)));
      const stepKeyRoot = step?.keyRoot || this.currentKey;
      const stepKeyScale = step?.keyScale || this.currentScale;
      const newStep = new Step(step.beats, cloneChord(step.chord), this.currentPhrase.steps.length, stepKeyRoot, stepKeyScale, this.majorScale, step?.meter || this.currentMeter || undefined);
      this.currentPhrase.steps.push(newStep);
      console.log('Updated phrase in App:', JSON.parse(JSON.stringify(this.currentPhrase)));
      console.log('Current values in App after adding step:', {
        currentKey: JSON.parse(JSON.stringify(this.currentKey)),
        currentScale: JSON.parse(JSON.stringify(this.currentScale)),
        currentChord: JSON.parse(JSON.stringify(this.currentChord)),
        currentPhrase: JSON.parse(JSON.stringify(this.currentPhrase))
      });
    },
    handleModifyPhrase(step) {
      console.log("current step index in App before modification:", JSON.parse(JSON.stringify(this.currentStepIndex)));
      console.log('Modifying step in phrase in App:', JSON.parse(JSON.stringify(step)));
      const stepIndex = this.currentStepIndex;
      const existingStep = this.currentPhrase.steps[stepIndex];
      const stepKeyRoot = step?.keyRoot || existingStep?.keyRoot || this.currentKey;
      const stepKeyScale = step?.keyScale || existingStep?.keyScale || this.currentScale;
      const updatedStep = new Step(step.beats, cloneChord(step.chord), stepIndex, stepKeyRoot, stepKeyScale, this.majorScale, step?.meter || existingStep?.meter || this.currentMeter || undefined);
      this.currentPhrase.steps[stepIndex] = updatedStep;
      this.currentStep = new Step(updatedStep.beats, cloneChord(updatedStep.chord), updatedStep.index, updatedStep.keyRoot, updatedStep.keyScale, updatedStep.majorScale, updatedStep.meter);
      console.log('Updated phrase in App:', JSON.parse(JSON.stringify(this.currentPhrase)));
    },
    handleShiftLeft() {
      console.log('Shifting phrase step left in App');
      if (this.currentPhrase.steps.length > 1 && this.currentStepIndex > 0) {
        const thisStep = this.currentPhrase.steps[this.currentStepIndex];
        thisStep.index = this.currentStepIndex-1;
        const previousStep = this.currentPhrase.steps[this.currentStepIndex - 1];
        previousStep.index = this.currentStepIndex;
        this.currentPhrase.steps[this.currentStepIndex - 1] = thisStep;
        this.currentPhrase.steps[this.currentStepIndex] = previousStep;
        this.currentStepIndex -= 1;
        console.log('Updated phrase after shift left:', JSON.parse(JSON.stringify(this.currentPhrase)));
      }
    },
    handleShiftRight() {
      console.log('Shifting phrase step right in App');
      if (this.currentPhrase.steps.length > 1 && this.currentStepIndex < this.currentPhrase.steps.length - 1) {
        const thisStep = this.currentPhrase.steps[this.currentStepIndex];
        thisStep.index = this.currentStepIndex+1;
        const nextStep = this.currentPhrase.steps[this.currentStepIndex + 1];
        nextStep.index = this.currentStepIndex;
        this.currentPhrase.steps[this.currentStepIndex + 1] = thisStep;
        this.currentPhrase.steps[this.currentStepIndex] = nextStep;
        this.currentStepIndex += 1;
        console.log('Updated phrase after shift right:', JSON.parse(JSON.stringify(this.currentPhrase)));
      }
    },
    handleDeleteStep() {
      console.log('Deleting phrase step in App');
      if (this.currentPhrase.steps.length > 0) {
        this.currentPhrase.steps.splice(this.currentStepIndex, 1);
        // Update indices of remaining steps
        for (let i = 0; i < this.currentPhrase.steps.length; i++) {
          this.currentPhrase.steps[i].index = i;
        }
        // Update current step index and selection
        if (this.currentStepIndex >= this.currentPhrase.steps.length) {
          this.currentStepIndex = this.currentPhrase.steps.length - 1;
        }
        this.currentStep = this.currentPhrase.steps[this.currentStepIndex] || null;
        console.log('Updated phrase after deletion:', JSON.parse(JSON.stringify(this.currentPhrase)));
      }
    },
    handleDeleteAllSteps() {
      if (confirm("Are you sure you want to delete all chords in this phrase? This action cannot be undone.")) {
        console.log('Deleting all phrase steps in App');
        this.currentPhrase.steps = [];
        this.currentStepIndex = null;
        this.currentStep = null;
        console.log('Updated phrase after deleting all steps:', JSON.parse(JSON.stringify(this.currentPhrase)));
      }
    },
    analyzeChordFunctionByRoman(chord, keyNotes) {
      return theoryAnalyzeChordFunctionByRoman(chord, keyNotes);
    },
    fillBasedOnChordFunction(chord) {
      return theoryFillBasedOnChordFunction(chord, this.currentKey, this.currentScale);
    },
    getRomanNumeral(num) {
      return theoryRomanNumerals[num];
    },
    pauseSong() {
      if (!this.isPlayingSong) {
        return;
      }
      this.isPlaybackPaused = !this.isPlaybackPaused;
    },
    stopSong() {
      this.playbackSessionId += 1;
      this.isPlaybackPaused = false;
      this.isPlayingSong = false;
      this.playbackBeatPulse = 0;
      this.chordNotes = null;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async waitIfPausedOrStopped(sessionId) {
      while (this.isPlaybackPaused) {
        if (sessionId !== this.playbackSessionId) {
          return false;
        }
        await this.sleep(75);
      }
      return sessionId === this.playbackSessionId;
    },
    async waitBeatDuration(sessionId, durationMs) {
      let elapsed = 0;
      const tickMs = 50;
      while (elapsed < durationMs) {
        const canContinue = await this.waitIfPausedOrStopped(sessionId);
        if (!canContinue) {
          return false;
        }
        const chunk = Math.min(tickMs, durationMs - elapsed);
        await this.sleep(chunk);
        elapsed += chunk;
      }
      return true;
    },
    getPlaybackBpm() {
      const parsedBpm = Number(this.currentSong?.bpm);
      if (Number.isFinite(parsedBpm) && parsedBpm > 0) {
        return parsedBpm;
      }
      return 120;
    },
    getBeatDurationMs() {
      return 60000 / this.getPlaybackBpm();
    },
    async exportSongToMIDI() {
      console.log('Begin export song to MIDI process');
      const MidiWriter = require('midi-writer-js');
      const track = new MidiWriter.Track();
      track.setTempo(this.currentSong.bpm || 120);

      for (const phrase of this.currentSong.phrases || []) {
        const repetitions = Number(phrase.repetitions) || 1;
        for (let i = 0; i < repetitions; i++) {
          for (const step of phrase.steps || []) {
            const chordNotes = (step.chord?.notes || [])
              .filter(note => note && note !== Note.NullNote)
              .map(note => note.name + note.octaveIndex);
            if (chordNotes.length === 0) {
              continue;
            }
            const duration = 'T' + (step.beats * 128);
            track.addEvent(new MidiWriter.NoteEvent({ pitch: chordNotes, duration }));
          }
        }
      }

      const writer = new MidiWriter.Writer(track);
      const midiData = writer.buildFile();
      const blob = new Blob([midiData], { type: 'audio/midi' });

      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: (this.currentSong.title || 'song') + '.mid',
          types: [{
            accept: {
              'audio/midi': ['.midi', '.mid']
            },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        console.log('Export song to MIDI process completed');
      } catch (err) {
        console.error(err.name, err.message);
      }
    },
    async playSong() {
      const sessionId = this.playbackSessionId + 1;
      this.playbackSessionId = sessionId;
      this.isPlaybackPaused = false;
      this.isPlayingSong = true;
      console.log('In App, play song');
      this.chordNotes = null;
      for (let phrase of this.currentSong.phrases) {
        if (sessionId !== this.playbackSessionId) {
          break;
        }
        this.currentPhrase = phrase;
        console.log('Playing phrase:', JSON.parse(JSON.stringify(phrase)));
        for (let i = 0; i < phrase.repetitions; i++) {
          const canContinue = await this.playPhrase(phrase.steps, sessionId);
          if (!canContinue) {
            this.isPlayingSong = false;
            return;
          }
          console.log(`Repetition ${i + 1} of ${phrase.repetitions}`);
        }
      }
      if (sessionId === this.playbackSessionId) {
        this.isPlayingSong = false;
      }
    },
    async playPhrase(steps, sessionId = this.playbackSessionId) {
      const startedHere = !this.isPlayingSong;
      if (startedHere) {
        sessionId = this.playbackSessionId + 1;
        this.playbackSessionId = sessionId;
        this.isPlaybackPaused = false;
        this.isPlayingSong = true;
      }

      try {
        for (let step of steps) {
          const canContinue = await this.waitIfPausedOrStopped(sessionId);
          if (!canContinue) {
            return false;
          }
          // Update key/scale once per step and rebuild the table before playing beats
          if (step.keyRoot && step.keyScale) {
            this.currentKey = step.keyRoot;
            this.currentScale = step.keyScale;
            this.buildScaleAndTriads();
            await this.$nextTick(); // let Vue flush the table re-render before the first beat
          }
          console.log(`Playing chord: ${step.chord.romanNumeral(this.keyNotes)} for ${step.beats} beats`);
          for (let i = 1; i <= step.beats; i++) {
            this.playbackBeatPulse += 1;
            this.chordNotes = step.chord.notes;
            const keepGoing = await this.waitBeatDuration(sessionId, this.getBeatDurationMs());
            if (!keepGoing) {
              return false;
            }
          }
        }
        return true;
      } finally {
        if (startedHere && sessionId === this.playbackSessionId) {
          this.isPlayingSong = false;
        }
      }
    },
    async saveSong() {
      console.log('Save song');
      const data = JSON.stringify(this.currentSong)
      const blob = new Blob([data], {type: 'application/json'})
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: (this.currentSong.title || 'song') + '.json',
          types: [{
            accept: {
              'application/json': ['.json']
            },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (err) {
        console.error(err.name, err.message);
      }
    },
    rehydrateSong(rawSong) {
      const song = new Song();
      song.title = rawSong?.title || '';
      song.phrases = (rawSong?.phrases || []).map(rawPhrase => this.rehydratePhrase(rawPhrase));
      song.bpm = Number(rawSong?.bpm) || 120;
      return song;
    },
    rehydratePhrase(rawPhrase) {
      const phrase = new Phrase();
      phrase.label = rawPhrase?.label || '';
      phrase.repetitions = Number(rawPhrase?.repetitions) || 1;
      phrase.steps = (rawPhrase?.steps || []).map(rawStep => this.rehydrateStep(rawStep));
      if (rawPhrase && rawPhrase._songBuilderId) {
        phrase._songBuilderId = rawPhrase._songBuilderId;
      }
      return phrase;
    },
    rehydrateStep(rawStep) {
      const rawMeter = rawStep?.meter;
      const meter = rawMeter ? new Meter(Number(rawMeter.beatsPerMeasure) || 4, Number(rawMeter.beatUnit) || 4) : undefined;
      const step = new Step(
        Number(rawStep?.beats) || 1,
        cloneChord(rawStep?.chord),
        rawStep?.index,
        rawStep?.keyRoot || undefined,
        rawStep?.keyScale || undefined,
        rawStep?.majorScale || undefined,
        meter
      );
      return step;
    },
    async importSongFromFile() {
      console.log('Import song from file');
      const pickerOpts = {
        types: [
          {
            description: "JSON",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
      };
      const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
      const file = await fileHandle.getFile();
      const contents = await file.text();
      try {
        const parsedSong = JSON.parse(contents);
        this.currentSong = this.rehydrateSong(parsedSong);
        this.ensureCurrentSongHasPhrase();
        this.ensurePhraseIds();
        this.currentPhrase = this.currentSong.phrases[0] || null;
        this.currentStep = null;
        this.currentStepIndex = null;
        this.currentChord = null;
        this.chordNotes = null;
      } catch (err) {
        console.error(err.name, err.message);
      }

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: lightblue;
}
.app-select {
  -webkit-appearance: listbox;
  border: 1px solid black;
  border-radius: 4px;
}
.iconButton {
  margin-top: 10px;
  margin-right: 6px;
  padding: 4px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: white;
  color: #111;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.compact-number {
  width: 5ch;
}
</style>
