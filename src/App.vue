<template>
  <v-app>
    <v-main>
      <Keyboard/>
      <KeyPicker/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Keyboard from './components/Keyboard.vue'
import KeyPicker from './components/KeyPicker.vue'

export default defineComponent({
  name: 'App',

  components: {
    Keyboard,
    KeyPicker
  },

  data () {
    return {
      //
    }
  },
})
</script>
