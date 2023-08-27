// Function to get week number
function getWeekNumber(dateString) {
  // Parse the date string in the format "M/D/YYYY H:mm"
  var parts = dateString.split(" ");
  var dateParts = parts[0].split("/");
  var timeParts = parts[1].split(":");
  
  var year = parseInt(dateParts[2], 10);
  var month = parseInt(dateParts[0], 10) - 1; // Months are 0-indexed
  var day = parseInt(dateParts[1], 10);
  var hour = parseInt(timeParts[0], 10);
  
  var date = new Date(year, month, day, hour);

  // Define the start date of the first week (e.g., July 1)
  var firstWeekStartDate = new Date(year, 6, 1);

  // Calculate the number of days between the given date and the start of the first week
  var daysDifference = Math.floor((date - firstWeekStartDate) / (24 * 60 * 60 * 1000));

  // Calculate the week number based on the number of days
  var weekNumber = Math.ceil((daysDifference + 1) / 7);

  return weekNumber;
}

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
        week: getWeekNumber(crash["Date & Time"])
      });
    });

    // Create a layer group for all markers
    var markerLayer = L.layerGroup(markers.map(crash => crash.marker)).addTo(map);

    // Dropdown event listener
    var weekDropdown = document.getElementById('weekDropdown');
    weekDropdown.addEventListener('change', function () {
      var selectedWeek = parseInt(weekDropdown.value);
      updateMapMarkers(selectedWeek, markers, markerLayer);
    });
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
