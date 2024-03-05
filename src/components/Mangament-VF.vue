<!-- components/Mangament-VF.vue -->
<script setup>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

// Access the Vuex store
const store = useStore()

// Reactive variable to store VF (Variable Font) data
const VFData = ref([])

// React to changes in store/Features-tags.js
watchEffect(() => {
  VFData.value = store.getters.getDefaultAxesData
})
</script>

<template>
  <!-- Variable Font (VF) settings list component -->
  <div>
    <!-- Check if VFData has items -->
    <div v-if="VFData.length > 0" class="VF-list">
      <!-- Display each VF item with a tag and input for default value -->
      <div v-for="item in VFData" :key="item.tag" class="VF-item">
        <span>{{ item.tag }}</span>
        <input v-model="item.defaultValue" type="text" name="name" id="" class="VF-input" />
      </div>
    </div>
    <!-- Display a message if VFData is empty -->
    <div v-else>
      <p>Empty axis value</p>
    </div>
  </div>
</template>

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
