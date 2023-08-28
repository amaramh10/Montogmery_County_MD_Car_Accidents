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

// Fetch data for bubble chart
// Fetch data for bubble chart
d3.json('/bubble').then(scatterData => {
  console.log(scatterData);

  var dom = document.getElementById('chart-container');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};
  var option;

  const hours = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p',
    
  ];

  const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
  ];

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
  });

  // Create an array to hold the aggregated data for each hour of the day
  const aggregatedData = Array.from({ length: 24 }, () => Array.from({ length: 7 }, () => 0));

  // Aggregate the data based on day and hour
  scatterData.forEach(dataItem => {
    const dayIndex = parseInt(dataItem[0]);
    const hourIndex = parseInt(dataItem[1]);
    const count = parseInt(dataItem[2]);
    aggregatedData[hourIndex][dayIndex] += count;
  });

  // Map the aggregated data to the scatter plot
  days.forEach(function (day, dayIndex) {
    hours.forEach(function (hour, hourIndex) {
      series.push({
        singleAxisIndex: dayIndex,
        coordinateSystem: 'singleAxis',
        type: 'scatter',
        data: [[hourIndex, aggregatedData[hourIndex][dayIndex]]],
        symbolSize: function (dataItem) {
          return dataItem[1] * 4;
        }
      });
    });
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



// Fetch data for line chart
Promise.all([
  d3.json('/week_one'),
  d3.json('/week_two'),
  d3.json('/week_three'),
  d3.json('/week_four')
]).then(data => {
  const weekOneData = data[0];
  const weekTwoData = data[1];
  const weekThreeData = data[2];
  const weekFourData = data[3];

  console.log(weekOneData, weekTwoData, weekThreeData, weekFourData);

  var dom = document.getElementById('linechart-container');
  var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  var app = {};
  var option;

  option = {
    title: {
      text: 'Accidents Per Day'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: weekOneData.map(item => {
        const date = new Date(item.date_only);
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayOfWeek[date.getDay()];
      }),
      axisLabel: {
        formatter: '{value}'
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Week 1',
        type: 'line',
        data: weekOneData.map(item => item.accident_count)
      },
      {
        name: 'Week 2',
        type: 'line',
        data: weekTwoData.map(item => item.accident_count)
      },
      {
        name: 'Week 3',
        type: 'line',
        data: weekThreeData.map(item => item.accident_count)
      },
      {
        name: 'Week 4',
        type: 'line',
        data: weekFourData.map(item => item.accident_count)
      }
    ]
  };

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
});

