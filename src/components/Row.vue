<script setup>
  import Column from "@/components/Column.vue";
</script>

<template>
  <div :id="'row-' + rowIndex" class="row">
    <Column
      v-for="columnIndex in columnsCount"
      :key="columnIndex"
      :rowIndex="rowIndex"
      :columnIndex="columnIndex"
      :fvarTags="['tag1', 'tag2']"
      :charactersPerLine="charactersPerLine"
    />
  </div>
</template>

<script>
export default {
  props: {
    columnsCount: {
      type: Number,
      default: 3,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
  },
  components: {
    Column,
  },
  data() {
    return {
      charactersPerLine: 10, // Ustawia wartość ilości znaków
    };
  },
};
</script>

<style scoped lang="scss">
.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  align-items: stretch;
  gap: 10px;
}
</style>
