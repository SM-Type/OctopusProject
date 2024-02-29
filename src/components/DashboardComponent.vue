<!-- CloseSpace.vue -->
<template>
  <div>
    <div id="content-DashboardPanel">
      <div class="wrapp">
        <h1>Dashboard Panel</h1>
      <h3>process...</h3>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showDashboard() {
      this.$emit('show-dashboard')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/main.scss';

#content-DashboardPanel {
  width: 100dvw;
  height: calc(100dvh - 50px);
  background-color: $White-basic; // $White-basic $Black-basic
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  .wrapp{
    width: max-content;
    height: max-content;
    padding: 40px;
    h3{
      color: $Color-red;
    }
  }
}
</style>
