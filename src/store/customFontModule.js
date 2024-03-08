// store/customFontModule.js
export default {
    state: {
      importedFont: null,
    },
    mutations: {
      setImportedFont(state, font) {
        state.importedFont = font;
      },
    },
  };