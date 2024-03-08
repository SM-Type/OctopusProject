// hooks/useFeaturesData.js
import opentype from 'opentype.js';
import { useStore } from 'vuex';

export async function loadFontData(file) {
  try {
    const fontArrayBuffer = await file.arrayBuffer();
    return opentype.parse(fontArrayBuffer);
  } catch (err) {
    console.error('Error loading font:', err);
    throw err; // Rzucamy błąd, aby można go było obsłużyć w komponencie
  }
}

export function applyFontToTextArea(fontFamily) {
  const useFont = document.querySelectorAll('.textarea');
  useFont.forEach((e) => {
    e.style.fontFamily = fontFamily;
  });
}