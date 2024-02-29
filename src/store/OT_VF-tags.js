// store/OT_VF-tags.js
export default {
  state: {
    compAData: ['undefined font'],
  },
  mutations: {
    setCompAData(state, newData) {
      state.compAData = newData;
    },
  },
  actions: {
    fetchData({ commit }, fvarTags) {
      // Ustawianie nowych danych w stanie
      commit('setCompAData', fvarTags);
      console.log('fvarTags', fvarTags);
    },
  },
  getters: {
    getCompAData: (state) => state.compAData,
  },
};
