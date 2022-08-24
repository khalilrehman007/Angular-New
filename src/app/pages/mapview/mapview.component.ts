import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { PropertyfilterComponent } from '../../propertyfilter/propertyfilter.component';
import { AppService } from 'src/app/service/app.service';
declare const google: any;

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss']
})
export class MapviewComponent implements OnInit,AfterViewInit{
  videotiour ='../../../assets/images/icons/video-tour.svg'
  lsitedby ='../../../assets/images/icons/listed-by.svg'
  ovverified ='../../../assets/images/icons/ov-verified.svg'
  homelocationsvg = '../../../assets/images/home-location.svg'
  bedsvg = '../../../assets/images/icons/Bed.svg'
  bathsvg = '../../../assets/images/icons/Bath-tub.svg'
  squaremetersvg = '../../../assets/images/icons/Square Meters.svg'
  brandimg = '../../../assets/images/better-home.svg'
  propertyDetails: any;
  locations: any;
  autocomplete: any;
  marker: any;
  map: any;
  page:number = 1;
  totalRecord:number = 0;
  @ViewChild('mapView') mapElement: any;

  dynamicSlides1 = [
    {
      id: 'slide1',
      src:'../../../assets/images/property/1.png',
      alt:'Side 1',
      title:'Side 1',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide2',
      src:'../../../assets/images/property/1.png',
      alt:'Side 2',
      title:'Side 2',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide3',
      src:'../../../assets/images/property/1.png',
      alt:'Side 3',
      title:'Side 3',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    },
    {
      id: 'slide4',
      src:'../../../assets/images/property/1.png',
      alt:'Side 4',
      title:'Side 4',
      price:"250,000AED",
      link: 'PropertDetailsPage'
    }
  ]
  constructor(service:AppService) {
    this.propertyDetails=localStorage.getItem('listingForMap');
    this.propertyDetails=JSON.parse(this.propertyDetails);
    this.totalRecord = this.propertyDetails.length;
    console.log(this.propertyDetails);
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
      this.initMap(null, 6);
  }
  pageChanged(value: any) {
    this.page = value;
  }
  initMap(e: any, zoom: any) {
    this.map = new google.maps.Map($(".mapView")[0], {
      center: { "lat": 23.4241, "lng": 53.8478 },
      zoom: zoom,
      disableDefaultUI: true,
    })
    this.marker = new google.maps.Marker({
      position: { "lat": 23.4241, "lng": 53.8478 },
      map: this.map
    })

    for (let i = 0; i < this.propertyDetails.length; i++) {

      // console.log(this.propertyDetails.propertyLat);
      let latLng = {lat: this.propertyDetails[i].propertyLat, lng: this.propertyDetails[i].propertyLong};
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map
    })
  
      // marker.setMap(this.map)
    }

  }

}
