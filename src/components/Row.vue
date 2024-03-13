<!-- components/Row.vue -->
<script setup>
// Import the Column component to be used in this Row component
import Column from '@/components/Column.vue'
</script>

<template>
  <!-- Row component with a dynamic number of columns -->
  <div :id="'row-' + rowIndex" class="row">
    <!-- Generate columns based on the specified columnsCount -->
    <Column
      v-for="columnIndex in columnsCount"
      :key="columnIndex"
      :rowIndex="rowIndex"
      :columnIndex="columnIndex"
      :fvarTags="['']"
      :charactersPerLine="charactersPerLine"
    />
    <!-- :fvarTags="['']"                         Provide an empty array as font variation tags -->
    <!-- :charactersPerLine="charactersPerLine"   Pass the characters per line value -->
  </div>
</template>

<script>
export default {
  props: {
    columnsCount: {
      type: Number,
      // Default number of columns in the row
      default: 3
    },
    rowIndex: {
      type: Number,
      // Ensure a row index is provided as a required prop
      required: true
    }
  },
  components: {
    // Use the imported Column component in this Row component
    Column
  }
}
</script>

<style scoped lang="scss">
.row {
  // Styling for the row using CSS Grid for a responsive layout
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  align-items: stretch;
  // Set the gap between columns in the row
  gap: 10px;
}
</style>
