<!-- FontEditor.vue -->
<template>
  <!-- Input for selecting a font file and textarea to display text with the selected font -->
  <div>
    <input type="file" @change="handleFileChange" /> <!-- File input for selecting a font file -->
    <textarea v-model="text" :style="{ fontFamily: selectedFont }"></textarea> <!-- Textarea displaying text with the selected font -->
  </div>
</template>

<script>
import opentype from 'opentype.js'; // Import the opentype library for font parsing

export default {
  data() {
    return {
      text: 'AaBbCc...',         // Default text
      selectedFont: 'sans-serif', // Default font
    };
  },
  methods: {
    // Handle file change event when a font file is selected
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          const font = await this.loadFont(file); // Load the selected font
          this.applyFont(font);                   // Apply the selected font to the textarea
        } catch (error) {
          console.error(error);
        }
      }
    },
    // Load the font file asynchronously and return a promise
    loadFont(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Set up a callback when the file is loaded
        reader.onload = async (e) => {
          try {
            const font = opentype.parse(e.target.result); // Parse the font file
            resolve(font);
          } catch (error) {
            reject(error);
          }
        };

        // Read the font file as an ArrayBuffer
        reader.readAsArrayBuffer(file);
      });
    },
    // Apply the selected font to the textarea based on the loaded font
    applyFont(font) {
      const fontName = font.names.fullName.en || 'CustomFont'; // Use the font name if available, otherwise use 'CustomFont'
      this.selectedFont = `'${fontName}', sans-serif`;        // Set the selectedFont style for the textarea
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100px;
  font-size: 16px;
  padding: 10px;
}
</style>
