<!-- components/HW.vue -->
<!-- 
  Purpose:
  This component is designed for testing the functionality of HardWrap. 
  Currently, it works well in a separate window in the interface. 
  The goal is to integrate this code with the entire project.

  Description:
  Component for hard wrapping text with a user-defined number of characters per line.

  HTML Structure:
  - Input for setting the number of characters per line
  - Input area for entering text
  - Display the wrapped text with each line in a paragraph
-->
<template>
  <!-- Component for hard wrapping text with user-defined characters per line -->
  <div>
    <!-- Input for setting the number of characters per line -->
    <label for="charactersPerLine">Characters per line:</label>
    <input
      type="number"
      v-model="charactersPerLine"
      id="charactersPerLine"
      @input="updateWrappedText"
    />

    <!-- Input area for entering text -->
    <label for="inputText">Text:</label>
    <textarea v-model="inputText" id="inputText" @input="updateWrappedText"></textarea>

    <!-- Display the wrapped text with each line in a paragraph -->
    <div id="wrappedText">
      <p v-for="(line, index) in wrappedLines" :key="index">{{ line }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      charactersPerLine: 10, // Default number of characters per line
      inputText: 'HardWrap!', // Default input text
      wrappedLines: ['HardWrap!'] // Default wrapped lines
    }
  },
  methods: {
    // Update the wrapped text when input changes
    updateWrappedText() {
      this.wrappedLines = this.splitTextIntoLines(this.inputText, this.charactersPerLine)
    },
    // Split text into lines based on the specified characters per line
    splitTextIntoLines(text, charactersPerLine) {
      const lines = []
      let currentLine = ''

      for (const char of text) {
        if (currentLine.length < charactersPerLine) {
          currentLine += char
        } else {
          lines.push(currentLine)
          currentLine = char
        }
      }

      if (currentLine.length > 0) {
        lines.push(currentLine)
      }

      return lines
    }
  }
}
</script>

<style scoped lang="scss"></style>
