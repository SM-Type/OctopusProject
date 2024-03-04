// store/texts.js
export default {
  state: {
    sharedText: 'AaBbCc...', // Default text
  },
  mutations: {
    updateSharedText(state, newText) {
      state.sharedText = newText;
    },
  },
};