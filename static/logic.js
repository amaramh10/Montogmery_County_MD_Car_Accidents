// Define a function to initialize the map and markers
function initializeMap() {
  // Create a map
  var map = L.map('map').setView([39.15403667, -77.25183283], 15);

  // Add OpenStreetMap as the base layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Fetch data for geomap graph
  d3.json('/optimized_geomap').then(data => {
    var markers = []; // Array to hold all markers

    data.forEach(crash => {
      var marker = L.marker([crash.Latitude, crash.Longitude]);

      marker.bindPopup(`
        <h2>Marker Information</h2>
        <p>Date & Time: ${crash["Date & Time"]}</p>
        <p>Weather: ${crash["Weather"]}</p>
        <p>Vehicle Damage: ${crash["Vehicle Damage"]}</p>
        <p>Year: ${crash["Year"]}</p>
        <p>Make: ${crash["Make"]}</p>
        <p>Model: ${crash["Model"]}</p>
        <p>Substance Abuse: ${crash["Substance Abuse"]}</p>
        <p>Injury Severity: ${crash["Injury Severity"]}</p>
      `);

      markers.push({
        marker: marker, // Store the marker object
        
      });
    });

    // Create a layer group for all markers
    var markerLayer = L.layerGroup(markers.map(crash => crash.marker)).addTo(map);

    
    
  });
}

// Call the initializeMap function when the page loads
document.addEventListener('DOMContentLoaded', initializeMap);

// Function to update markers based on selected week
function updateMapMarkers(selectedWeek, markers, markerLayer) {
  markerLayer.clearLayers(); // Clear existing markers

  markers.forEach(crash => {
    if (crash.week === selectedWeek) {
      markerLayer.addLayer(crash.marker); // Use the marker object directly
    }
  });
}
