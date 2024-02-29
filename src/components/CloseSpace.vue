<!-- CloseSpace.vue -->
<template>
  <div @click="closePanel" class="ManagementColoseSpace"></div>
</template>

<script>
export default {
  methods: {
    closePanel() {
      // Emitujemy zdarzenie do rodzica (ManagementPanel.vue) informujące o zamknięciu panelu
      this.$emit('close-panel');
    }
  }
};
</script>

<style scoped lang="scss">
.ManagementColoseSpace {
  width: 100dvw;
  height: 100dvh;
  // background-color: rgba(0, 0, 0, .1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
