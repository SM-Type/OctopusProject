<!-- CloseSpace.vue -->
<template>
  <!-- Div element used as a clickable area to close a panel -->
  <div @click="closePanel" class="ManagementCloseSpace"></div>
</template>

<script>
export default {
  methods: {
    // Method to close the panel by emitting an event to the parent (ManagementPanel.vue)
    closePanel() {
      this.$emit('close-panel'); // Emit an event to notify the parent (ManagementPanel.vue) about panel closure
    }
  }
};
</script>

<style scoped lang="scss">
.ManagementCloseSpace {
  width: 100dvw;
  height: 100dvh;
  // background-color: rgba(0, 0, 0, .1); // Optional: Uncomment to add a semi-transparent overlay
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1; // Set the z-index to ensure the overlay is above other elements
}
</style>
