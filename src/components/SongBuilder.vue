<template>
    <div id="songBuilder" v-if="currentSong">
        <p>
            Enter title: <input :value="currentSong.title" @input="updateSongTitle($event.target.value)">
            <button @click="$emit('play-song')">Play Song</button>
        </p>
        <table>
            <thead>
                <tr>
                    <th>phrase</th>
                    <th>Repetitions</th>
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
                    <td><input type="number" :value="phrase.repetitions" @input="updatePhraseRepetitions(index, $event.target.value)"></td>
                    <td><button @click="requestMovePhraseUp(index)">Up</button></td>
                    <td><button @click="requestMovePhraseDown(index)">Down</button></td>
                    <td><button @click="requestDeletePhrase(index)">Delete</button></td>
                    <td><button @click="requestAddNewPhraseAfter(index)">Add</button></td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import { Song } from '../models/theory';

export default {
    name: 'SongBuilder',
    props: {
        songIn: Song
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
        }
    }
};


</script>

<style scoped>
#currentPhrase {
    background-color: yellow;
}
</style>