<!-- components/Column.vue -->
<script setup>
import AxisNavContent from '@/components/AxisNavContent.vue'
import FeaturesData from '@/components/FeaturesData.vue'
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'

// Access the Vuex store
const store = useStore()

// Reference to the selected font
const font = ref(null)

// Track cursor position in the text area
const cursorPosition = ref({ start: 0, end: 0 })

// Korzystaj z obliczonej właściwości do śledzenia zaimportowanej czcionki
const importedFont = computed(() => store.state.customFontModule.importedFont);

// Funkcja do zastosowania zaimportowanej czcionki na <textarea>
function applyImportedFont() {
  const useFont = document.querySelectorAll('.textarea');

  useFont.forEach((e) => {
    e.style.fontFamily = importedFont.value ? 'CustomFont' : 'initial';
  });
}

// Zaaplikuj czcionkę na załadowanie komponentu
applyImportedFont();

// Watch for changes in the imported font and update the font reference
watch(
  () => importedFont.value,
  () => {
    // Call the function to apply the imported font
    applyImportedFont();
  }
);
</script>

<template>
  <div :id="'col-r' + rowIndex + '-c' + columnIndex" class="column">
    <!-- AxisNavContent component to navigate through font variation settings -->
    <AxisNavContent :updateAxisContent="fvarTags">
      <template #content>
        <!-- Display font variation tags as a comma-separated list -->
        <p class="axis-nav">
          {{ fvarTags && fvarTags.length > 0 ? fvarTags.join(', ') : '' }}
        </p>
      </template>
    </AxisNavContent>

    <!-- Text area for input and editing -->
    <div class="column-text-area">
      <textarea
        class = "textarea"
        :id="'p-' + rowIndex + '-c' + columnIndex"
        v-model="sharedText"
        @input="wrapText"
        @scroll="syncScroll"
        @keydown.enter.prevent="handleEnterKey"
        spellcheck="false"
      >
        </textarea
      >
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
  setup() {
    const store = useStore();

    console.log("Hello");
    // Korzystaj z obliczonej właściwości do śledzenia zaimportowanej czcionki
    const importedFont = computed(() => store.state.customFontModule.importedFont);

    // Funkcja do zastosowania zaimportowanej czcionki na <textarea>
    function applyImportedFont() {
      const useFont = document.querySelectorAll('.textarea');

      useFont.forEach((e) => {
        e.style.fontFamily = importedFont.value ? 'CustomFont' : 'initial';
      });
    }

    // Zaaplikuj czcionkę na załadowanie komponentu
    applyImportedFont();

    return {
      // Zwróć funkcję, aby można ją było użyć w komponencie
      applyImportedFont,
    };
  },
  computed: {
    // Get and set sharedText from the Vuex store
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
    // Wrap text to a specified number of characters per line
    wrapText() {
      const text = this.sharedText
      const lines = text.match(new RegExp(`.{1,${charactersPerLine.value}}`, 'g'))

      if (lines) {
        this.$store.commit('updateSharedText', lines.join('\n'))
      }
    },
    // Handle Enter key press to insert a new line
    handleEnterKey(event) {
      const start = event.target.selectionStart
      const end = event.target.selectionEnd

      // Get the current text
      const currentText = this.sharedText

      // Split the text into two parts at the cursor position
      const firstPart = currentText.slice(0, start)
      const secondPart = currentText.slice(end)

      // Create a new text with an added newline
      const newText = firstPart + '\n' + secondPart

      // Update the text in Vuex
      this.$store.commit('updateSharedText', newText)

      // Set the cursor at the position we remembered earlier
      const newCursorPosition = start + 1
      this.$nextTick(() => {
        event.target.setSelectionRange(newCursorPosition, newCursorPosition)
      })
    },
    // Synchronize scrolling of multiple text areas
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
    // Row and column indices for identification
    rowIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    // Font variation tags for AxisNavContent
    fvarTags: {
      type: Array,
      default: () => []
    }
  },
  components: {
    FeaturesData,
  },
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

    // Styling for the text area
    $paddingTextArea: 20px;
    textarea {
      width: calc(100% - ($paddingTextArea * 2));
      height: 100%; /* Set the appropriate maximum height */
      padding: 0 $paddingTextArea;
      resize: none;
      font-size: 64px;
    }
    .textarea {
      font-variation-settings: 'wdth' 1000;
    }
  }
}
</style>
