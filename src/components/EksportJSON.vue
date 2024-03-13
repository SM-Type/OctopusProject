<!-- components/ExportJSON.vue -->
<!--
  Experimental Component for JSON Export

  This component was created for experimentation with creating and exporting JSON files.
  The purpose is to explore the process of exporting program settings as a JSON file, 
  allowing users to save configurations and share them with others.

  The component includes a sampleData object with predefined values. When the "Eksportuj JSON" 
  button is clicked, the sampleData is converted to JSON format, and a downloadable JSON file is created.

  Note: This is a test component and may not be integrated into the main application functionality.
-->
<template>
  <div>
    <button @click="exportToJson">Eksportuj JSON</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Sample data to be exported as JSON
      sampleData: {
        name: 'Font name',
        type: 'VariableFont',
        test: 'test'
      }
    }
  },
  methods: {
    // Method to export sampleData to a JSON file
    exportToJson() {
      // Convert data to JSON format
      const jsonData = JSON.stringify(this.sampleData, null, 2)

      // Create an 'a' element with attributes for JSON file export
      const a = document.createElement('a')
      const file = new Blob([jsonData], { type: 'application/json' })
      a.href = URL.createObjectURL(file)
      a.download = 'exported_data.json'

      // Add the element to the DOM and simulate a click
      document.body.appendChild(a)
      a.click()

      // Remove the element from the DOM
      document.body.removeChild(a)
    }
  }
}
</script>
