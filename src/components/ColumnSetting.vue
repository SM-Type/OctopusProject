<!-- components/ColumnSetting.vue -->
<script setup>
import Management from '@/components/ManagementPanel.vue'  // Import the ManagementPanel component

// ICONS
import Global from '@/components/icons/Icon-C-Language.vue'  // Import the Icon-C-Language component
</script>

<template>
  <!-- Main button triggering the Management Panel -->
  <div id="button-ManagementPanel" @click="toggleManagementPanel">
    <Global /> <!-- Display the Global icon -->
  </div>

  <!-- Management Panel -->
  <Management v-if="managementPanelOpen" @close-panel="closeManagementPanel" /> <!-- Display the Management Panel when managementPanelOpen is true -->
</template>

<script>
export default {
  components: {
    Management  // Register the Management component for use
  },
  data() {
    return {
      managementPanelOpen: false  // Track the state of the Management Panel (open or closed)
    }
  },
  methods: {
    // Toggle the Management Panel's visibility
    toggleManagementPanel() {
      this.managementPanelOpen = !this.managementPanelOpen;
    },
    // Close the Management Panel
    closeManagementPanel() {
      this.managementPanelOpen = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/main.scss';

#button-ManagementPanel {
  width: 20px;
  height: 20px;
  // background-color: black; // Optional background color styling
  z-index: 0;  // Set the z-index to control the stacking order of elements
}
</style>
