// Create a map
var map = L.map('map').setView([39.15403667, -77.25183283], 15);

// Add OpenStreetMap as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Fetch data for geomap graph
d3.json('/geomap').then(data => {
  var markers = []; // Array to hold all markers

  data.forEach(crash => {
    var marker = L.marker([crash.Latitude, crash.Longitude]);
    
    marker.bindPopup(`
      <h2>Marker Information</h2>
      <p>Report Type: ${crash["Report Type"]}</p>
      <p>Date & Time: ${crash["Date & Time"]}</p>
      <p>Weather: ${crash["Weather"]}</p>
      <p>Light: ${crash["Light"]}</p>
      <p>Vehicle Damage: ${crash["Vehicle Damage"]}</p>
      <p>Year: ${crash["Year"]}</p>
      <p>Make: ${crash["Make"]}</p>
      <p>Model: ${crash["Model"]}</p>
      <p>Substance Abuse: ${crash["SubstanceAbuse"]}</p>
      <p>Injury Severity: ${crash["Injury Severity"]}</p>
    `);

    markers.push(marker); // Add marker to the array
  });

  // Create a layer group for all markers
  var markerLayer = L.layerGroup(markers).addTo(map);

  // Dropdown event listener
  var weekDropdown = document.getElementById('weekDropdown');
  weekDropdown.addEventListener('change', function () {
    var selectedWeek = parseInt(weekDropdown.value);
    updateMapMarkers(selectedWeek);
  });

  // Function to update markers based on selected week
  function updateMapMarkers(selectedWeek) {
    markerLayer.clearLayers(); // Clear existing markers

    data.forEach(crash => {
      var week = getWeekNumber(new Date(crash["Date & Time"]));
      if (week === selectedWeek) {
        markerLayer.addLayer(markers[crash.index]);
      }
    });
  }

  // Function to get week number
  function getWeekNumber(date) {
    var oneJan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
  }
});