<template>
  <div>
    <button @click="exportToJson">Eksportuj do JSON</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sampleData: {
        name: "Font name",
        type: "VariableFont",
      },
    };
  },
  methods: {
    exportToJson() {
      // Konwertuj dane do formatu JSON
      const jsonData = JSON.stringify(this.sampleData, null, 2);

      // Utwórz element a i ustaw atrybuty potrzebne do eksportu pliku JSON
      const a = document.createElement("a");
      const file = new Blob([jsonData], { type: "application/json" });
      a.href = URL.createObjectURL(file);
      a.download = "exported_data.json";

      // Dodaj element do DOM i symuluj kliknięcie
      document.body.appendChild(a);
      a.click();

      // Usuń element z DOM
      document.body.removeChild(a);
    },
  },
};
</script>
