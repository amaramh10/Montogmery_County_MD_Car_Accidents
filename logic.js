// logic.js

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
  
  // Add markers
  const carAccidents = [
    { latitude: 39.15403667, longitude: -77.25183283 },
    // Add more accidents as needed
  ];
  
  carAccidents.forEach(accident => {
    var marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([accident.longitude, accident.latitude])
      )
    });
    
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png' // URL to the marker icon
      })
    });
  
    marker.setStyle(iconStyle);
    
    var vectorSource = new ol.source.Vector({
      features: [marker]
    });
  
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
  
    map.addLayer(vectorLayer);
  });