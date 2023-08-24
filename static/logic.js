// Create a map
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM() // OpenStreetMap as the base layer
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-77.25183283, 39.15403667]), // Coordinates (longitude, latitude)
    zoom: 15 // Zoom level
  })
});

// fetch data for geomap graph
d3.json('/geomap').then(data => {
  console.log(data);
  var vectorSource = new ol.source.Vector(); // Create the vector source outside the loop

  data.forEach(crash => {
      var marker = new ol.Feature({
          geometry: new ol.geom.Point(
              ol.proj.fromLonLat([crash.Longitude, crash.Latitude])
          )
      });

      var iconStyle = new ol.style.Style({
          image: new ol.style.Icon({
              src: 'https://openlayers.org/en/latest/examples/data/icon.png' // URL to the marker icon
          })
      });

      marker.setStyle(iconStyle);
      vectorSource.addFeature(marker); // Add the marker to the vector source

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
  });

  var vectorLayer = new ol.layer.Vector({
      source: vectorSource
  });

  // Add click event listener to the map
  map.on('click', function () {
      var markerInfo = document.getElementById('markerInfo');
      markerInfo.innerHTML = ''; // Clear the content
  });

  // Add the vector layer to the map
  map.addLayer(vectorLayer);
});
