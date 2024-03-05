// store/fonts.js
export default {
  state: {
    // Initial state with the selected font set to null
    selectedFont: null,
  },
  mutations: {
    // Mutation to update the state with a selected font
    setFont(state, font) {
      state.selectedFont = font;  // Set the selected font in the state
    },
  },
};
