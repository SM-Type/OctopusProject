<script setup>
// import ManagementPanel from '@/components/ManagementPanel.vue'
</script>

<template>
  <div class="OT-list">
    <div v-for="item in OTData" :key="item" class="OT-item "> 
      <!-- enable -->
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      OTData: []
    }
  },
  mounted() {
    this.OTData = this.$store.getters['getOTData']
    this.$store.dispatch('fetchOTData')
  }
} 
</script>

<style lang="scss">
@import '../src/assets/main.scss';

.OT-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 4px 6px;
  
  .OT-item {
    width: auto;
    height: auto;
    display: flex;
    padding: 6px 8px;

    // background-color: $Black-op-04;
    background-color: $Color-red-op;
    border: 1px solid $Black-op-14;
    border-radius: $MAIN-radius-small;

    &:active{
        background-color: $Color-green-op;
    }
    
    span {
      width: auto;
    }
    
  }
  .enable{
    color: $Black-basic;
    background-color: $Color-green-op;
    &:active{
      background-color: $Color-red-op;
    }
  }
}
</style>
