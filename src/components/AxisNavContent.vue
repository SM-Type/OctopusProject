<!-- components/AxisNavContent.vue -->
<script setup>
import ColumnSetting from '@/components/ColumnSetting.vue'
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const fvarTags = ref([])

// Reakcja na zmiany w store/Features-tags.js
watchEffect(() => {
  fvarTags.value = store.getters.getVFData
})

// Pobieranie wartości domyślnych dla osi VF
const defaultAxesData = ref([]);
watchEffect(() => {
  defaultAxesData.value = store.getters.getDefaultAxesData;
});
</script>

<template>
  <div>
    <nav>
      <ColumnSetting />
      <slot name="content"></slot>
      <div class="axis-nav">
        {{ fvarTags.join(', ') }}
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/main.scss';

nav {
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  p {
    @include Font-Mono;
  }
}

.axis-nav {
  @include Font-Mono;
}
</style>
