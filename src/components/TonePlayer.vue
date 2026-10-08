<template>
  <div class="tonePlayer">
    <button
      class="iconButton"
      @click="toggleSound"
      :aria-label="soundEnabled ? 'Mute sound' : 'Enable sound'"
      :title="soundEnabled ? 'Mute sound' : 'Enable sound'">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g v-if="!soundEnabled" transform="scale(1.5)" fill="currentColor" class="bi bi-volume-mute">
          <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06M6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
        </g>
        <g v-else transform="scale(1.5)" fill="currentColor" class="bi bi-volume-up">
          <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
          <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
        </g>
      </svg>
    </button>

    <button class="iconButton" @click="$emit('play-song')" aria-label="Play song" title="Play song">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polygon points="4,3 4,21 20,12" style="fill:green;stroke:black;stroke-width:1" />
      </svg>
    </button>

    <button class="iconButton" @click="$emit('pause-song')" aria-label="Pause song" title="Pause playback">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="5" y="3" width="4" height="18" style="fill:goldenrod;stroke:black;stroke-width:1" />
        <rect x="15" y="3" width="4" height="18" style="fill:goldenrod;stroke:black;stroke-width:1" />
      </svg>
    </button>

    <button class="iconButton" @click="$emit('stop-song')" aria-label="Stop song" title="Stop playback">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" style="fill:red;stroke:black;stroke-width:1" />
      </svg>
    </button>

    <button class="iconButton" @click="$emit('delete-song')" aria-label="Delete song" title="Delete song">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="translate(2,2)">
          <line x1="0" y1="0" x2="20" y2="20" style="stroke:red;stroke-width:5" />
          <line x1="20" y1="0" x2="0" y2="20" style="stroke:red;stroke-width:5" />
        </g>
      </svg>
    </button>

    <button class="iconButton" @click="exportSongToMIDI" aria-label="Export To MIDI" title="Export To MIDI">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="translate(2,2) scale(1.25)">
          <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
        </g>
      </svg>
    </button>

    <button class="iconButton" @click="saveSong" aria-label="Save to File" title="Save to File">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" class="bi bi-floppy">
        <g transform="translate(2,2) scale(1.25)">
          <path d="M11 2H9v3h2z"/>
          <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
        </g>
      </svg>
    </button>

    <button class="iconButton" @click="importSongFromFile" aria-label="Import From Save File" title="Import From Save File">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" class="bi bi-folder2-open" >
        <g transform="translate(2,2) scale(1.25)">
          <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z"/>
        </g>
      </svg>
    </button>
  </div>
</template>

<script>
import * as Tone from "tone";
const sampler = new Tone.Sampler({
    urls: {
      A0: "A0.mp3",
      C1: "C1.mp3",
      "D#1": "Ds1.mp3",
      "F#1": "Fs1.mp3",
      A1: "A1.mp3",
      C2: "C2.mp3",
      "D#2": "Ds2.mp3",
      "F#2": "Fs2.mp3",
      A2: "A2.mp3",
      C3: "C3.mp3",
      "D#3": "Ds3.mp3",
      "F#3": "Fs3.mp3",
      A3: "A3.mp3",
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
      C5: "C5.mp3",
      "D#5": "Ds5.mp3",
      "F#5": "Fs5.mp3",
      A5: "A5.mp3",
      C6: "C6.mp3",
      "D#6": "Ds6.mp3",
      "F#6": "Fs6.mp3",
      A6: "A6.mp3",
      C7: "C7.mp3",
      "D#7": "Ds7.mp3",
      "F#7": "Fs7.mp3",
      A7: "A7.mp3",
      C8: "C8.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();
var sound = false;

export default {
  name: 'TonePlayer',
  props: {
    chordNotes: Array
  },
  data() {
    return {
      soundEnabled: false,
    };
  },
  methods: {
    toggleSound() {
      sound = !sound;
      this.soundEnabled = sound;
    },
    playChord() {
      if(this.soundEnabled && sampler && typeof sampler.triggerAttackRelease === 'function' && this.chordNotes) {
        this.chordNotes.forEach(note => {
          sampler.triggerAttackRelease(note.name + note.octaveIndex, "8n");
        });
      }
    },
    exportSongToMIDI() {
      console.log('Emit export song to MIDI event');
      this.$emit('export-song-to-midi');
    },
    saveSong() {
      console.log('Emit save song event');
      this.$emit('save-song');
    },
    importSongFromFile() {
      console.log('Emit import song from file event');
      this.$emit('import-song-from-file');
    }
  },
  watch: {
    chordNotes: {
      immediate: true,
      handler() {
        this.playChord();
      }
    }
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

.soundToggle {
  margin-top: 10px;
}
</style>
