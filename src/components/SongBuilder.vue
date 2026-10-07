<template>
    <div id="songBuilder" v-if="currentSong">
        <p><span class="songtitle">
            Song title: <input :value="currentSong.title" placeholder="working title" @input="updateSongTitle($event.target.value)">
        </span></p>
        <table>
            <thead>
                <tr>
                    <th>phrase</th>
                    <th>Repetitions</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(phrase, index) in currentSong.phrases"
                    :key="phrase._songBuilderId"
                    :id="index === currentPhraseIndex ? 'currentPhrase' : null"
                    @click="selectPhrase(index)">
                    <td><input :value="phrase.label" @input="updatePhraseLabel(index, $event.target.value)"></td>
                    <td><input class="compact-number" type="number" :value="phrase.repetitions" @input="updatePhraseRepetitions(index, $event.target.value)"></td>
                    <td>
                        <button class="iconButton" @click="requestMovePhraseUp(index)" aria-label="Move Up" title="Move This Phrase Up">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up" viewBox="0 0 16 16">
                                <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
                            </svg>
                        </button>
                    </td>
                    <td>
                        <button class="iconButton" @click="requestMovePhraseDown(index)" aria-label="Move Down" title="Move This Phrase Down">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                                <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
                            </svg>
                        </button>
                    </td>
                    <td>
                        <button class="iconButton" @click="requestDeletePhrase(index)" aria-label="Delete" title="Delete This Phrase">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <line x1="2" y1="2" x2="14" y2="14" style="stroke:red;stroke-width:5" />
                                <line x1="14" y1="2" x2="2" y2="14" style="stroke:red;stroke-width:5" />
                            </svg>
                        </button>
                    </td>
                    <td>
                        <button class="iconButton" @click="requestAddNewPhraseAfter(index)" aria-label="Add" title="Add New Phrase After This One">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </button>
                    </td>
                    <td>
                        <button class="iconButton" @click="duplicatePhraseAfter(index)" aria-label="Copy" title="Duplicate This Phrase After This One">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import { Song, Note } from '../models/theory';

export default {
    name: 'SongBuilder',
    props: {
        songIn: Song,
        keyIn: Note
    },
    data() {
        return {
            currentSong: null,
            currentPhraseIndex: 0,
        };
    },
    watch: {
        songIn: {
            immediate: true,
            handler(newSong) {
                if (newSong) {
                    this.currentSong = newSong;
                    if (this.currentSong.phrases.length > 0) {
                        this.currentPhraseIndex = 0;
                    }
                }
            }
        }
    },
    methods: {
        updateSongTitle(title) {
            this.$emit('update-song-title', title);
        },
        updatePhraseLabel(index, label) {
            this.$emit('update-phrase-label', { index, label });
        },
        updatePhraseRepetitions(index, repetitions) {
            this.$emit('update-phrase-repetitions', { index, repetitions: Number(repetitions) });
        },
        selectPhrase(index) {
            this.currentPhraseIndex = index;
            this.$emit('select-phrase', index);
        },
        requestMovePhraseUp(index) {
            this.$emit('move-phrase-up', index);
        },
        requestMovePhraseDown(index) {
            this.$emit('move-phrase-down', index);
        },
        requestDeletePhrase(index) {
            this.$emit('delete-phrase', index);
        },
        requestAddNewPhraseAfter(index) {
            this.$emit('add-phrase-after', index);
        },
        duplicatePhraseAfter(index) {
            this.$emit('duplicate-phrase-after', index);
        }
    }
};


</script>

<style scoped>
#songBuilder {
    text-align: left;
    border: black solid 1px;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
}
#currentPhrase {
    background-color: yellow;
}
.songtitle{
    text-align: left;
    font-weight: bold;
    font-size: 1.2em;
}
.compact-number {
    width: 5ch;
}
</style>