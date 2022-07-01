import { Component, OnInit } from '@angular/core';
import { SecondHeaderComponent } from '../../../second-header/second-header.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-property-review',
  templateUrl: './property-review.component.html',
  styleUrls: ['./property-review.component.scss']
})
export class PropertyReviewComponent implements OnInit {
  upload ='../../../../assets/images/icons/upload-1.svg'
  trash ='../../../../assets/images/icons/Trash.svg'
  edit ='../../../../assets/images/icons/edit.svg'
  checkmark ='../../../../assets/images/icons/checkmark-circle.svg'
  documentlist = [
    {imgsrc: '../../../../assets/images/doc-thumbnail.svg',filetitle: 'property-deed-yu.jpg',doctitile: 'Property Tittle Deed',viewLink: '#', deleteLink: '#'},
    {imgsrc: '../../../../assets/images/doc-thumbnail.svg',filetitle: 'property-deed-yu.jpg',doctitile: 'Property Tittle Deed',viewLink: '#', deleteLink: '#'},
    {imgsrc: '../../../../assets/images/doc-thumbnail.svg',filetitle: 'property-deed-yu.jpg',doctitile: 'Property Tittle Deed',viewLink: '#', deleteLink: '#'},
    {imgsrc: '../../../../assets/images/doc-thumbnail.svg',filetitle: 'property-deed-yu.jpg',doctitile: 'Property Tittle Deed',viewLink: '#', deleteLink: '#'},
    {imgsrc: '../../../../assets/images/doc-thumbnail.svg',filetitle: 'property-deed-yu.jpg',doctitile: 'Property Tittle Deed',viewLink: '#', deleteLink: '#'},
  ];
  prodetailslist = [
    {titlename: 'Tittle Deed No.',titlevalue: '324434343'},
    {titlename: 'Title Dead Type',titlevalue: 'Leasehold'},
    {titlename: 'Municipality No.',titlevalue: '78787'},
    {titlename: 'Property Insured',titlevalue: 'Yes'},
    {titlename: 'Name of the Owner',titlevalue: 'Omran Yusef'},
    {titlename: 'Phone No. of the Owner',titlevalue: '+971 99 999 9999'},
    {titlename: 'Property Category',titlevalue: 'Residential'},
    {titlename: 'Property Type',titlevalue: 'Whole Building'},
    {titlename: 'Purpose of valuation',titlevalue: 'Buy & Sell'},
    {titlename: 'Property Current Status',titlevalue: 'Owner Occupied'},
    {titlename: 'Construction Age',titlevalue: '34'},
    {titlename: 'Elevation',titlevalue: 'G+5'},
    {titlename: 'Plot Size',titlevalue: '3,434 Sq.Ft.',titlevalue2: '334 Sq.Mt.'},
    {titlename: 'Buildup Area',titlevalue: '3,433 Sq.Ft.',titlevalue2: '343 Sq.Mt.'},
  ];
  prolocationlist = [
    {titlename: 'Country',titlevalue: 'United Arab Emirates'},
    {titlename: 'City',titlevalue: 'Dubai'},
    {titlename: 'Area',titlevalue: 'Jebel Ali'},
    {titlename: 'Property Address',titlevalue: 'Gold Souk - Gold Souq'},
    {titlename: 'Plot No.',titlevalue: '232'},
    {titlename: 'No. of Road',titlevalue: '1'},
  ];
  buildinglist = [
    {titlename: 'Studio',titlevalue: '30'},
    {titlename: 'Vacant',titlevalue: '20'},
    {titlename: 'Unit Size',titlevalue: '2,788 Sq.Ft.'},
    {titlename: 'Unit Size',titlevalue: '1,00,000 AED'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
