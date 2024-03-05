// store/fontInfo.js
export default {
  state: {
    // Initial state with the selected font name set to null
    selectedFontName: null,
  },
  mutations: {
    // Mutation to update the state with the selected font name
    setSelectedFontName(state, fontName) {
      state.selectedFontName = fontName;  // Set the selected font name in the state
    },
  },
  getters: {
    // Getter to access the selected font name from the state
    getSelectedFontName: (state) => state.selectedFontName,  // Get the selected font name
  },
};
