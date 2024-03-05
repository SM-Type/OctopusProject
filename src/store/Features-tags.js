// store/Features-tags.js
export default {
  state: {
    // Initial state with arrays for Variable Font (VF), OpenType (OT) data, and default axes data
    VFData: ["Empty axis value"],  // Placeholder value for Variable Font data
    OTData: ['•'],  // Placeholder value for OpenType data
    defaultAxesData: [],  // Array to store default axes data
  },
  mutations: {
    // Mutations to update the state with new data
    setVFData(state, newVFData) {
      state.VFData = newVFData;  // Set Variable Font data in the state
    },
    setOTData(state, newOTData) {
      state.OTData = newOTData;  // Set OpenType data in the state
    },
    setDefaultAxesData(state, newDefaultAxesData) {
      state.defaultAxesData = newDefaultAxesData;  // Set default axes data in the state
    },
  },
  actions: {
    // Actions to asynchronously fetch and update data
    async fetchVFData({ commit }, fvarTags) {
      commit('setVFData', fvarTags);  // Commit mutation to set Variable Font data
      console.log('fvarTags', fvarTags);  // Log Variable Font data for debugging
    },
    fetchOTData({ commit }, gsubTags) {
      commit('setOTData', gsubTags);  // Commit mutation to set OpenType data
      console.log('gsubTags', gsubTags);  // Log OpenType data for debugging
    },
    fetchDefaultAxesData({ commit }, defaultAxesData) {
      commit('setDefaultAxesData', defaultAxesData);  // Commit mutation to set default axes data
      console.log('Default Axes Data:', defaultAxesData);  // Log default axes data for debugging
    },
  },
  getters: {
    // Getters to access state data
    getVFData: (state) => state.VFData,  // Get Variable Font data
    getOTData: (state) => state.OTData,  // Get OpenType data
    getDefaultAxesData: (state) => state.defaultAxesData,  // Get default axes data
  },
};
