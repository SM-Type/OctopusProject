<script setup>
import AxisNavContent from '@/components/AxisNavContent.vue'
import { ref, watch } from 'vue'

const font = ref(null)
const cursorPosition = ref({ start: 0, end: 0 })

watch(
  () => font.value,
  (newFont) => {
    // Do something when the font changes
    console.log('Nowy font:', newFont)
  }
)
</script>

<template>
  <div :id="'col-r' + rowIndex + '-c' + columnIndex" class="column">
    <AxisNavContent :updateAxisContent="fvarTags">
      <template #content>
        <p class="axis-nav">
          {{ fvarTags && fvarTags.length > 0 ? fvarTags.join(', ') : '' }}
        </p>
      </template>
    </AxisNavContent>

    <div
      class="column-text-area"
      :style="{ fontFamily: font ? font.names.fullName.en : 'initial' }"
    >
      <textarea
        :id="'p-' + rowIndex + '-c' + columnIndex"
        v-model="sharedText"
        @input="wrapText"
        @scroll="syncScroll"
        @keydown.enter.prevent="handleEnterKey"
        spellcheck="false"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTextSelected: false
    }
  },
  computed: {
    sharedText: {
      get() {
        return this.$store.state.texts.sharedText
      },
      set(newText) {
        this.$store.commit('updateSharedText', newText)
      }
    }
  },
  methods: {
    wrapText() {
      const text = this.sharedText
      const lines = text.match(new RegExp(`.{1,${charactersPerLine.value}}`, 'g'))

      if (lines) {
        this.$store.commit('updateSharedText', lines.join('\n'))
      }
    },
    handleEnterKey(event) {
      const start = event.target.selectionStart
      const end = event.target.selectionEnd

      // Pobierz aktualny tekst
      const currentText = this.sharedText

      // Podziel tekst na dwie części w miejscu kursora
      const firstPart = currentText.slice(0, start)
      const secondPart = currentText.slice(end)

      // Utwórz nowy tekst z dodaną nową linią
      const newText = firstPart + '\n' + secondPart

      // Zaktualizuj tekst w Vuex
      this.$store.commit('updateSharedText', newText)

      // Ustaw kursor na pozycji, którą zapamiętaliśmy wcześniej
      const newCursorPosition = start + 1
      this.$nextTick(() => {
        event.target.setSelectionRange(newCursorPosition, newCursorPosition)
      })
    },
    syncScroll(event) {
      const scrollTop = event.target.scrollTop
      const textAreas = document.querySelectorAll('textarea')
      textAreas.forEach((textArea) => {
        if (textArea !== event.target) {
          textArea.scrollTop = scrollTop
        }
      })
    }
  },

  props: {
    rowIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    fvarTags: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/main.scss';

.column {
  width: 100%;
  height: 100%;
  position: relative;

  .column-text-area {
    width: 100%;
    height: calc(100% - 36px);
    
    $paddingTextArea: 20px;
    textarea {
      width: calc(100% - ($paddingTextArea * 2));
      height: 100%; /* Ustaw odpowiednią maksymalną wysokość */
      padding: 0 $paddingTextArea;
      resize: none;
      font-size: 64px;
    }
  }
}
</style>
