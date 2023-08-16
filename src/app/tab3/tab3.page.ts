import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LinkPage } from '../link/link.page';

// Google Map API
declare let google;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('map', {static:true}) mapElement;
  map: any;
  gMarkers = [];

  places = [
      {
          "title":"Headspace",
          "info":"Mental health services CQ Health provides public mental health and AODS (alcohol and other drugs) services in Central Queensland.",
          "web":"www.qmhc.qld.gov.au",
          "lat":"-26.653464600201538",
          "lng":"153.08280291448705"
      },{
          "title":"Mindcare Mental Service",
          "info":"Mental health services CQ Health provides public mental health and AODS (alcohol and other drugs) services in Central Queensland.",
          "web":"www.qmhc.qld.gov.au",
          "lat":"-26.65534397915825",
          "lng":"153.09451880321703"
      },{
        "title":"Openminds",
        "info":"Mental health services CQ Health provides public mental health and AODS (alcohol and other drugs) services in Central Queensland.",
        "web":"www.qmhc.qld.gov.au",
        "lat":"-26.656878143131184",
        "lng":"153.0933171736077"
      },{
        "title":"Bear in mind",
        "info":"Mental health services CQ Health provides public mental health and AODS (alcohol and other drugs) services in Central Queensland.",
        "web":"www.qmhc.qld.gov.au",
        "lat":"-26.67106818217924",
        "lng":"153.08739485624739"
      },{
        "title":"Child and Youth Mental Health",
        "info":"Mental health services CQ Health provides public mental health and AODS (alcohol and other drugs) services in Central Queensland.",
        "web":"www.qmhc.qld.gov.au",
        "lat":"-26.664855463351138",
        "lng":"153.08473410496956"
      }
  ];

  happyPlaces = [
    {
        "title":"Nice Park",
        "info":"What a nice park. Escarpments, undulating low hills, seasonal wetlands and patches of vine-thicket are some of the landscapes protected in Alwal National Park",
        "web":"parks.des.qld.gov.au",
        "lat":"-26.643464300201538",
        "lng":"153.08242291448705"
    },{
        "title":"Sunset Point",
        "info":"Beautiful sunset view. Escarpments, undulating low hills, seasonal wetlands and patches of vine-thicket are some of the landscapes protected in Alwal National Park",
        "web":"parks.des.qld.gov.au",
        "lat":"-26.65534397915825",
        "lng":"153.08451880321703"
    },{
      "title":"Good View",
      "info":"Great view to relax. Escarpments, undulating low hills, seasonal wetlands and patches of vine-thicket are some of the landscapes protected in Alwal National Park",
      "web":"parks.des.qld.gov.au",
      "lat":"-26.600878143131184",
      "lng":"153.0923371736077"
    },{
      "title":"Quiet Park",
      "info":"Very quiet park. Escarpments, undulating low hills, seasonal wetlands and patches of vine-thicket are some of the landscapes protected in Alwal National Park",
      "web":"parks.des.qld.gov.au",
      "lat":"-26.64106818217924",
      "lng":"153.08739485624739"
    },{
      "title":"Beautiful Spot",
      "info":"Beautiful spot to feel happy. Escarpments, undulating low hills, seasonal wetlands and patches of vine-thicket are some of the landscapes protected in Alwal National Park",
      "web":"parks.des.qld.gov.au",
      "lat":"-26.664855463351138",
      "lng":"153.08473420496956"
    },{
      "title":"Surf Point",
      "info":"Beautiful surffing spot to feel happy. Escarpments, undulating low hills, seasonal wetlands and patches of vine-thicket are some of the landscapes protected in Alwal National Park",
      "web":"parks.des.qld.gov.au",
      "lat":"-26.668194359485277",
      "lng":"153.10730296636422"
    }
];

  constructor(private modalController: ModalController) {}

  ngOnInit() {

    this.getGeoLocation();
    this.displayMap();

    // Show places
    this.placeMarkers(this.places);
  }

  // Open a modal screen to display information of the place
  async infoLink(i:number) {

    const modal = await this.modalController.create({
      component: LinkPage,
      componentProps: {
        marker:this.gMarkers[i]
       }
    });

    modal.onDidDismiss()
      .then((retval) => {
        if (retval.data !== undefined) {
        }
      });
      return modal.present();
  }

  // Check if geolocation can be accessed
  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.map.setCenter(pos);
      });
    } else {
      // Alert when geolocation is disabled
      alert("Geolocation not supported");
    }
  }

  // Display Google Map
  displayMap() {
    // Set default location
    let latLng = new google.maps.LatLng(-26.65833527495791, 153.09641854107218);
    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeID: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  // Add Click Event to show InfoWindow for markers
  addInfoWindow(marker) {
    let infoWindowContent:any = '<div id="content"><h4>' + marker.title + '</h4>' + marker.phone + '<br><a href="/link/www.apple.com">' + marker.web + '</a></div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.infoLink(marker.num);
    });
  }

  // Add markers on the map
  placeMarkers(markers) {
    for(let i = 0; i < markers.length; i++ ) {
      let marker = markers[i];
      let position = new google.maps.LatLng(marker.lat, marker.lng);
      let newMarker = new google.maps.Marker({
        num: i,
        position: position,
        title: marker.title,
        info: marker.info,
        web: marker.web});
      this.gMarkers.push(newMarker);
    }
    this.setMarker(this.gMarkers);
  }

  // Set markers to the map
  setMarker(markers) {
    for(let marker of markers) {
      marker.setMap(this.map);
      this.addInfoWindow(marker);
    }
  }

  // Remove markers on the map
  removeMarker(markers) {
    for(let marker of markers) {
      marker.setMap(null);
    }
  }
  
  // Switch to show happy places
  markHappyPlaces() {
    this.removeMarker(this.gMarkers);
    this.gMarkers = [];
    this.placeMarkers(this.happyPlaces);
  }

  // Switch to places
  markPlaces() {
    this.removeMarker(this.gMarkers);
    this.gMarkers = [];
    this.placeMarkers(this.places);
  }

}
