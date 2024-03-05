<template>
  <div id="TEST">
    <h5>Comp. FontEditor</h5>
     <input type="file" @change="handleFileUpload" accept=".otf, .ttf, .woff">
     <div id="span">{{ nazwaPliku }}</div>
     <div id="testImpFont">The quick brown fox jumps over the lazy dog</div>
  </div>
</template>

<script>
export default {
   data() {
      return {
         nazwaPliku: '',
      };
   },
   methods: {
      handleFileUpload(event) {
         const fileInput = event.target;
         if (fileInput.files.length > 0) {
            const nazwa = fileInput.files[0].name;
            this.nazwaPliku = `File: ${nazwa}`;
            this.processFontFile(fileInput.files[0]);
         } else {
            this.nazwaPliku = '';
         }
      },
      processFontFile(file) {
         const reader = new FileReader();

         reader.onload = (event) => {
            const fontData = event.target.result;

            const customFont = new FontFace('CustomFont', fontData);
            customFont.load().then((loadedFont) => {
               document.fonts.add(loadedFont);
               this.applyCustomFont('CustomFont');
            });
         };

         reader.readAsArrayBuffer(file);
      },
      applyCustomFont(fontFamily) {
         const tekstDoPrzetestowania = document.getElementById('testImpFont');
         tekstDoPrzetestowania.style.fontFamily = fontFamily;
      },
   },
};
</script>

<style>
#TEST{
  position: fixed;
  left: 70px;
  bottom: 70px;
  display: flex;
  flex-direction: column;
    flex-wrap: nowrap;
  
  z-index: 9999999;
  padding: 40px;
  border: 1px solid red;
}
#span{
  color: #c0c0c0;;
}
#testImpFont{
  font-size: 42px;
}
</style>