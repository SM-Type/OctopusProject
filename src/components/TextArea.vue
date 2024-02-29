<script setup>
import { ref, watch } from 'vue'

const font = ref(null)

watch(
  () => font.value,
  (newFont) => {
    // Do something when the font changes
    console.log('Nowy font:', newFont)
  }
)
</script>

<template>
  
  <div class="column-text-area" :style="{ fontFamily: font ? font.names.fullName.en : 'initial' }">
    <textarea :id="'p-' + rowIndex + '-c' + columnIndex">AaBbCcDd</textarea>
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
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/main.scss';

.column-text-area {
  width: 100%;
  height: calc(100% - 36px);
  // ::selection {
  //   // color: $Akcent-basic;
  //   background-color: $Akcent-basic; // $Akcent-op_07
  // }
  textarea {
    width: 100%;
    height: 100%; /* Ustaw odpowiednią maksymalną wysokość */
    resize: none;
    font-size: 64px;
  }
}
</style>
