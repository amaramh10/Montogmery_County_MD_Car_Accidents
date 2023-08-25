// Create a map
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM() // OpenStreetMap as the base layer
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-77.25183283, 39.15403667]),
    zoom: 15
  })
});

// Fetch data for geomap graph
d3.json('/geomap').then(data => {
  console.log(data);
  var vectorSource = new ol.source.Vector();

  // Create a marker using the createMarker function
  function createMarker(crash) {
    var marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([crash.Longitude, crash.Latitude])
      )
    });

    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      })
    });

    marker.setStyle(iconStyle);

    // Add click event listener to each marker
    marker.on('click', function () {
      console.log('Marker clicked!', crash);
      // Update the markerInfo element with the crash data
      var markerInfo = document.getElementById('markerInfo');
      markerInfo.innerHTML = `
        <h2>Marker Information</h2>
        <p>Report Number: ${crash["Report Number"]}</p>
        <p>Report Type: ${crash["Report Type"]}</p>
        <p>Date & Time: ${crash["Date & Time"]}</p>
        <p>Weather: ${crash["Weather"]}</p>
        <p>Light: ${crash["Light"]}</p>
        <p>Latitude: ${crash["Latitude"]}</p>
        <p>Longitude: ${crash["Longitude"]}</p>
        <p>Vehicle Report Number: ${crash["Vehicle Report Number"]}</p>
        <p>Vehicle ID: ${crash["Vehicle_ID"]}</p>
        <p>Vehicle Damage: ${crash["Vehicle Damage"]}</p>
        <p>Body Type: ${crash["Body Type"]}</p>
        <p>Year: ${crash["Year"]}</p>
        <p>Make: ${crash["Make"]}</p>
        <p>Model: ${crash["Model"]}</p>
        <p>Driver Report Number: ${crash["Driver Report Number"]}</p>
        <p>Substance Abuse: ${crash["SubstanceAbuse"]}</p>
        <p>Person ID: ${crash["Person_ID"]}</p>
        <p>Injury Severity: ${crash["Injury Severity"]}</p>
      `;
    });

    return marker;
  }

  // Function to update map markers based on selected week
  function updateMapMarkers() {
    var dropdown = document.getElementById('weekDropdown');
    var selectedWeek = dropdown.value;

    // Clear existing markers
    vectorSource.clear();

    // Filter data for the selected week
    var selectedWeekData = data.filter(crash => {
      var crashDate = new Date(crash["Date & Time"]);
      var weekNumber = Math.ceil(crashDate.getDate() / 7);
      return selectedWeek === 'week' + weekNumber;
    });

    // Add markers for the selected week
    selectedWeekData.forEach(crash => {
      var marker = createMarker(crash);
      vectorSource.addFeature(marker);
    });
  }

  // Call the function initially to load markers for the first week
  updateMapMarkers();

  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  // Add click event listener to the map
  map.on('click', function () {
    var markerInfo = document.getElementById('markerInfo');
    markerInfo.innerHTML = '';
  });

  // Add the vector layer to the map
  map.addLayer(vectorLayer);
});
