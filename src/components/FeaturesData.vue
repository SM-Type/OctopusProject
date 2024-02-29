<!-- FeaturesData.vue -->
<script setup>
import opentype from "opentype.js";
import AxisNavContent from "@/components/AxisNavContent.vue";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const fvarTags = ref([]);
const gsubTags = ref([]);
const selectedFont = ref(null);

async function importFont(event) {
  const file = event.target.files[0];

  if (!file) {
    console.error("Nie wybrano pliku fontu.");
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

    // Wywołaj akcję fetchData z modułu OT_VF_tags
    await store.dispatch('fetchData', fvarTags.value);
    await store.dispatch('fetchOTData', gsubTags.value);

    // Tutaj możesz dalej manipulować danymi lub przekazywać je do innych części aplikacji
    console.log("Tagi z fvar:", fvarTags.value);
    console.log("Tagi z gsub.features:", gsubTags.value);
    console.log("Wybrany font:", selectedFont.value);
  } catch (err) {
    console.error("Błąd podczas ładowania fontu:", err);
  }
}
</script>

<template>
  <div>
    <input type="file" ref="fontInput" @change="importFont" />
    <AxisNavContent :updateAxisContent="fvarTags" :font="selectedFont" />
  </div>
</template>

<style scoped lang="scss"></style>
