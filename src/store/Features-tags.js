// store/Features-tags.js
export default {
  state: {
    // VF
    // Initial state with arrays for Variable Font (VF), OpenType (OT) data, and default axes data
    VFData: ['TagVF: NaN'], // Placeholder value for Variable Font data
    defaultAxesData: ['ValueVF: NaN'], // Array to store default axes data
    // OT
    GSUBData: ['NaN'] // Placeholder value for OpenType data
  },
  mutations: {
    // VF
    // Mutations to update the state with new data
    setVFData(state, newVFData) {
      state.VFData = newVFData // Set Variable Font data in the state
    },
    setDefaultAxesData(state, newDefaultAxesData) {
      state.defaultAxesData = newDefaultAxesData // Set default axes data in the state
    },
    // OT
    setGSUBData(state, newGSUBData) {
      state.GSUBData = newGSUBData // Set GSUB data in the state
    }
  },
  actions: {
    //VF
    // Actions to asynchronously fetch and update data
    async fetchVFData({ commit }, fvarTags) {
      commit('setVFData', fvarTags) // Commit mutation to set Variable Font data
    },
    async updateVFData({ commit }, updatedVFData) {
      commit('setVFData', updatedVFData);  // Commit mutation to set updated VF data
      // Do any additional logic, if needed
    },
    // OT
    async fetchGSUBData({ commit }, gsubTags) {
      commit('setGSUBData', gsubTags) // Commit mutation to set GSUB data
    }
  },
  getters: {
    // VF
    // Getters to access state data
    getVFData: (state) => state.VFData, // Get Variable Font data
    getDefaultAxesData: (state) => state.defaultAxesData, // Get default axes data
    // OT
    // Getter to access GSUB data
    getGSUBData: (state) => state.GSUBData // Get OpenType data
  }
}
