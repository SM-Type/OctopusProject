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
  <div>
    <input type="file" ref="fontInput" @change="importFont" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import opentype from 'opentype.js';
import { useStore } from 'vuex';

const store = useStore();

// References for font variation and substitution tags
const fvarTags = ref([]);
const gsubTags = ref([]);

// References for selected and user-selected fonts
const selectedFont = ref(null);
const userSelectedFont = ref(null);

// Function to handle font import
async function importFont(event) {
  const file = event.target.files[0];

  if (!file) {
    console.error('Empty axis value');
    return;
  }

  try {
    // Read font file as ArrayBuffer
    const fontArrayBuffer = await file.arrayBuffer();
    const loadedFont = opentype.parse(fontArrayBuffer);

    // Clear arrays on each new import
    fvarTags.value = [];
    gsubTags.value = [];

    // Get tags from fvar if they exist
    if (loadedFont.tables.fvar && loadedFont.tables.fvar.axes) {
      for (const axis of loadedFont.tables.fvar.axes) {
        fvarTags.value.push(axis.tag);
      }

      // Call the fetchDefaultAxesData action only if fvar axes exist
      await store.dispatch('fetchDefaultAxesData', loadedFont.tables.fvar.axes);
    } else {
      // If the font has no fvar axes, clear axis data in the store
      await store.dispatch('fetchDefaultAxesData', []);
    }

    // Get tags from gsub.features if they exist
    if (loadedFont.tables.gsub && loadedFont.tables.gsub.features) {
      const uniqueGsubTags = new Set();

      for (const feature of loadedFont.tables.gsub.features) {
        if (feature.tag) {
          uniqueGsubTags.add(feature.tag);
        }
      }

      // Transform Set to an array
      gsubTags.value = Array.from(uniqueGsubTags);
    }

    // Set references to the loaded font and its name
    selectedFont.value = loadedFont;
    userSelectedFont.value = loadedFont.names.fullName.en;

    // Call the fetchVFData and fetchOTData actions
    await store.dispatch('fetchVFData', fvarTags.value);
    await store.dispatch('fetchOTData', gsubTags.value);
    await store.commit('setSelectedFontName', userSelectedFont.value);

    // Further manipulation or passing data to other parts of the application can be done here
    console.log('Tags from fvar:', fvarTags.value);
    console.log('Tags from gsub.features:', gsubTags.value);
    console.log('Selected font:', selectedFont.value);
    console.log('User-selected font:', userSelectedFont.value);
  } catch (err) {
    console.error('Error loading font:', err);
  }
}
</script>

<style scoped lang="scss"></style>
