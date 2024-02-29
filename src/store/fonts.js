// store/fonts.js
export default {
    state: {
      selectedFont: null,
    },
    mutations: {
      setFont(state, font) {
        state.selectedFont = font;
      },
    },
  };