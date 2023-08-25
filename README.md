# Car_Accident_Areas
## Project Proposal: Interactive Car Crash Map
### Created by:
#### Amary Henry, Brandon Loredo, Christina LaManna, Kady Epley

### Project Overview:
#### We propose to develop an interactive web-based map that visualizes and analyzes car crash data in Montgomery County, Maryland, for July 2023. This map will allow users to explore car crash incidents across different hours of the day by dragging a cursor across the timeline. By providing insights into the frequency, locations, timing, and types of car crashes, the map aims to raise public awareness, enhance road safety measures, and facilitate data-informed decisions.

### Project Features:
#### Time Slider Navigation: The map will feature a timeline slider that users can drag to explore car crash incidents throughout a specific month. The slider will allow users to select different time intervals, such as one-hour periods (e.g., 1-2 pm, 2-3 pm), enabling them to analyze crash patterns during specific times of the day.

#### Spatial Visualization: Car crash incidents will be displayed on the map using icons or markers. Each marker's color or icon will represent the crash severity or type, such as injury crashes, PDO (Property Damage Option) crashes, and others. Users can click on markers to access detailed information about each crash.

#### Hourly Breakdown: The timeline slider will provide a visual breakdown of car crashes during different hours of the day. As users drag the cursor across the timeline, the map will update to display crash incidents for the selected time interval.

#### Filter and Search: Users can filter and search for specific types of crashes, locations, or other criteria to focus on relevant data. This feature enhances user interaction and customization of the displayed information.

#### Statistical Insights: The map may include statistical visualizations, such as graphs or charts, that highlight trends and patterns in car crash data over the selected month. This will provide users with additional insights for analysis.

### Data Source:
#### The car crash data will be sourced from the "Crash Reporting - Incidents Data" dataset provided by Montgomery County, Maryland. This dataset contains detailed information about each reported car crash, including date, time, location, crash type, road conditions, and more. The dataset will be used to populate the interactive map.
##### https://data.montgomerycountymd.gov/api/views/mmzv-x632/rows.json?accessType=DOWNLOAD

### Technology Stack:
#### HTML, CSS, and JavaScript for the frontend interface and user interaction.
#### Data visualization libraries for presenting statistical insights.
##### Libraries:
###### Leaflet: will be utilized for creating interactive maps and markers.
###### CesiumJS (3d, 2, 2.5d Columbus View): will be used to show topographical and hot spots of accidents. 
#### Other Visualization: ECharts.apache.org (https://echarts.apache.org/examples/en/editor.html?c=scatter-single-axis)
##### Will be used to visualize the hourly accidents per hour each day of the week. 

### Expected Impact:
#### This interactive car crash map will serve as a valuable resource for both the general public and local authorities. It will promote road safety awareness, inform drivers about high-risk areas and times, and facilitate data-driven decision-making by local law enforcement and traffic management authorities. By providing real-time insights into car crash incidents, the map aims to contribute to reducing car crashes and improving overall road safety in Montgomery County.

### Project Sketch:
#### https://docs.google.com/presentation/d/1plQUg4QxmbayZzDaNsiQUsu9HhABVuRDmgMfZhST9PQ/edit#slide=id.p

### Conclusion:
#### The proposed interactive car crash map will provide a user-friendly platform for visualizing and understanding car crash data in Montgomery County. By leveraging real-time data and advanced visualization techniques, this map aims to raise awareness, enhance road safety, and contribute to informed decision-making in the community.


leaflet works but slow
// Create a map
var map = L.map('map').setView([39.15403667, -77.25183283], 15);

// Add OpenStreetMap as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Fetch data for geomap graph
d3.json('/geomap').then(data => {
  data.forEach(crash => {
    var marker = L.marker([crash.Latitude, crash.Longitude]).addTo(map);

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
  });
});


this is the vector one
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

