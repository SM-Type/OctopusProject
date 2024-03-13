<!-- component/Head_panel.vue -->
<script setup>
import FeaturesData from '@/components/FeaturesData.vue'  // Import the FeaturesData component

// ICONS
import IconAdd from '@/components/icons/Icon-M-Add_Circle.vue'   // Import the IconAdd component
import IconHardWrap from '@/components/icons/Icon-M-HardWrap.vue'  // Import the IconHardWrap component
</script>

<template>
  <!-- Head panel component containing buttons and the FeaturesData component -->
  <div class="btn-nav">
    <IconAdd />  <!-- Button with IconAdd component -->
    <span for="">Import .txt</span>  <!-- Text label for importing .txt files -->
  </div>
  
  <FeaturesData />  <!-- FeaturesData component for additional functionality -->

  <div class="btn-nav">
    <IconHardWrap />  <!-- Button with IconHardWrap component -->
    <span for="">Hard wrap</span>  <!-- Text label for hard wrapping -->
  </div>
  
</template>

<script>
export default {
  components: {
    IconAdd,
    IconHardWrap,
    FeaturesData,
  }
}
</script>

<style scoped lang="scss">
@import '../assets/main.scss';

.btn-nav {
  height: fit-content;
  background-color: $Black-op_04;
  border: 1px solid $Black-op_04;
  padding: 6px 10px;
  border-radius: $MAIN-radius-small;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: $Black-op_07;
    border: 1px solid $Black-op_07;
  }
  @include activeBtn;

  span {
    @include Font-P;  // Apply styling for the text label
  }
}
</style>
