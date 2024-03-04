// store/Features-tags.js
export default {
  state: {
    VFData: ["It's not VariableFont"],
    OTData: ['–'],
    defaultAxesData: [],
  },
  mutations: {
    setVFData(state, newVFData) {
      state.VFData = newVFData;
    },
    setOTData(state, newOTData) {
      state.OTData = newOTData;
    },
    setDefaultAxesData(state, newDefaultAxesData) {
      state.defaultAxesData = newDefaultAxesData;
    },
  },
  actions: {
    async fetchVFData({ commit }, fvarTags) {
      commit('setVFData', fvarTags);
      console.log('fvarTags', fvarTags);
    },
    fetchOTData({ commit }, gsubTags) {
      commit('setOTData', gsubTags);
      console.log('gsubTags', gsubTags);
    },
    fetchDefaultAxesData({ commit }, defaultAxesData) {
      commit('setDefaultAxesData', defaultAxesData);
      console.log('Default Axes Data:', defaultAxesData);
    },
  },
  getters: {
    getVFData: (state) => state.VFData,
    getOTData: (state) => state.OTData,
    getDefaultAxesData: (state) => state.defaultAxesData,
  },
};
