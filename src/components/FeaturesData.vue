<!-- components/FeaturesData.vue -->

<!-- 
  Purpose:
  This component allows users to import a font file and fetch data from its GSUB and FVAR tables. 
  The fetched data is then used in the Vuex store.

  Description:
  File input for font import with functionality to handle font import, fetch GSUB and FVAR tags, 
  and update the Vuex store with the obtained data.

  HTML Structure:
  - File input for font import
-->
<!-- components/FeaturesData.vue -->
<!-- components/FeaturesData.vue -->
<template>
  <!-- File input for font import -->
  <div class="fontImportInput-container">
    <IconAdd />
    <input
      class="fontImportInput"
      type="file"
      ref="fontInput"
      @change="handleFileUpload"
      accept=".otf, .ttf, .woff"
    />
    <label class="fontImportInput-label">Use font</label>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, watch, onMounted } from 'vue'
import IconAdd from '@/components/icons/Icon-M-Add_Circle.vue'
import opentype from 'opentype.js'

const fvarTags = ref([])
const gsubTags = ref([])
const selectedFont = ref(null)
const userSelectedFont = ref(null)

const fontLoaded = ref(false)

const store = useStore() // Access the Vuex store

// Function to handle file upload
function handleFileUpload(event) {
  const fileInput = event.target
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0]
    processFontFile(file)
  }
}

// Function to handle font import with Opentype.js
function processFontFile(file) {
  try {
    const fontPath = URL.createObjectURL(file)

    // Function to get unique OT Tags
    function getUniqueGSUBTags(features) {
      const uniqueTags = new Set()

      features.forEach((feature) => {
        if (feature.tag) {
          uniqueTags.add(feature.tag)
        }
      })

      return Array.from(uniqueTags)
    }

    // Use Opentype.js to parse the font
    opentype.load(fontPath, (err, loadedFont) => {
      if (err) {
        console.error('Error loading font with Opentype.js:', err)
        return
      }

      // Check if the font has VF axes
      if (
        !loadedFont.tables.fvar ||
        !loadedFont.tables.fvar.axes ||
        loadedFont.tables.fvar.axes.length === 0
      ) {
        const customFont = new FontFace('CustomFont', `url(${fontPath})`)
        customFont.load().then((font) => {
          document.fonts.add(font)
          document.body.style.fontFamily = 'CustomFont'

          // Apply to elements with the class .textarea
          const useFont = document.querySelectorAll('.textarea')

          useFont.forEach((e) => {
            e.style.fontFamily = 'CustomFont'
          })
          // Set fontLoaded to true after successful loading
          fontLoaded.value = true
          // Dispatch action to update GSUB data in Vuex
          store.dispatch('fetchGSUBData', getUniqueGSUBTags(loadedFont.tables.gsub.features))
          // Dispatch action to update VF data in Vuex
          store.dispatch('fetchVFData', []);
        })

        // Log OT GSUB Features information
        console.log('OT GSUB Tags:', getUniqueGSUBTags(loadedFont.tables.gsub.features))
        // Log for static font
        console.warn('Font does not have VF axes.')
        return
      }
      // Log OT GSUB Features information
      console.log('OT GSUB Tags:', getUniqueGSUBTags(loadedFont.tables.gsub.features))

      // Log VF axes information
      // TAG name
      console.log(
        'VF Axes Tag:',
        loadedFont.tables.fvar.axes.map((axis) => axis.tag)
      )
      // Default Value for all Tags
      console.log(
        'VF defaultValue',
        loadedFont.tables.fvar.axes.map((axis) => axis.defaultValue)
      )
      // Max and min. Value for all Tags
      console.log(
        'VF minValue:',
        loadedFont.tables.fvar.axes.map((axis) => axis.minValue)
      )
      console.log(
        'VF maxValue:',
        loadedFont.tables.fvar.axes.map((axis) => axis.maxValue)
      )

      // Continue with FontFace API to apply the font as before
      if (
        loadedFont.tables.fvar &&
        loadedFont.tables.fvar.axes &&
        loadedFont.tables.fvar.axes.length > 0
      ) {
        const customFont = new FontFace('CustomFont', `url(${fontPath})`)
        customFont.load().then(
          (font) => {
            document.fonts.add(font)
            document.body.style.fontFamily = 'CustomFont'

            // Apply to elements with the class .textarea
            const useFont = document.querySelectorAll('.textarea')
            useFont.forEach((e) => {
              const fontVariationSettings = loadedFont.tables.fvar.axes
                .map((axis) => `'${axis.tag}' ${axis.defaultValue}`)
                .join(', ')
              e.style.fontFamily = 'CustomFont'
              e.style.fontVariationSettings = fontVariationSettings
            })

            // Set fontLoaded to true after successful loading
            fontLoaded.value = true

            // Dispatch action to update GSUB data in Vuex
            store.dispatch('fetchGSUBData', getUniqueGSUBTags(loadedFont.tables.gsub.features))

            // Dispatch action to update VF data in Vuex
            store.dispatch('fetchVFData', loadedFont.tables.fvar.axes);

            // Watch for changes in VFData and apply fontVariationSettings
            watch(
              () => store.getters.getVFData,
              (newVFData) => {
                const fontVariationSettings = newVFData
                  .map((axis) => `'${axis.tag}' ${axis.defaultValue}`)
                  .join(', ')
                useFont.forEach((e) => {
                  e.style.fontVariationSettings = fontVariationSettings
                })
              },
              { deep: true }
            )
          },
          (error) => {
            console.error('Error loading custom font:', error)
          }
        )
      }
    })
  } catch (err) {
    console.error('Error loading font:', err)
  }
}
</script>

<style scoped lang="scss">
@import '../assets/main.scss';

.fontImportInput-container {
  position: relative;
  overflow: hidden;
  padding: 6px 10px;

  border-radius: $MAIN-radius-small;

  height: fit-content;
  background-color: $Black-op_04;
  border: 1px solid $Black-op_04;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: $Black-op_07;
    border: 1px solid $Black-op_07;
  }
  @include activeBtn;
}

.fontImportInput {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.fontImportInput-label {
  display: inline-block;
  cursor: pointer;
  @include Font-P; // Apply styling for the text label
}

.fontImportInput-label:hover {
  background-color: #2980b9;
}
</style>
