<script setup>
import ColumnSetting from '@/components/ColumnSetting.vue'
</script>

<template>
  <div>
    <nav>
      <ColumnSetting />
      <slot name="content"></slot>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    updateAxisContent: Array
  },
  data() {
    return {
      axisNavContent: 'VF axis or file name'
    }
  },
  mounted() {
    // Zmiana treści przy użyciu Vue.js
    this.changeContentForAxisNavElements()
  },
  watch: {
    updateAxisContent(newData) {
      this.axisNavContent = newData.join(', ')
      this.changeContentForAxisNavElements()
    }
  },
  methods: {
    changeContentForAxisNavElements() {
      // Zmiana treści dla elementów o klasie ".axis-nav"
      const axisNavElements = document.querySelectorAll('.axis-nav')
      axisNavElements.forEach((element) => {
        element.innerHTML = this.axisNavContent
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/main.scss';

nav {
  width: 100%;
  height: 36px;
  // background-color: red;
  display: flex;
  flex-direction: row;
  gap: 10px;
  p {
    @include Font-Mono;
  }
}
</style>
