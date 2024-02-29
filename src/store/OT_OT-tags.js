// store/OT_OT-tags.js
export default {
  state: {
    OTData: ['–'],
  },
  mutations: {
    setOTData(state, newOTData) {
      state.OTData = newOTData;
    },
  },
  actions: {
    fetchOTData({ commit }, gsubTags) {
      // Ustawianie nowych danych w stanie
      commit('setOTData', gsubTags);
      console.log('gsubTags', gsubTags);
    },
  },
  getters: {
    getOTData: (state) => state.OTData,
  },
};
