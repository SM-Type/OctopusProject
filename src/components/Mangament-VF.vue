<!-- components/Management-VF.vue -->

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'

// Access the Vuex store
const store = useStore()

// Reactive variable to store VF (Variable Font) data
const VFData = ref([])

// React to changes in store/Features-tags.js
watchEffect(() => {
  // Get VF data from the Vuex store
  VFData.value = store.getters.getVFData
})

// Mounted lifecycle hook to initialize VFData from the Vuex store
onMounted(() => {
  VFData.value = store.getters.getVFData
  // Uncomment the following line if you need to fetch VFData from the store
  // store.dispatch('fetchVFData')
})

// Function to update VFData in Vuex store
function updateVFData() {
  store.dispatch('updateVFData', VFData.value)
}
</script>

<template>
  <!-- Variable Font (VF) settings list component -->
  <div>
    <!-- Check if VFData has items -->
    <div v-if="VFData.length > 0" class="VF-list">
      <!-- Display each VF item with a tag and input for default value -->
      <div v-for="item in VFData" :key="item.tag" class="VF-item">
        <span>{{ item.tag }}</span>
        <input
          v-model="item.defaultValue"
          type="text"
          name="name"
          id=""
          class="VF-input"
          @change="updateVFData"
        />
      </div>
    </div>
    <!-- Display a message if VFData is empty -->
    <div v-else>
      <p>Empty axis value</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // Method to dispatch Vuex action and update VF data
    updateVFData(item) {
      // Dispatch action to update VF data in Vuex
      this.$store.dispatch('updateVFData', VFData.value)
      // Additional logic, if needed
    }
  }
}
</script>

<style lang="scss">
@import '../src/assets/main.scss';

.VF-list {
  // Styling for the container of Variable Font (VF) settings
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 4px;

  .VF-item {
    // Styling for each Variable Font (VF) setting item
    width: 100%;
    display: flex;
    align-items: baseline;

    span {
      // Styling for the tag of the VF setting
      width: 40px;
    }

    .VF-input {
      // Styling for the input field of the VF setting
      width: 40px;
      @include Font-Mono; // Include a monospaced font style
      @include inputFormat; // Include a common input field styling
    }
  }
}
</style>
