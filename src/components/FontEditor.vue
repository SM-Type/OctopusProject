<template>
    <div>
      <input type="file" @change="handleFileChange" />
      <textarea v-model="text" :style="{ fontFamily: selectedFont }"></textarea>
    </div>
  </template>
  
  <script>
  import opentype from 'opentype.js';
  
  export default {
    data() {
      return {
        text: 'AaBbCc...',
        selectedFont: 'sans-serif', // Default font
      };
    },
    methods: {
      async handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          try {
            const font = await this.loadFont(file);
            this.applyFont(font);
          } catch (error) {
            console.error(error);
          }
        }
      },
      loadFont(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
  
          reader.onload = async (e) => {
            try {
              const font = opentype.parse(e.target.result);
              resolve(font);
            } catch (error) {
              reject(error);
            }
          };
  
          reader.readAsArrayBuffer(file);
        });
      },
      applyFont(font) {
        const fontName = font.names.fullName.en || 'CustomFont';
        this.selectedFont = `'${fontName}', sans-serif`;
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
  