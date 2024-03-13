<!-- components/AxisNavContent.vue -->
<script setup>
import ColumnSetting from '@/components/ColumnSetting.vue'
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

// Access the Vuex store
const store = useStore()

// Reference to the font variation data (tag and default value)
const vfData = ref([])

// Reference to the default axes data
const defaultAxesData = ref([])

// Reference to the selected font name
const selectedFontName = ref(null);

// Watch for changes in VFData and update vfData
watchEffect(() => {
  vfData.value = store.getters.getVFData
    .filter(axis => axis.tag && axis.defaultValue)
    .map(axis => ({
      tag: axis.tag,
      defaultValue: axis.defaultValue
    }));
})

// Watch for changes in default axes data and selected font name
watchEffect(() => {
  defaultAxesData.value = store.getters.getDefaultAxesData
  selectedFontName.value = store.getters.getSelectedFontName;
})
</script>

<template>
  <div>
    <!-- Navigation section containing ColumnSetting component and a slot for content -->
    <nav>
      <ColumnSetting />
      <slot name="content"></slot>
      <!-- Display selected font name and font variation tags with default values -->
      <div class="axis-nav">
        <span v-if="vfData.length > 0">
          {{ vfData.map(axis => `${axis.tag}: ${axis.defaultValue}`).join(', ') }}
        </span>
        <span v-else>
          No Variable Font data available.
        </span>
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
    @include Font-Mono; // Apply the Font-Mono mixin to paragraphs within the navigation
  }
}

.axis-nav {
  @include Font-Mono; // Apply the Font-Mono mixin to the axis-nav class
}
</style>
