<!-- components/DashboardComponent.vue -->

<!-- 
  Purpose:
  This component is intended to display a table with user settings in the Dashboard Panel.

  Description:
  Currently, the component is placeholder content for the Dashboard Panel. 
  It includes a title and a message indicating that the content is under process.
-->

<template>
  <!-- Container for the Dashboard Panel content -->
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
    // Method to emit an event signaling to show the dashboard
    showDashboard() {
      this.$emit('show-dashboard');
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/main.scss';

#content-DashboardPanel {
  width: 100dvw;
  height: calc(100dvh - 50px);
  background-color: $White-basic; // Set the background color to a variable value ($White-basic or $Black-basic)
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;  // Set the z-index to ensure the Dashboard Panel is on top of other elements
  .wrapp {
    width: max-content;
    height: max-content;
    padding: 40px;
    h3 {
      color: $Color-red;  // Set the color of h3 elements to a variable value ($Color-red)
    }
  }
}
</style>
