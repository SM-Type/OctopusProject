<script setup></script>

<template>
  <div id="mangament-panel">
    <div id="MP-wrapper">
      <div id="MP-wrapper-FontSettings" class="MP-column">
        <!-- FontSize | Leading | Spacing | Language -->
        <div id="MP-wrapper-BasicSettings" class="MP-row">
          <h6>Settings</h6>
          <div class="MP-ContentValue">
            <div class="contetnt-settings-row">
              <IconFontSize />
              <input
                class="item item-settings-value"
                type="text"
                id="inputFontSize"
                v-model="formData.fontSize"
              />
            </div>
            <div class="contetnt-settings-row">
              <IconLeading />
              <input
                class="item item-settings-value"
                type="text"
                id="inputLeading"
                v-model="formData.leading"
              />
            </div>
            <div class="contetnt-settings-row">
              <IconSpacing />
              <input
                class="item item-settings-value"
                type="text"
                id="inputSpacing"
                v-model="formData.spacing"
              />
            </div>
            <div class="contetnt-settings-row">
              <IconLang />
              <input
                class="item item-settings-value"
                type="text"
                id="inputLanguage"
                v-model="formData.language"
              />
            </div>
          </div>
        </div>
        <!-- Use OpenType settings, eg. SS01, CALT ()...) -->
        <div id="MP-wrapper-OTSettings" class="MP-row">
          <h6>OT features</h6>
          <div class="MP-ContentValue">
            <OTComp />
          </div>
        </div>
      </div>
      <!-- Use VF axis -->
      <div id="MP-wrapper-VFaxis" class="MP-column">
        <div id="MP-VFContent" class="MP-row">
          <h6>VF axis</h6>
          <div class="MP-ContentValue">
            <VFComp />
          </div>
        </div>
      </div>
    </div>
  </div>

  <CloseSpace @click="closePanel" />
</template>

<script setup>
import CloseSpace from '@/components/CloseSpace.vue'
import VFComp from '@/components/Mangament-VF.vue'
import OTComp from '@/components/Mangament-OT.vue'

import { ref, getCurrentInstance, onUnmounted } from 'vue'

// Icons
import IconFontSize from '@/components/icons/Icon-C-FontSize.vue'
import IconLeading from '@/components/icons/Icon-C-Leading.vue'
import IconSpacing from '@/components/icons/Icon-C-Spacing.vue'
import IconLang from '@/components/icons/Icon-C-Language.vue'

const instance = getCurrentInstance()
const props = instance.props
const emit = instance.emit

// Dane pozostawione wewnątrz setup
const formData = ref({
  fontSize: '64px',
  leading: '100%',
  spacing: '0',
  language: 'en'
})

// Zmienna reaktywna również w setup
const managementPanelOpen = ref(false)

const closePanel = () => {
  // Emitujemy zdarzenie do rodzica (Column.vue) informujące o zamknięciu panelu
  emit('close-panel')
}

const closeManagementPanel = () => {
  managementPanelOpen.value = false
}

// Czyszczenie nasłuchiwania zdarzeń przy usuwaniu komponentu
onUnmounted(() => {
  // Pamiętaj, aby wyczyścić nasłuchiwanie zdarzeń lub inne zasoby
})
</script>

<script>
export default {
  emits: ['closePanel', 'close-panel'],
  components: {
    CloseSpace,
    VFComp,
    OTComp
  }
}
</script>

<style lang="scss">
@import '../src/assets/main.scss';

#mangament-panel {
  z-index: 2;
  // display: none; // Open & close

  width: auto;
  height: auto;
  background-color: $MAIN-White;
  position: absolute;
  top: 30px;
  border-radius: $MAIN-radius-normal;
  @include shadow-panel;

  #MP-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: flex-start;
    padding: 10px;

    .MP-column {
      width: 110px;
      height: fit-content;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: flex-start;
      padding: 10px;
      gap: 15px;

      .MP-row {
        display: flex;
        flex-direction: column;
        gap: 15px;

        h6 {
          width: 100%;
          height: auto;
          display: inherit;
        }
        .MP-ContentValue {
          display: inherit;
          flex-wrap: wrap;
          gap: 4px;

          .contetnt-settings-row {
            display: flex;
            align-items: center;
            gap: 20px;

            input{
              border: 1px solid $Black-op_07;
              background-color: $Black-op_04;
            }
          }

          .item {
            width: auto;
            height: auto;
            // background-color: aqua;

            padding: 8px 6px;
            border: 1px solid black;
            border-radius: $MAIN-radius-small;

            @include Font-P-mono;
          }
          .full-width {
            width: 100%;
          }
          .item-settings-value {
            width: 50px;
            background: none;
            border: 1px solid $Black-op_30;

            &:focus {
              outline: none;
              background: none;
              color: $Akcent-dark;
              border: 1px solid $Akcent-basic;
            }
          }
        }
      }
    }
  }
}
</style>
