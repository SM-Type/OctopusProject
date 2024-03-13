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
  import { ref } from 'vue'
  import opentype from 'opentype.js'
  import { useStore } from 'vuex'
  // ICONS
  import IconAdd from '@/components/icons/Icon-M-Add_Circle.vue' // Import the IconAdd component
  
  const store = useStore()
  
  // References for font variation and substitution tags
  const fvarTags = ref([])
  const gsubTags = ref([])
  
  // References for selected and user-selected fonts
  const selectedFont = ref(null)
  const userSelectedFont = ref(null)
  
  const fileName = ref('')
  let loadedFont;  // Zdefiniuj loadedFont na zewnątrz funkcji
  
  // Function to handle file upload
  async function handleFileUpload(event) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      await processFontFile(file);  // Dodaj 'await' tutaj
    }
  }
  
  // Function to read file as ArrayBuffer
  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result)
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsArrayBuffer(file)
    })
  }
  
  // Function to handle font import
  async function processFontFile(file) {
    try {
      const fontArrayBuffer = await readFileAsArrayBuffer(file)
      const loadedFont = opentype.parse(fontArrayBuffer)
  
      // Clear arrays on each new import
      fvarTags.value = []
      gsubTags.value = []
  
      // Get tags from fvar if they exist
      if (loadedFont.tables.fvar && loadedFont.tables.fvar.axes) {
        for (const axis of loadedFont.tables.fvar.axes) {
          fvarTags.value.push(axis.tag)
        }
  
        // Call the fetchDefaultAxesData action only if fvar axes exist
        await store.dispatch('fetchDefaultAxesData', loadedFont.tables.fvar.axes)
      } else {
        // If the font has no fvar axes, clear axis data in the store
        await store.dispatch('fetchDefaultAxesData', [])
      }
  
      // Get tags from gsub.features if they exist
      if (loadedFont.tables.gsub && loadedFont.tables.gsub.features) {
        const uniqueGsubTags = new Set()
  
        for (const feature of loadedFont.tables.gsub.features) {
          if (feature.tag) {
            uniqueGsubTags.add(feature.tag)
          }
        }
  
        // Transform Set to an array
        gsubTags.value = Array.from(uniqueGsubTags)
      }
  
      // Set references to the loaded font and its name
      selectedFont.value = loadedFont
      userSelectedFont.value = loadedFont.names.fullName.en
  
      // Call the fetchVFData and fetchOTData actions
      await store.dispatch('fetchVFData', fvarTags.value)
      await store.dispatch('fetchOTData', gsubTags.value)
      await store.commit('setSelectedFontName', userSelectedFont.value)
  
      // Dynamically apply font style
      applyCustomFontStyle(loadedFont)
  
      // Further manipulation or passing data to other parts of the application can be done here
      console.log('Tags from fvar:', fvarTags.value)
      console.log('Tags from gsub.features:', gsubTags.value)
      console.log('Selected font:', selectedFont.value)
      console.log('User-selected font:', userSelectedFont.value)
    } catch (err) {
      console.error('Error loading font:', err)
    }
  }
  
  // Function to dynamically apply font style
  function applyCustomFontStyle(loadedFont) {
    // Check if FontFace is available in the browser
    if (typeof FontFace !== 'undefined') {
      const style = document.createElement('style')
      const blob = new Blob([new Uint8Array(loadedFont.toArrayBuffer())], { type: 'font/opentype' })
      const fontDataUrl = URL.createObjectURL(blob)
  
      // Create FontFace and add it to the document
      const customFont = new FontFace('CustomFont', `url(${fontDataUrl})`)
      customFont.load().then(
        (font) => {
          document.fonts.add(font)
  
          // Set custom font in body
          document.body.style.fontFamily = 'CustomFont'
  
          // Add style to the document
          style.appendChild(
            document.createTextNode(
              `@font-face { font-family: 'CustomFont'; src: url('${fontDataUrl}'); }`
            )
          )
          document.head.appendChild(style)
  
          // Apply custom font to elements with the class .textarea
          const useFont = document.querySelectorAll('.textarea')
          useFont.forEach((e) => {
            e.style.fontFamily = 'CustomFont'
            e.style.fontVariationSettings = "'wdth' 1000"
          })
        },
        (error) => {
          console.error('Error loading custom font:', error)
        }
      )
    } else {
      console.error('FontFace is not supported in this browser.')
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
  