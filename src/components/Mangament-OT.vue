<!-- components/Mangament-OT.vue -->

<template>
  <!-- GSUB features list component -->
  <div class="GSUB-list">
    <!-- Display each GSUB feature in a separate item -->
    <div v-for="item in GSUBData" :key="item" class="GSUB-item">
      <!-- Placeholder for enable/disable icon or button -->
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore() // Access the Vuex store

const GSUBData = ref([]) // Reactive variable to store GSUB features

// Watcher to react to changes in the GSUBData from the Vuex store
watch(
  () => store.getters.getGSUBData,
  (newGSUBData) => {
    GSUBData.value = newGSUBData
  }
)

// Mounted lifecycle hook to initialize GSUBData from the Vuex store
onMounted(() => {
  GSUBData.value = store.getters.getGSUBData
  // Uncomment the following line if you need to fetch GSUBData from the store
  // store.dispatch('fetchGSUBData')
})
</script>

<style lang="scss">
@import '../src/assets/main.scss';

.GSUB-list {
  // Styling for the container of OpenType (OT) feature items
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 4px 6px;

  .GSUB-item {
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
