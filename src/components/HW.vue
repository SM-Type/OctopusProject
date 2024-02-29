<!-- HW.vue -->
<template>
    <div>
      <label for="charactersPerLine">Ilość znaków w wierszu:</label>
      <input type="number" v-model="charactersPerLine" id="charactersPerLine" @input="updateWrappedText">
  
      <label for="inputText">Tekst:</label>
      <textarea v-model="inputText" id="inputText" @input="updateWrappedText"></textarea>
  
      <div id="wrappedText">
        <p v-for="(line, index) in wrappedLines" :key="index">{{ line }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        charactersPerLine: 10,
        inputText: 'hello',
        wrappedLines: [],
      };
    },
    methods: {
      updateWrappedText() {
        this.wrappedLines = this.splitTextIntoLines(this.inputText, this.charactersPerLine);
      },
      splitTextIntoLines(text, charactersPerLine) {
        const lines = [];
        let currentLine = '';
  
        for (const char of text) {
          if (currentLine.length < charactersPerLine) {
            currentLine += char;
          } else {
            lines.push(currentLine);
            currentLine = char;
          }
        }
  
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }
  
        return lines;
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  </style>