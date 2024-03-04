<!-- Mangament-VF.vue -->
<script setup>
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const VFData = ref([])

// Reakcja na zmiany w store/Features-tags.js
watchEffect(() => {
  VFData.value = store.getters.getDefaultAxesData
})
</script>

<template>
  <div>
    <div v-if="VFData.length > 0" class="VF-list">
      <div v-for="item in VFData" :key="item.tag" class="VF-item">
        <span>{{ item.tag }}</span>
        <input v-model="item.defaultValue" type="text" name="name" id="" class="VF-input" />
      </div>
    </div>
    <div v-else>
      <p>Empty axis value</p>
    </div>
  </div>
</template>

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
