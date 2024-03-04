<!-- components/FeaturesData.vue -->
<template>
  <div>
    <input type="file" ref="fontInput" @change="importFont" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import opentype from 'opentype.js';
import { useStore } from 'vuex';

const store = useStore();

const fvarTags = ref([]);
const gsubTags = ref([]);
const selectedFont = ref(null);
const userSelectedFont = ref(null);

async function importFont(event) {
  const file = event.target.files[0];

  if (!file) {
    console.error('Empty axis value');
    return;
  }

  try {
    const fontArrayBuffer = await file.arrayBuffer();
    const loadedFont = opentype.parse(fontArrayBuffer);

    // Czyść tablice przy każdym nowym imporcie
    fvarTags.value = [];
    gsubTags.value = [];

    // Pobierz tagi z fvar, jeśli istnieją
    if (loadedFont.tables.fvar && loadedFont.tables.fvar.axes) {
      for (const axis of loadedFont.tables.fvar.axes) {
        fvarTags.value.push(axis.tag);
      }

      // Wywołaj akcje fetchDefaultAxesData tylko jeśli osie fvar istnieją
      await store.dispatch('fetchDefaultAxesData', loadedFont.tables.fvar.axes);
    } else {
      // Jeśli font nie ma osi fvar, wyczyść dane osi z store
      await store.dispatch('fetchDefaultAxesData', []);
    }

    // Pobierz tagi z gsub.features, jeśli istnieją
    if (loadedFont.tables.gsub && loadedFont.tables.gsub.features) {
      const uniqueGsubTags = new Set();

      for (const feature of loadedFont.tables.gsub.features) {
        if (feature.tag) {
          uniqueGsubTags.add(feature.tag);
        }
      }

      // Przekształć Set na tablicę
      gsubTags.value = Array.from(uniqueGsubTags);
    }

    selectedFont.value = loadedFont;
    userSelectedFont.value = loadedFont.names.fullName.en;

    // Wywołaj akcje fetchVFData i fetchOTData
    await store.dispatch('fetchVFData', fvarTags.value);
    await store.dispatch('fetchOTData', gsubTags.value);

    // Tutaj możesz dalej manipulować danymi lub przekazywać je do innych części aplikacji
    console.log('Tagi z fvar:', fvarTags.value);
    console.log('Tagi z gsub.features:', gsubTags.value);
    console.log('Wybrany font:', selectedFont.value);
    console.log('User-selected font:', userSelectedFont.value);
  } catch (err) {
    console.error('Błąd podczas ładowania fontu:', err);
  }
}
</script>

<style scoped lang="scss"></style>
