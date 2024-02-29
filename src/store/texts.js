// store/texts.js
export default {
  state: {
    sharedText: 'Hello', // Przykładowa zmienna do zarządzania tekstem.
  },
  mutations: {
    updateSharedText(state, newText) {
      state.sharedText = newText;
    },
  },
};