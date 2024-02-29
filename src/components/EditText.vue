<template>
    <div>
      <article :style="{ fontFamily: font ? font.names.fullName.en : 'initial' }">
        <p :id="'p-' + rowIndex + '-c' + columnIndex">{{ sharedText }}</p>
      </article>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      rowIndex: {
        type: Number,
        required: true
      },
      columnIndex: {
        type: Number,
        required: true
      },
      fvarTags: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        font: this.fvarTags.length > 0 ? this.fvarTags[0].font : null,
        sharedText: "AaBbCcDd"
      };
    },
    watch: {
      sharedText(newValue) {
        // Aktualizacja tekstu w innych komponentach lub ramek
        this.$emit("update-shared-text", { rowIndex: this.rowIndex, columnIndex: this.columnIndex, text: newValue });
      }
    }
  };
  </script>
  