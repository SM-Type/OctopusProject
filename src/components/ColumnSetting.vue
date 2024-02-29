<script setup>
import Management from '@/components/ManagementPanel.vue'

// ICONS
import Global from '@/components/icons/Icon-C-Language.vue'
</script>

<template>
  <div id="button-MangamentPanel" @click="toggleManagementPanel">
    <Global/>
  </div>
  <!-- Mangament Panel -->
  <Management v-if="managementPanelOpen"  @close-panel="closeManagementPanel" />
</template>

<script>
export default {
  components: {
    Management
  }, 
  data() {
    return {
      managementPanelOpen: false
    }
  },
  methods: {
    toggleManagementPanel() {
      this.managementPanelOpen = !this.managementPanelOpen;
    },
    closeManagementPanel() {
      this.managementPanelOpen = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/main.scss';

#button-MangamentPanel {
  width: 20px;
  height: 20px;
  // background-color: black;
  z-index: 0;
}
</style>
