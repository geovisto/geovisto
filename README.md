# Geovisto
TypeScript mapping library for generic geospatial data visualization based on Leaflet.

This repository is a snapshot of Geoviosto core derived from the development repository: [geovisto/geovisto-map](https://github.com/geovisto/geovisto-map).

## Usage

```js
// create instance of map with given props
const map = Geovisto.createMap({
    id: "my-geovisto-map",
    data: Geovisto.getMapDataManagerFactory().json([
        // list of data records (JSON structures)
        // ...
    ]),
    geoData: Geovisto.getGeoDataManager([
        Geovisto.getGeoDataFactory().geojson("world polygons", {
            // GeoJSON definition
            // ...
        }),
        // other geographic data
        // ...
    ]),
    globals?: { // props of Leaflet-based map
        zoom: number,
        mapCenter: {
            lat: number,
            lng: number
        },
        mapStructure: {
            maxZoom: number,
            maxBounds: [[number, number], [number, number]]
        }
    },
    templates?: Geovisto.createMapToolsManager([
        // instances of Geovisto tools (extensions)
        // these tools will be used as templates if new instance of tool needs to be created in the future
        // ...
    ]),
    tools?: Geovisto.createMapToolsManager([
        // instances of Geovisto tools (extensions) which will be directly used in the map
        // ...
    ])
});

// rendering of the map
map.draw(Geovisto.getMapConfigManagerFactory().default({
  // initial settings of the map can be overriden by the map config - JSON structure providing user settings 
  zoom?: number,
  mapCenter?: { lat: number, lng: number },
  mapStructure?: { maxZoom: number, maxBounds: [[ number, number ],[ number, number ]] },
  tools?: [
    // config of Geovisto tools (extensions) used in the map
  ]
}));

// the map can be re-rendered
map.redraw(Geovisto.getMapConfigManagerFactory().default({ /* ... config ... */}), this.getProps([ /* ... data ... */]));

// current state of the map can be exported in the JSON format (map config)
const config = map.export();
```

## Demo
* [Github pages](https://geovisto.github.io/geovisto-map/) ([source code](https://github.com/geovisto/geovisto-map/tree/master/src/demo) of the demo)
* [Video presentation](https://drive.google.com/file/d/1iU5R1Atlbxva8s3hLT758FSzeAbc63VN/view?usp=sharing)
* [Conference presentation](https://drive.google.com/file/d/1Yi4Lx7E24TCWs2JqRlMjqS0xfXTzKB-p/view?usp=sharing)
* [Conference paper](https://www.scitepress.org/PublicationsDetail.aspx?ID=/rbRRwyTSdo=&t=1)

## Installation

```
npm install --save geovisto
```

## Extensions

This package serves as the core of Geovisto providing the API for Geovisto tools (extensions). Follow available Geovisto tools on [Github](https://github.com/geovisto/).

## License

[MIT](https://github.com/geovisto/geovisto/blob/master/LICENSE)