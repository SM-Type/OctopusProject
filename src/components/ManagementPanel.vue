<!-- components/MangamentPanel.vue -->

<!-- 
  Purpose:
  This component is responsible for transforming basic font settings in a text column.

  Description:
  Management panel component with various settings for font, OpenType (OT) features, and Variable Font (VF) axis.

  HTML Structure:
  - Font settings column
    - Basic font settings: FontSize, Leading, Spacing, Language
    - OpenType settings column
  - Variable Font (VF) axis column
-->

<script setup>
// Importing required components and libraries
import CloseSpace from '@/components/CloseSpace.vue'
import VFComp from '@/components/Mangament-VF.vue'
import OTComp from '@/components/Mangament-OT.vue'
import { ref, getCurrentInstance, onUnmounted } from 'vue'
import IconFontSize from '@/components/icons/Icon-C-FontSize.vue'
import IconLeading from '@/components/icons/Icon-C-Leading.vue'
import IconSpacing from '@/components/icons/Icon-C-Spacing.vue'
import IconLang from '@/components/icons/Icon-C-Language.vue'

// Getting the current instance and required properties
const instance = getCurrentInstance()
const props = instance.props
const emit = instance.emit

// Reactive variable defined within setup
const formData = ref({
  fontSize: '64px',
  leading: '100%',
  spacing: '0',
  language: 'en'
})

// Reactive variable defined within setup
const managementPanelOpen = ref(false)

// Function to close the panel
const closePanel = () => {
  // Emitting an event to the parent (Column.vue) to inform about the panel closure
  emit('close-panel')
}

// Function to close the management panel
const closeManagementPanel = () => {
  managementPanelOpen.value = false
}

// Cleaning up event listeners when the component is unmounted
onUnmounted(() => {
  // Remember to clean up event listeners or other resources
})
</script>

<script>
export default {
  // Defining custom events for the component
  emits: ['closePanel', 'close-panel'],
  components: {
    CloseSpace,
    VFComp,
    OTComp
  }
}
</script>

<template>
  <!-- Management panel component with various settings -->
  <div id="mangament-panel">
    <div id="MP-wrapper">
      <!-- Font settings column -->
      <div id="MP-wrapper-FontSettings" class="MP-column">
        <div id="MP-wrapper-BasicSettings" class="MP-row">
          <!-- Basic font settings: FontSize, Leading, Spacing, Language -->
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
        <!-- OpenType settings column -->
        <div id="MP-wrapper-OTSettings" class="MP-row">
          <h6>OT features</h6>
          <div class="MP-ContentValue">
            <!-- Using the OTComp component for OpenType settings -->
            <OTComp />
          </div>
        </div>
      </div>
      <!-- Variable Font (VF) axis column -->
      <div id="MP-wrapper-VFaxis" class="MP-column">
        <div id="MP-VFContent" class="MP-row">
          <h6>VF axis</h6>
          <div class="MP-ContentValue">
            <!-- Using the VFComp component for Variable Font (VF) axis -->
            <VFComp />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- CloseSpace component to handle panel closure -->
  <CloseSpace @click="closePanel" />
</template>

<style lang="scss">
@import '../src/assets/main.scss';

#mangament-panel {
  // Styling for the management panel
  z-index: 2;
  width: auto;
  height: auto;
  background-color: $MAIN-White;
  position: absolute;
  top: 30px;
  border-radius: $MAIN-radius-normal;
  @include shadow-panel;

  #MP-wrapper {
    // Styling for the wrapper containing columns
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: flex-start;
    padding: 10px;

    .MP-column {
      // Styling for each column
      width: 110px;
      height: fit-content;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: flex-start;
      padding: 10px;
      gap: 15px;

      .MP-row {
        // Styling for each row within a column
        display: flex;
        flex-direction: column;
        gap: 15px;

        h6 {
          // Styling for heading within a row
          width: 100%;
          height: auto;
          display: inherit;
        }
        .MP-ContentValue {
          // Styling for content and values within a row
          display: inherit;
          flex-wrap: wrap;
          gap: 4px;

          .contetnt-settings-row {
            // Styling for each setting row
            display: flex;
            align-items: center;
            gap: 20px;

            input {
              // Styling for input elements
              border: 1px solid $Black-op_07;
              background-color: $Black-op_04;
            }
          }

          .item {
            // Styling for each item
            width: auto;
            height: auto;
            padding: 8px 6px;
            border: 1px solid black;
            border-radius: $MAIN-radius-small;
            @include Font-P-mono;
          }
          .full-width {
            // Styling for full-width items
            width: 100%;
          }
          .item-settings-value {
            // Styling for input items related to settings
            width: 50px;
            background: none;
            border: 1px solid $Black-op_30;

            &:focus {
              // Styling when the input is focused
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
