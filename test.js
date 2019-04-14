    

/**
 * Calculates and displays a car route from the Brandenburg Gate in the centre of Berlin
 * to Friedrichstraße Railway Station.
 *
 * A full list of available request parameters can be found in the Routing API documentation.
 * see:  http://developer.here.com/rest-apis/documentation/routing/topics/resource-calculate-route.html
 *
 * @param   {H.service.Platform} platform    A stub class to access HERE services
 */



/**
 * Boilerplate map initialization code starts below:
 */

  function get_distances_per_lat_long(lat, long){
    return [111.32*10**3, 40075 *10**3 * Math.cos( lat ) / 360];
  }

var START = [41.789674, -87.738439];
var STOP = [41.973181, -87.858301];
var MID = [(START[0]+STOP[0])/2.0, (START[1]+STOP[1])/2.0];
var dists = get_distances_per_lat_long(START[0]-STOP[0], START[1]-STOP[1]);
var diff = [(START[0]-STOP[0])*dists[0], (START[1]-STOP[1])*dists[1]];
// console.log("DIFF IS", diff);
var RADIUS = Math.pow(diff[0]*diff[0] + diff[1]*diff[1], 0.5)/2;

// set up containers for the map  + panel
var mapContainer = document.getElementById('map'),
  routeInstructionsContainer = document.getElementById('panel');

//Step 1: initialize communication with the platform
var platform = new H.service.Platform({
  app_id: 'S7QrMFE4LRNbGJl7yh1K',
  app_code: 'ZLgBlQ6bOQG9H8Uh_4XOpQ',
  useHTTPS: true
});
var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});

//Step 2: initialize a map - this map is centered over Berlin
var map = new H.Map(mapContainer,
  defaultLayers.normal.map,{
  center: {lat:MID[0], lng:MID[1]},
  zoom: 13,
  pixelRatio: pixelRatio
});
// style={width: '100%', height: '400px', background: 'grey' };
//  var tiles = platform.getMapTileService({'type': 'base'});
//     var layer = tiles.createTileLayer(
//         'maptile',
//         'normal.night',
//         256,
//         'png',
//         {'style': style}
//     );
//     map.setBaseLayer(layer);



function httpGet(theUrl)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
      xmlHttp.send( null );
      return xmlHttp.responseText;
  }



function calculateRouteFromAtoB (platform, trans_port) {

  // var crime_data = JSON.parse('{    "features": [{        "properties": {            "iucr": "0910",            "compnos": "10556687",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1465646400000,            "type": "07",            "desc": "MOTOR VEHICLE THEFT>AUTOMOBILE"        },        "type": "Feature",        "_rev": "2-354fd55b0fb882d3cfdd2bfeabba6ece",        "_id": "10556687",        "geometry": {            "coordinates": [-87.662473, 41.898653],            "type": "Point"        }    }, {        "properties": {            "CDSNV": true,            "iucr": "0810",            "compnos": "10636503",            "source": "Chicago",            "timestamp": 1470951000000,            "type": "06",            "desc": "THEFT>OVER $500",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1471644001584        },        "geometry": {            "coordinates": [-87.66247, 41.898554],            "type": "Point"        },        "_rev": "1-bad991fc5d9f53221921a777ae170f56",        "_id": "Chicago10636503",        "type": "Feature"    }, {        "properties": {            "iucr": "0820",            "compnos": "10521892",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1463160600000,            "type": "06",            "desc": "THEFT>$500 AND UNDER"        },        "type": "Feature",        "_rev": "2-090912d1d7de54906453cbfafe4be8f0",        "_id": "10521892",        "geometry": {            "coordinates": [-87.662459, 41.898197],            "type": "Point"        }    }, {        "properties": {            "CDSNV": true,            "iucr": "1320",            "compnos": "10677554",            "source": "Chicago",            "timestamp": 1473501600000,            "type": "14",            "desc": "CRIMINAL DAMAGE>TO VEHICLE",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1474236001295        },        "geometry": {            "coordinates": [-87.662459, 41.898197],            "type": "Point"        },        "_rev": "1-fa1645ca67b0e61395084af40f27b334",        "_id": "Chicago10677554",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "0820",            "compnos": "10750170",            "source": "Chicago",            "timestamp": 1478872800000,            "type": "06",            "desc": "THEFT>$500 AND UNDER",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1479592801671        },        "geometry": {            "coordinates": [-87.662459, 41.898197],            "type": "Point"        },        "_rev": "1-fd2ed90a76d0ffc8f9bb563ae0a1737e",        "_id": "Chicago10750170",        "type": "Feature"    }, {        "properties": {            "CDSNV": false,            "iucr": "0486",            "compnos": "10667785",            "source": "Chicago",            "timestamp": 1472856300000,            "type": "08B",            "desc": "BATTERY>DOMESTIC BATTERY SIMPLE",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1473544801771        },        "geometry": {            "coordinates": [-87.663312, 41.898866],            "type": "Point"        },        "_rev": "1-d2b11d480bc9b16c472639ff7977d06d",        "_id": "Chicago10667785",        "type": "Feature"    }, {        "properties": {            "iucr": "0460",            "compnos": "10599412",            "source": "Chicago",            "timestamp": 1468614120000,            "type": "08B",            "desc": "BATTERY>SIMPLE",            "updated": 1469311201680        },        "geometry": {            "coordinates": [-87.662486, 41.899119],            "type": "Point"        },        "_rev": "1-fa7899efe9c41209da69bff2c2773675",        "_id": "Chicago10599412",        "type": "Feature"    }, {        "properties": {            "CDSNV": false,            "iucr": "0486",            "compnos": "10736159",            "source": "Chicago",            "timestamp": 1477873800000,            "type": "08B",            "desc": "BATTERY>DOMESTIC BATTERY SIMPLE",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1478642401295        },        "geometry": {            "coordinates": [-87.663363, 41.898866],            "type": "Point"        },        "_rev": "1-f94db1824a6fdadaa8d173fd817a4cbe",        "_id": "Chicago10736159",        "type": "Feature"    }, {        "properties": {            "iucr": "0910",            "compnos": "10555889",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1465324200000,            "type": "07",            "desc": "MOTOR VEHICLE THEFT>AUTOMOBILE"        },        "type": "Feature",        "_rev": "2-8b7e54d5faa31c4a11d1b8ac5942a45d",        "_id": "10555889",        "geometry": {            "coordinates": [-87.663414, 41.898867],            "type": "Point"        }    }, {        "properties": {            "CDSNV": true,            "iucr": "0820",            "compnos": "10722056",            "source": "Chicago",            "timestamp": 1476860400000,            "type": "06",            "desc": "THEFT>$500 AND UNDER",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1477605601139        },        "geometry": {            "coordinates": [-87.663436, 41.898864],            "type": "Point"        },        "_rev": "1-0136fc7e6c030ed3ecb582db75be6900",        "_id": "Chicago10722056",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "0810",            "compnos": "10849583",            "source": "Chicago",            "timestamp": 1487094600000,            "type": "06",            "desc": "THEFT>OVER $500",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1487800803832        },        "geometry": {            "coordinates": [-87.663436, 41.898864],            "type": "Point"        },        "_rev": "1-77dc2cc406cd32a687ace67887f931ad",        "_id": "Chicago10849583",        "type": "Feature"    }, {        "properties": {            "CDSNV": false,            "iucr": "5000",            "compnos": "10933030",            "source": "Chicago",            "timestamp": 1493667000000,            "type": "26",            "desc": "OTHER OFFENSE>OTHER CRIME AGAINST PERSON",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1494367201227        },        "geometry": {            "coordinates": [-87.663436, 41.898864],            "type": "Point"        },        "_rev": "1-9f4ec2a6b2ee41896248f002a5b1f54f",        "_id": "Chicago10933030",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "0910",            "compnos": "10621098",            "source": "Chicago",            "timestamp": 1469995200000,            "type": "07",            "desc": "MOTOR VEHICLE THEFT>AUTOMOBILE",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1470693601752        },        "geometry": {            "coordinates": [-87.663071, 41.897959],            "type": "Point"        },        "_rev": "1-589a3c6f2cf472613760668802ae3b1e",        "_id": "Chicago10621098",        "type": "Feature"    }, {        "properties": {            "iucr": "1310",            "compnos": "10510179",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1462374000000,            "type": "14",            "desc": "CRIMINAL DAMAGE>TO PROPERTY"        },        "type": "Feature",        "_rev": "2-0137c548610faa6e5001750becee773c",        "_id": "10510179",        "geometry": {            "coordinates": [-87.663093, 41.897959],            "type": "Point"        }    }, {        "properties": {            "iucr": "1310",            "compnos": "10531614",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1463935500000,            "type": "14",            "desc": "CRIMINAL DAMAGE>TO PROPERTY"        },        "type": "Feature",        "_rev": "2-38f18e1ab5c09ed101ea3014c13702b3",        "_id": "10531614",        "geometry": {            "coordinates": [-87.663093, 41.897959],            "type": "Point"        }    }, {        "properties": {            "CDSNV": true,            "iucr": "1320",            "compnos": "10721406",            "source": "Chicago",            "timestamp": 1476849000000,            "type": "14",            "desc": "CRIMINAL DAMAGE>TO VEHICLE",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1477605601136        },        "geometry": {            "coordinates": [-87.663093, 41.897959],            "type": "Point"        },        "_rev": "1-9d8bbdeb71515d437b234a8ecbfb39cc",        "_id": "Chicago10721406",        "type": "Feature"    }, {        "properties": {            "iucr": "1320",            "compnos": "10508706",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1462326000000,            "type": "14",            "desc": "CRIMINAL DAMAGE>TO VEHICLE"        },        "type": "Feature",        "_rev": "2-cb4501c60083b9d46562415b396b9a05",        "_id": "10508706",        "geometry": {            "coordinates": [-87.663119, 41.897959],            "type": "Point"        }    }, {        "properties": {            "CDSNV": true,            "iucr": "1360",            "compnos": "10647748",            "source": "Chicago",            "timestamp": 1471564800000,            "type": "26",            "desc": "CRIMINAL TRESPASS>TO VEHICLE",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1472335200972        },        "geometry": {            "coordinates": [-87.663295, 41.897955],            "type": "Point"        },        "_rev": "1-8a60fb5fa20612f0d14b30dceb849d7f",        "_id": "Chicago10647748",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "1365",            "compnos": "10751752",            "source": "Chicago",            "timestamp": 1478852100000,            "type": "26",            "desc": "CRIMINAL TRESPASS>TO RESIDENCE",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1479592801633        },        "geometry": {            "coordinates": [-87.663549, 41.897951],            "type": "Point"        },        "_rev": "1-6299e8984ecd8cee487b6fab26e077aa",        "_id": "Chicago10751752",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "0820",            "compnos": "10691561",            "source": "Chicago",            "timestamp": 1474560000000,            "type": "06",            "desc": "THEFT>$500 AND UNDER",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1475272801465        },        "geometry": {            "coordinates": [-87.663837, 41.898858],            "type": "Point"        },        "_rev": "1-ce268d8ff45f03245ba4be5fcdf86c70",        "_id": "Chicago10691561",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "0910",            "compnos": "10764883",            "source": "Chicago",            "timestamp": 1480100400000,            "type": "07",            "desc": "MOTOR VEHICLE THEFT>AUTOMOBILE",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1480802401036        },        "geometry": {            "coordinates": [-87.662437, 41.897514],            "type": "Point"        },        "_rev": "1-c0ff2b42c576df89bbe4216f678ba666",        "_id": "Chicago10764883",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "0820",            "compnos": "10761597",            "source": "Chicago",            "timestamp": 1479840900000,            "type": "06",            "desc": "THEFT>$500 AND UNDER",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1480543201812        },        "geometry": {            "coordinates": [-87.663777, 41.897947],            "type": "Point"        },        "_rev": "1-cce3de77cedbae51c084bbeca6726830",        "_id": "Chicago10761597",        "type": "Feature"    }, {        "properties": {            "CDSNV": false,            "iucr": "0460",            "compnos": "10942944",            "source": "Chicago",            "timestamp": 1494606600000,            "type": "08B",            "desc": "BATTERY>SIMPLE",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1495317601460        },        "geometry": {            "coordinates": [-87.663115, 41.899776],            "type": "Point"        },        "_rev": "1-7c1efee616d2ea0e3aa3c058db2a136b",        "_id": "Chicago10942944",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "0810",            "compnos": "10779835",            "source": "Chicago",            "timestamp": 1481246100000,            "type": "06",            "desc": "THEFT>OVER $500",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1482012000909        },        "geometry": {            "coordinates": [-87.661581, 41.898894],            "type": "Point"        },        "_rev": "1-5ba939fa305499ebf55153cdf7b62fec",        "_id": "Chicago10779835",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "0820",            "compnos": "10651378",            "source": "Chicago",            "timestamp": 1471797600000,            "type": "06",            "desc": "THEFT>$500 AND UNDER",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1472508001211        },        "geometry": {            "coordinates": [-87.663464, 41.899773],            "type": "Point"        },        "_rev": "1-8e9924397e95b433c3a3829f4dd01154",        "_id": "Chicago10651378",        "type": "Feature"    }, {        "properties": {            "iucr": "0910",            "compnos": "10528889",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1463684400000,            "type": "07",            "desc": "MOTOR VEHICLE THEFT>AUTOMOBILE"        },        "type": "Feature",        "_rev": "2-2ae93d7f8f4d2550fdff6f441e229ddf",        "_id": "10528889",        "geometry": {            "coordinates": [-87.661368, 41.898899],            "type": "Point"        }    }, {        "properties": {            "CDSNV": false,            "iucr": "0460",            "compnos": "10666249",            "source": "Chicago",            "timestamp": 1472780700000,            "type": "08B",            "desc": "BATTERY>SIMPLE",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1473544801678        },        "geometry": {            "coordinates": [-87.662429, 41.897162],            "type": "Point"        },        "_rev": "1-523e366d286ca3bb01e4d6b9aee14cc1",        "_id": "Chicago10666249",        "type": "Feature"    }, {        "properties": {            "iucr": "2825",            "compnos": "10554020",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1465474920000,            "type": "26",            "desc": "OTHER OFFENSE>HARASSMENT BY TELEPHONE"        },        "type": "Feature",        "_rev": "2-ac73fec6d3f8828ac79aa264239d923a",        "_id": "10554020",        "geometry": {            "coordinates": [-87.663761, 41.899766],            "type": "Point"        }    }, {        "properties": {            "iucr": "0890",            "compnos": "10597647",            "source": "Chicago",            "timestamp": 1468483200000,            "type": "06",            "desc": "THEFT>FROM BUILDING",            "updated": 1469224801761        },        "geometry": {            "coordinates": [-87.662516, 41.900099],            "type": "Point"        },        "_rev": "1-fb6dcd42c246a59113c0ff6436102626",        "_id": "Chicago10597647",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "1320",            "compnos": "10742733",            "source": "Chicago",            "timestamp": 1478293320000,            "type": "14",            "desc": "CRIMINAL DAMAGE>TO VEHICLE",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1478988001933        },        "geometry": {            "coordinates": [-87.662516, 41.900099],            "type": "Point"        },        "_rev": "1-17b5252c2025d99127016e85ed7835f5",        "_id": "Chicago10742733",        "type": "Feature"    }, {        "properties": {            "CDSNV": false,            "iucr": "0460",            "compnos": "10942714",            "source": "Chicago",            "timestamp": 1494589500000,            "type": "08B",            "desc": "BATTERY>SIMPLE",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1495317601452        },        "geometry": {            "coordinates": [-87.662516, 41.900099],            "type": "Point"        },        "_rev": "1-820103da91db4f7ee3a7b56b00e76a70",        "_id": "Chicago10942714",        "type": "Feature"    }, {        "properties": {            "iucr": "0580",            "compnos": "10560935",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1465955100000,            "type": "08A",            "desc": "STALKING>SIMPLE"        },        "type": "Feature",        "_rev": "2-6aa9a9c1bc23ad3a4baa639c9c3396ca",        "_id": "10560935",        "geometry": {            "coordinates": [-87.663838, 41.899767],            "type": "Point"        }    }, {        "properties": {            "iucr": "1330",            "compnos": "10586403",            "source": "Chicago",            "timestamp": 1467736200000,            "type": "26",            "desc": "CRIMINAL TRESPASS>TO LAND",            "updated": 1469154666305        },        "geometry": {            "coordinates": [-87.661363, 41.897988],            "type": "Point"        },        "_rev": "1-a8d30092e99796656aebb507e2c8d1d8",        "_id": "Chicago10586403",        "type": "Feature"    }, {        "properties": {            "iucr": "051A",            "compnos": "10556006",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1465626480000,            "type": "04A",            "desc": "ASSAULT>AGGRAVATED: HANDGUN"        },        "type": "Feature",        "_rev": "2-3a38cdc94f9147f2bd4eba032f1abdd2",        "_id": "10556006",        "geometry": {            "coordinates": [-87.663864, 41.899764],            "type": "Point"        }    }, {        "properties": {            "CDSNV": false,            "iucr": "0820",            "compnos": "10926756",            "source": "Chicago",            "timestamp": 1493280000000,            "type": "06",            "desc": "THEFT>$500 AND UNDER",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1494021602833        },        "geometry": {            "coordinates": [-87.662424, 41.896956],            "type": "Point"        },        "_rev": "1-68f35359605756f35b7e6e313ff9c225",        "_id": "Chicago10926756",        "type": "Feature"    }, {        "properties": {            "iucr": "0810",            "compnos": "10508798",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1462309200000,            "type": "06",            "desc": "THEFT>OVER $500"        },        "type": "Feature",        "_rev": "2-4a3ff298e4912e8a879d1f8da56c4e51",        "_id": "10508798",        "geometry": {            "coordinates": [-87.661586, 41.899803],            "type": "Point"        }    }, {        "properties": {            "CDSNV": false,            "iucr": "0810",            "compnos": "10926273",            "source": "Chicago",            "timestamp": 1493246700000,            "type": "06",            "desc": "THEFT>OVER $500",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1493935220437        },        "geometry": {            "coordinates": [-87.662422, 41.896847],            "type": "Point"        },        "_rev": "1-72718e1deab5ebc2a7ec344f189b8611",        "_id": "Chicago10926273",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "1320",            "compnos": "10780263",            "source": "Chicago",            "timestamp": 1481371200000,            "type": "14",            "desc": "CRIMINAL DAMAGE>TO VEHICLE",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1482098401042        },        "geometry": {            "coordinates": [-87.661021, 41.897994],            "type": "Point"        },        "_rev": "1-be5b6dcd4ca821451dc1ca7ae15b5342",        "_id": "Chicago10780263",        "type": "Feature"    }, {        "properties": {            "iucr": "0820",            "compnos": "10570171",            "source": "Chicago",            "imported": 1469073600000,            "timestamp": 1466114400000,            "type": "06",            "desc": "THEFT>$500 AND UNDER"        },        "type": "Feature",        "_rev": "2-91090c40c0b92dd57c4a567ed2565753",        "_id": "10570171",        "geometry": {            "coordinates": [-87.661344, 41.89981],            "type": "Point"        }    }, {        "properties": {            "CDSNV": true,            "iucr": "1156",            "compnos": "10710558",            "source": "Chicago",            "timestamp": 1475830800000,            "type": "11",            "desc": "DECEPTIVE PRACTICE>ATTEMPT - FINANCIAL IDENTITY THEFT",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1476568801724        },        "geometry": {            "coordinates": [-87.660974, 41.897993],            "type": "Point"        },        "_rev": "1-9c509d855b80a33eb9d22ba5e99d3cba",        "_id": "Chicago10710558",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "1150",            "compnos": "10847733",            "source": "Chicago",            "timestamp": 1486932300000,            "type": "11",            "desc": "DECEPTIVE PRACTICE>CREDIT CARD FRAUD",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1487628002292        },        "geometry": {            "coordinates": [-87.663944, 41.897034],            "type": "Point"        },        "_rev": "1-a6e42bac17b08794b7c32338ee5ae2ac",        "_id": "Chicago10847733",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "0820",            "compnos": "10847734",            "source": "Chicago",            "timestamp": 1486932300000,            "type": "06",            "desc": "THEFT>$500 AND UNDER",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1487628002292        },        "geometry": {            "coordinates": [-87.663944, 41.897034],            "type": "Point"        },        "_rev": "1-8a631e27ed53daede99e61ce959e249c",        "_id": "Chicago10847734",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "0890",            "compnos": "10715613",            "source": "Chicago",            "timestamp": 1476378000000,            "type": "06",            "desc": "THEFT>FROM BUILDING",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1477087201606        },        "geometry": {            "coordinates": [-87.663985, 41.897034],            "type": "Point"        },        "_rev": "1-1ebbb088eb7468384d3b76dd71a60419",        "_id": "Chicago10715613",        "type": "Feature"    }, {        "properties": {            "CDSNV": false,            "iucr": "0460",            "compnos": "10848643",            "source": "Chicago",            "timestamp": 1487026980000,            "type": "08B",            "desc": "BATTERY>SIMPLE",            "CDSSTREET": true,            "CDSDV": false,            "updated": 1487714402837        },        "geometry": {            "coordinates": [-87.664916, 41.898612],            "type": "Point"        },        "_rev": "1-05a5fc62f63c4424686399d19689a75a",        "_id": "Chicago10848643",        "type": "Feature"    }, {        "properties": {            "CDSNV": true,            "iucr": "1320",            "compnos": "10795418",            "source": "Chicago",            "timestamp": 1482501600000,            "type": "14",            "desc": "CRIMINAL DAMAGE>TO VEHICLE",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1483221601270        },        "geometry": {            "coordinates": [-87.660753, 41.897998],            "type": "Point"        },        "_rev": "1-91b6915f860008854452129cbdc503c1",        "_id": "Chicago10795418",        "type": "Feature"    }, {        "properties": {            "CDSNV": false,            "iucr": "0910",            "compnos": "10926419",            "source": "Chicago",            "timestamp": 1493267400000,            "type": "07",            "desc": "MOTOR VEHICLE THEFT>AUTOMOBILE",            "CDSSTREET": false,            "CDSDV": false,            "updated": 1494021602815        },        "geometry": {            "coordinates": [-87.660753, 41.897998],            "type": "Point"        },        "_rev": "1-f605eb97564eee4e9f72412cb4ebe95f",        "_id": "Chicago10926419",        "type": "Feature"    }, {        "properties": {            "iucr": "0810",            "compnos": "10597684",            "source": "Chicago",            "timestamp": 1468443600000,            "type": "06",            "desc": "THEFT>OVER $500",            "updated": 1469138401598        },        "geometry": {            "coordinates": [-87.660705, 41.897997],            "type": "Point"        },        "_rev": "1-29bf2cdd294443e80e191388185f426b",        "_id": "Chicago10597684",        "type": "Feature"    }],    "num_rows": 47,    "type": "FeatureCollection"}');

  
  var crime_data = JSON.parse(httpGet("http://opendata.mybluemix.net/crimes?lat="+ MID[0].toString() + "&lon=" + MID[1].toString() + "&radius="   + RADIUS.toString()));


  function swap(arr){
    return [arr[1], arr[0]];
  }
  function get_bounding_boxes(coordinates){
  
    // TODO: fill this with more stuff, the str is the crime type, the num is the distance to avoid it by
    var crimes_to_distances = {
      "MOTOR VEHICLE THEFT": 10
    };

    var lat_long_values = get_distances_per_lat_long(coordinates[0], coordinates[1]); // get the distances lt and long degrees are each worth
    var deltas = [(crimes_to_distances["crime_type"]||50)/lat_long_values[0],  (crimes_to_distances["crime_type"]||50)/lat_long_values[1]]; // get the change in lat long

    var bottom_right = [coordinates[0] - deltas[0], coordinates[1] - deltas[1]];
    var top_left = [coordinates[0] + deltas[0], coordinates[1] + deltas[1]];
    return [top_left, bottom_right];
  }

  function remove_sig_figs(coordinates){
    return[coordinates[0].toFixed(4), coordinates[1].toFixed(4)];
  }

  function make_request(start, stop){
  
    var arr = [1,2,3,4,7,8,15,18,22];
    var pts = {};
    list_of_crimes = {}
  

  for (var i = crime_data["features"].length - 1; i >= 0; i--) {
    var crime = crime_data["features"][i];
  
    if(arr.includes(parseInt(crime["properties"]["type"].replace(/[^0-9]/, ''))) || crime["properties"]["desc"].indexOf("POCKET-PICKING") != -1){
      // console.log(JSON.stringify(remove_sig_figs(crime["geometry"]["coordinates"])));
      pts[JSON.stringify(remove_sig_figs(crime["geometry"]["coordinates"]))] = (pts[JSON.stringify(remove_sig_figs(crime["geometry"]["coordinates"]))]||0) - parseInt(crime["properties"]["type"].replace(/[^0-9]/, '')) + 26
      list_of_crimes[JSON.stringify(remove_sig_figs(crime["geometry"]["coordinates"]))] = (list_of_crimes[JSON.stringify(remove_sig_figs(crime["geometry"]["coordinates"]))]||"");
      console.log(Number(crime["properties"]["timestamp"]));
      var d = new Date(0);
      d.setUTCSeconds(Number(crime["properties"]["timestamp"])/1000);
      list_of_crimes[JSON.stringify(remove_sig_figs(crime["geometry"]["coordinates"]))] += crime["properties"]["desc"] + ": " + d + "<br>";
      // print(crime["properties"]["desc"], crime["properties"]["timestamp"], swap(crime["geometry"]["coordinates"]))
      // print(get_bounding_boxes(crime["properties"]["desc"], swap(crime["geometry"]["coordinates"])))
      //if '[-87.6837, 41.9031]' == str(remove_sig_figs(crime["geometry"]["coordinates"])):
      //  print(crime["properties"]["desc"], crime["properties"]["timestamp"], swap(crime["geometry"]["coordinates"]))
      // all_boxes += [get_bounding_boxes(swap(crime["geometry"]["coordinates"]))]
    }
  }
  // console.log(pts);
  // Create items array
  var sorted_pts = Object.keys(pts).map(function(key) {
    return [key, pts[key]];
  });

  // Sort the array based on the second element
  sorted_pts.sort(function(first, second) {
    return second[1] - first[1];
  });
  // Create a new array with only the first 5 items
  sorted_pts = sorted_pts.slice(0, 20);
  // console.log(sorted_pts.slice(0, 20));

  var group = new H.map.Group();
  // console.log(sorted_pts);
  for (var i = sorted_pts.length - 1; i >= 0; i--) {
    // console.log("B:", sorted_pts[i][0]);
    sorted_pts[i] = JSON.parse(sorted_pts[i][0]);

    var m = new H.map.Marker({
        lat: sorted_pts[i][1],
        lng: sorted_pts[i][0]
      });
    m.setData(list_of_crimes[JSON.stringify(sorted_pts[i])]);
      group.addObject(m);
      console.log(list_of_crimes[JSON.stringify(sorted_pts[i])]);

  }

  map.addObject(group);
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    // var bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
    //   // read custom data
    //   content: evt.target.getData()
    // });
    // // show info bubble
    // ui.addBubble(bubble);
    document.getElementById("crime_info").innerHTML = evt.target.getData();
  }, false);

  // console.log("sorted points is:", sorted_pts);
  

  var avoid_str = "";

  var all_boxes = [];
  for (var i = sorted_pts.length - 1; i >= 0; i--) {
    // console.log("A:", swap(sorted_pts[i]));
    var strings_to_ints = [parseFloat(swap(sorted_pts[i])[0]),  parseFloat(swap(sorted_pts[i])[1])];
    // console.log("A:", strings_to_ints);
    all_boxes.push(get_bounding_boxes(strings_to_ints));
  }
  // for i in sorted_pts:
  //  all_boxes += [get_bounding_boxes(swap(i))]

  // console.log("all boxes is:", all_boxes);
    for (var i = all_boxes.length - 1; i >= 0; i--) {


      avoid_str += all_boxes[i][0][0].toString() + "," + all_boxes[i][0][1].toString() + ";" + all_boxes[i][1][0].toString() + "," + all_boxes[i][1][1].toString() + "!";
    }
    avoid_str = avoid_str.substring(0, avoid_str.length - 1);
    // avoid_areas = "!".join([str(x[0][0])+","+str(x[0][1])+";"+str(x[1][0])+","+str(x[1][1]) for x in all_boxes])
    // print(avoid_areas)
    // console.log(avoid_str);

    return avoid_str;

  }

  avoid_str = make_request(41,-87);
  var router = platform.getRoutingService(),
    routeRequestParams = {
      mode: 'fastest;' + trans_port,
      representation: 'display',
      routeattributes : 'waypoints,summary,shape,legs',
      maneuverattributes: 'direction,action',
      waypoint0: START[0].toString() + "," + START[1].toString(), // chicago??
      waypoint1: STOP[0].toString() + "," + STOP[1].toString(),  // Chicago..
      avoidareas: avoid_str
    };


  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );

  var router2 = platform.getRoutingService(),
    routeRequestParams = {
      mode: 'fastest;' + trans_port,
      representation: 'display',
      routeattributes : 'waypoints,summary,shape,legs',
      maneuverattributes: 'direction,action',
      waypoint0: START[0].toString() + "," + START[1].toString(), // chicago??
      waypoint1: STOP[0].toString() + "," + STOP[1].toString()  // Chicago..
      // avoidareas: avoid_str
    };


  router2.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );
}


/**
 * This function will be called once the Routing REST API provides a response
 * @param  {Object} result          A JSONP object representing the calculated route
 *
 * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
 */
function onSuccess(result) {
  var route = result.response.route[0];
 /*
  * The styling of the route response on the map is entirely under the developer's control.
  * A representitive styling can be found the full JS + HTML code of this example
  * in the functions below:
  */
  addRouteShapeToMap(route);
  addManueversToMap(route);

  addWaypointsToPanel(route.waypoint);
  addManueversToPanel(route);
  addSummaryToPanel(route.summary);
  // ... etc.
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
function onError(error) {
  alert('Ooops!');
}





//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Hold a reference to any infobubble opened
var bubble;

/**
 * Opens/Closes a infobubble
 * @param  {H.geo.Point} position     The location on the map.
 * @param  {String} text              The contents of the infobubble.
 */
function openBubble(position, text){
 if(!bubble){
    bubble =  new H.ui.InfoBubble(
      position,
      // The FO property holds the province name.
      {content: text});
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}


/**
 * Creates a H.map.Polyline from the shape of the route and adds it to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
 var color = 'rgba(200, 50, 28, 0.7)';
 var width = 10;
function addRouteShapeToMap(route){
  var lineString = new H.geo.LineString(),
    routeShape = route.shape,
    polyline;

  routeShape.forEach(function(point) {
    var parts = point.split(',');
    lineString.pushLatLngAlt(parts[0], parts[1]);
  });

  polyline = new H.map.Polyline(lineString, {
    style: {
      lineWidth: width,
      strokeColor: color
    }
  });
  // Add the polyline to the map
  map.addObject(polyline);
  // And zoom to its bounding rectangle
  map.setViewBounds(polyline.getBounds(), true);

  width = 4;
  color = 'rgba(0, 128, 255, 0.7)';
}


/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addManueversToMap(route){
  var svgMarkup = '<svg width="18" height="18" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="8" cy="8" r="8" ' +
      'fill="#1b468d" stroke="white" stroke-width="1"  />' +
    '</svg>',
    dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
    group = new  H.map.Group(),
    i,
    j;

  // Add a marker for each maneuver
  for (i = 0;  i < route.leg.length; i += 1) {
    for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
      // Get the next maneuver.
      maneuver = route.leg[i].maneuver[j];
      // Add a marker to the maneuvers group
      var marker =  new H.map.Marker({
        lat: maneuver.position.latitude,
        lng: maneuver.position.longitude} ,
        {icon: dotIcon});
      marker.instruction = maneuver.instruction;
      group.addObject(marker);
    }
  }

  group.addEventListener('tap', function (evt) {
    map.setCenter(evt.target.getPosition());
    openBubble(
       evt.target.getPosition(), evt.target.instruction);
  }, false);

  // Add the maneuvers group to the map
  map.addObject(group);
}


/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addWaypointsToPanel(waypoints){



  var nodeH3 = document.createElement('h3'),
    waypointLabels = [],
    i;


   for (i = 0;  i < waypoints.length; i += 1) {
    waypointLabels.push(waypoints[i].label)
   }

   nodeH3.textContent = waypointLabels.join(' - ');

  routeInstructionsContainer.innerHTML = '';
  routeInstructionsContainer.appendChild(nodeH3);
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addSummaryToPanel(summary){
  var summaryDiv = document.createElement('div'),
   content = '';
   content += '<b>Total distance</b>: ' + summary.distance  + 'm. <br/>';
   content += '<b>Travel Time</b>: ' + summary.travelTime.toMMSS() + ' (in current traffic)';


  summaryDiv.style.fontSize = 'small';
  summaryDiv.style.marginLeft ='5%';
  summaryDiv.style.marginRight ='5%';
  summaryDiv.innerHTML = content;
  routeInstructionsContainer.appendChild(summaryDiv);
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addManueversToPanel(route){



  var nodeOL = document.createElement('ol'),
    i,
    j;

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft ='5%';
  nodeOL.style.marginRight ='5%';
  nodeOL.className = 'directions';

     // Add a marker for each maneuver
  for (i = 0;  i < route.leg.length; i += 1) {
    for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
      // Get the next maneuver.
      maneuver = route.leg[i].maneuver[j];

      var li = document.createElement('li'),
        spanArrow = document.createElement('span'),
        spanInstruction = document.createElement('span');

      spanArrow.className = 'arrow '  + maneuver.action;
      spanInstruction.innerHTML = maneuver.instruction;
      li.appendChild(spanArrow);
      li.appendChild(spanInstruction);

      nodeOL.appendChild(li);
    }
  }

  routeInstructionsContainer.appendChild(nodeOL);
}


Number.prototype.toMMSS = function () {
  return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
}


function submit(){
  var to = document.getElementById("start").value;
  var dest = document.getElementById("dest").value;
  to = to.replace(new RegExp(" ", 'g'), "+");
  dest = dest.replace(new RegExp(" ", 'g'), "+");
  new_url_start = "https://nominatim.openstreetmap.org/search?q=" + to + "&format=json&polygon=1&addressdetails=1"

  
  var result_start = JSON.parse(httpGet(new_url_start));
  new_url_start = "https://nominatim.openstreetmap.org/search?q=" + dest + "&format=json&polygon=1&addressdetails=1"
  var result_dest = JSON.parse(httpGet(new_url_start));
  START = [Number(result_start[0]['lat']) , Number(result_start[0]['lon'])];
  STOP = [Number(result_dest[0]['lat']) , Number(result_dest[0]['lon'])];

  MID = [(START[0]+STOP[0])/2, (START[1]+STOP[1])/2];
  // console.log((START[0]+STOP[0])/2.0, (START[1]+STOP[1])/2.0);
  dists = get_distances_per_lat_long(START[0]-STOP[0], START[1]-STOP[1]);
  diff = [(START[0]-STOP[0])*dists[0], (START[1]-STOP[1])*dists[1]];
  // console.log("ASDFGH", START, STOP, MID);
  // console.log("DIFF IS", diff);
  RADIUS = Math.pow(diff[0]*diff[0] + diff[1]*diff[1], 0.5)/2;
  // console.log(START);
  // console.log(STOP);
  function getSelect() {
    var obj = document.getElementById("transport");
    my_trans = obj.options[obj.selectedIndex].text;
    return my_trans;
  }
  var my_way = getSelect();
  calculateRouteFromAtoB(platform, my_way);

  }

  function submit_call(){
    var phone_no = document.getElementById("phone_no").value;
    alert("LMYR Check Initated with: " + phone_no);
    //line removed but used Twilio to run phone call :) 
  }