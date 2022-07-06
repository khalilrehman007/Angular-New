import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../second-header/second-header.component';

@Component({
  selector: 'app-property-compare',
  templateUrl: './property-compare.component.html',
  styleUrls: ['./property-compare.component.scss']
})
export class PropertyCompareComponent implements OnInit {
  trash = '../../../assets/images/icons/Trash-dotted.svg'
  swimm = '../../../assets/images/icons/swimming.svg'
  properties = [
    {img: '../../../assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi'},
    {img: '../../../assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi'},
    {img: '../../../assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi'},
    {img: '../../../assets/images/pro-comparison.png',price: '350,000',title: 'Blue Wave Tower',address: 'Etihad Tower 4, Etihad Towers, Corniche Road, Abu Dhabi'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
