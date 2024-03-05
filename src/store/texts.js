// store/texts.js
export default {
  state: {
    sharedText: 'AaBbCc...', // Default text stored in the state
  },
  mutations: {
    // Mutation to update the shared text in the state
    updateSharedText(state, newText) {
      state.sharedText = newText;  // Set the shared text to the new value
    },
  },
};
