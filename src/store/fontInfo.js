// store/fontInfo.js
export default {
  state: {
    selectedFontName: null,
  },
  mutations: {
    setSelectedFontName(state, fontName) {
      state.selectedFontName = fontName;
    },
  },
  getters: {
    getSelectedFontName: (state) => state.selectedFontName,
  },
};
