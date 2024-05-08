import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Popup from '@arcgis/core/widgets/Popup';
import PopupTemplate from '@arcgis/core/PopupTemplate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('viewDiv', {static: true}) private mapViewEl: any;

  ngOnInit() {
    const map = new Map({
      basemap: 'hybrid'
    });

    const view = new MapView({
      container: this.mapViewEl.nativeElement,
      map: map,
      extent: {
        xmin: -9177811,
        ymin: 4247000,
        xmax: -9176791,
        ymax: 4247784,
        spatialReference: { wkid: 102100 }
      }
    });

    const featureLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0',
      popupTemplate: {
        title: "Common Name: {Cmn_Name}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "Sci_Name",
                label: "Scientific Name"
              },
              {
                fieldName: "Tree_Age",
                label: "Age of Tree"
              },
              {
                fieldName: "Condition",
                label: "Condition"
              },
              {
                fieldName: "Longitude",
                label: "Longitude"
              },
              {
                fieldName: "Latitude",
                label: "Latitude"
              }
            ]
          }
        ]
      }
    });
    

    map.add(featureLayer);

    view.when(() => {
      view.popup = new Popup({
        view: view,
        autoOpenEnabled: true 
      });
    });
  }



}
