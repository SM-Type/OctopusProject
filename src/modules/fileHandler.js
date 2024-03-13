import opentype from 'opentype.js';
import { ref } from 'vue';

const fvarTags = ref([]);
const gsubTags = ref([]);
const selectedFont = ref(null);
const userSelectedFont = ref(null);

const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.readAsArrayBuffer(file);
  });
};

const handleFontData = async (fontData, file, store) => {
  try {
    const loadedFont = opentype.parse(fontData);

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
};

export default {
  readFileAsArrayBuffer,
  handleFontData,
  processFontFile: async (file) => {
    const fontData = await readFileAsArrayBuffer(file);
    if (fontData) {
      // Dostęp do sklepu Vuex jest opcjonalny, w zależności od Twoich potrzeb
      // Jeśli używasz sklepu Vuex, upewnij się, że jest dostępny w miejscu, gdzie jest używany processFontFile
      const store = null; // Tutaj możesz przypisać sklep Vuex, jeśli jest dostępny
      await handleFontData(fontData, file, store);
    }
  },
};

