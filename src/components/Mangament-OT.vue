<!-- components/Mangament-OT.vue -->
<script setup>
// Import statement (currently commented out) for ManagementPanel.vue
// import ManagementPanel from '@/components/ManagementPanel.vue'
</script>

<template>
  <!-- OpenType (OT) features list component -->
  <div class="OT-list">
    <!-- Display each OpenType feature in a separate item -->
    <div v-for="item in OTData" :key="item" class="OT-item">
      <!-- Placeholder for enable/disable icon or button -->
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Data property to store OpenType (OT) features
      OTData: []
    }
  },
  // Watcher to react to changes in the OTData from the Vuex store
  watch: {
    '$store.getters.getOTData'(newOTData) {
      this.OTData = newOTData
    }
  },
  // Mounted lifecycle hook to initialize OTData from the Vuex store
  mounted() {
    this.OTData = this.$store.getters['getOTData'];
    // Uncomment the following line if you need to fetch OTData from the store
    // this.$store.dispatch('fetchOTData')
  }
}
</script>

<style lang="scss">
@import '../src/assets/main.scss';

.OT-list {
  // Styling for the container of OpenType (OT) feature items
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 4px 6px;

  .OT-item {
    // Styling for each OpenType (OT) feature item
    width: auto;
    height: auto;
    display: flex;
    padding: 6px 8px;
    background-color: $Color-red-op; // Placeholder background color
    border: 1px solid $Black-op-14;
    border-radius: $MAIN-radius-small;

    &:active {
      // Styling when the item is active (clicked or pressed)
      background-color: $Color-green-op; // Placeholder active color
    }

    span {
      // Styling for the text content of the item
      width: auto;
    }
  }
  .enable {
    // Styling for the 'enable' state (currently not used)
    color: $Black-basic;
    background-color: $Color-green-op;

    &:active {
      // Styling when the 'enable' state is active
      background-color: $Color-red-op;
    }
  }
}
</style>
