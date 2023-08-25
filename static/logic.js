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

d3.json('/bubble').then(item => {
  console.log(item);
  var dom = document.getElementById('chart-container');
  var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
  });
  var app = {};

  var option;

  // prettier-ignore
  const hours = [
      '12a', '1a', '2a', '3a', '4a', '5a', '6a',
      '7a', '8a', '9a', '10a', '11a',
      '12p', '1p', '2p', '3p', '4p', '5p',
      '6p', '7p', '8p', '9p', '10p', '11p'
  ];
  // prettier-ignore
  const days = [
      'Saturday', 'Friday', 'Thursday',
      'Wednesday', 'Tuesday', 'Monday', 'Sunday'
  ];
  // prettier-ignore
  const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
  const title = [];
  const singleAxis = [];
  const series = [];
  days.forEach(function (day, idx) {
    title.push({
      textBaseline: 'middle',
      top: ((idx + 0.5) * 100) / 7 + '%',
      text: day
    });
    singleAxis.push({
      left: 150,
      type: 'category',
      boundaryGap: false,
      data: hours,
      top: (idx * 100) / 7 + 5 + '%',
      height: 100 / 7 - 10 + '%',
      axisLabel: {
        interval: 2
      }
    });
    series.push({
      singleAxisIndex: idx,
      coordinateSystem: 'singleAxis',
      type: 'scatter',
      data: [],
      symbolSize: function (dataItem) {
        return dataItem[1] * 4;
      }
    });
  });
  data.forEach(function (dataItem) {
    series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
  });
  option = {
    tooltip: {
      position: 'top'
    },
    title: title,
    singleAxis: singleAxis,
    series: series
  };

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
});