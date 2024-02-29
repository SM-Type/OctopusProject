<script setup>
import FeaturesData from '@/components/FeaturesData.vue'

// ICONS
import IconAdd from '@/components/icons/Icon-M-Add_Circle.vue'
import IconHardWrap from '@/components/icons/Icon-M-HardWrap.vue'
</script>

<template>
  <!-- <h1>Hello World</h1> -->
  <div class="btn-nav">
    <IconAdd />
    <span for="">Import .txt</span>
  </div>

  <div class="btn-nav">
    <IconAdd />
    <span for="">Use font</span>
  </div>

  <div class="btn-nav">
    <IconHardWrap />
    <span for="">Hard wrap</span>
  </div>
  <FeaturesData />
</template>

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

  // svg {
  //   g {
  //     path {
  //       fill: red;
  //     }
  //   }
  // }

  &:hover {
    background-color: $Black-op_07;
    border: 1px solid $Black-op_07;
  }
  @include activeBtn;

  span {
    @include Font-P;
  }
}
</style>
