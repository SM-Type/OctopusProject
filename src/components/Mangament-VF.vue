<script setup>
// import ManagementPanel from '@/components/ManagementPanel.vue'
</script>

<template>
  <div class="VF-list">
    <div v-for="item in compAData" :key="item" class="VF-item">
      <span>{{ item }}</span>
      <input type="text" name="name" id="" class="VF-input" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      compAData: []
    }
  },
  mounted() {
    this.compAData = this.$store.getters['getCompAData']
    this.$store.dispatch('fetchData')
  }
}
</script>

<style lang="scss">
@import '../src/assets/main.scss';

.VF-list {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 4px;
  .VF-item {
    width: 100%;
    display: flex;
    align-items: baseline;
    span {
      width: 40px;
    }
    .VF-input {
      width: 40px;
      @include Font-Mono;
      @include inputFormat;
    }
  }
}
</style>
