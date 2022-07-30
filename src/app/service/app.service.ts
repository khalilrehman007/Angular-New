import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiurl = 'https://beta.ovaluate.com/api/';
  id = 0;
  token :any = localStorage.getItem('token');
  // bearer :any = this.token.replace(/^"(.+)"$/,'$1') ;

  constructor(private http: HttpClient) {
  }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+JSON.parse(this.token)
  });

  LoadPropertyCategories() {
    return this.http.get(this.apiurl + 'PropertyCategories', { headers: this.headers });
  }
  ProceedSearch(data: any) {
    return this.http.get(this.apiurl + 'PropertyCategories', { headers: this.headers });
  }

  LoadPropertyTypes() {
    return this.http.get(this.apiurl + 'PropertyType/');
  }

  LoadBlogs() {
    // BlogBanners
    return this.http.get(this.apiurl + 'blogs');
  }
  LoadBanners() {
    // BlogBanners
    return this.http.get(this.apiurl + 'Banners');
  }
  LoadFeeback() {
    // BlogBanners
    return this.http.get(this.apiurl + 'GetFeedbacks');
  }
  LoadBlogById() {
    return this.http.get(this.apiurl + 'blog/' + this.id);
  }
  LoadCountries() {
    return this.http.get(this.apiurl + 'Countries');
  }
  OvaluateFeatures() {
    return this.http.get(this.apiurl + 'OvaluateFeatures');
  }
  LoadDashboardData(id) {
    return this.http.get(this.apiurl + 'Dashboard/'+ id,{ headers: this.headers });
  }
  LoadListing(data) {
    return this.http.post(this.apiurl + 'MyListings',data,{ headers: this.headers });
  }
  LoadCities(id: number) {
    return this.http.get(this.apiurl + 'Cities/' + id);
  }
  LoadDistrict(id: number) {
    return this.http.get(this.apiurl + 'Districts/' + id);
  }
  LoadType(id: number) {
    return this.http.get(this.apiurl + 'PropertyType/' + id);
  }
  ValuationPurpose() {
    return this.http.get(this.apiurl + 'ValuationPurposes/');
  }
  PropertyFeatures(id: any) {
    return this.http.get(this.apiurl + 'PropertyFeatures/' + id);
  }
  PropertyUnitTypes() {
    return this.http.get(this.apiurl + 'PropertyUnitTypes/');
  }
  StoreListingPropertyForm(data: any) {
    return this.http.post(this.apiurl + 'AddPropertyListing', data);
  }
  FurnishingTypes() {
    return this.http.get(this.apiurl + 'FurnishingTypes/');
  }
  FittingTypes() {
    return this.http.get(this.apiurl + 'FittingTypes/');
  }
  PropertyListingTypes() {
    return this.http.get(this.apiurl + 'PropertyListingTypes/');
  }
  RentTypes() {
    return this.http.get(this.apiurl + 'RentTypes/');
  }
  LatestPropertiesListingResidential(id: number) {
    return this.http.get(this.apiurl + 'LatestPropertiesListingResidential/' + id);
  }
  LatestPropertiesListingCommercial(id: number) {
    return this.http.get(this.apiurl + 'LatestPropertiesListingCommercial/' + id);
  }
  PropertyCategories() {
    return this.http.get(this.apiurl + 'PropertyCategories/');
  }
  ValuationTransactions() {
    return this.http.get(this.apiurl + 'ValuationTransactions/');
  }
  LoadProfessionalTypes() {
    return this.http.get(this.apiurl + 'ProfessionalTypes');
  }
  LoadPropertyListingTypes() {
    return this.http.get(this.apiurl + 'PropertyListingTypes');
  }
  LoadListingDashboard(data) {
    return this.http.post(this.apiurl + 'ListingDashboard/',data,{ headers: this.headers });
  }
  valuationDashboard(id) {
    return this.http.get(this.apiurl + 'ValuationDashboard/'+id,{ headers: this.headers });
  }
  LoadValuationListing(data:any) {
    return this.http.post(this.apiurl + 'MyValuations',data,{ headers: this.headers });
  }
  LoadPropertyListingStatus() {
    return this.http.get(this.apiurl + 'PropertyListingStatus');
  }
  LoadProfessionalAndListingType(professionalTypeId, listingTypeId) {
    return this.http.get(this.apiurl + 'PropertyListingPackagesByProfessionalAndListingType?professionalTypeId=' + professionalTypeId + '&listingTypeId=' + listingTypeId);
  }
  LoadTenantTypes() {
    return this.http.get(this.apiurl + 'TenantTypes');
  }
  LoadGenders() {
    return this.http.get(this.apiurl + 'Genders');
  }
  LoadPropertyManages() {
    return this.http.get(this.apiurl + 'PropertyManages');
  }
  LoadPetPolicy() {
    return this.http.get(this.apiurl + 'PetPolicy');
  }
  LoadRentTypes() {
    return this.http.get(this.apiurl + 'RentTypes');
  }
  LoadTransactionTypes() {
    return this.http.get(this.apiurl + 'PropertyTransactionTypes');
  }
  LoadCompletionStatus() {
    return this.http.get(this.apiurl + 'PropertyCompletionStatus');
  }
  LoadOccupancy() {
    return this.http.get(this.apiurl + 'OccupancyStatuses');
  }
  StoreAddSubscriber(data: any) {
    return this.http.post(this.apiurl + 'AddSubscriber', data);
  }
  AddPropertyListing(data: any) {
    // return this.http.post(this.apiurl + 'AddPropertyListing', data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'false',
        "processData": "false",
        "dataType": "json",
      })
    }
    return this.http.post(this.apiurl + 'AddPropertyListing', data, httpOptions);
  }
  PropertyListingRentBuy(data:any) {
    return this.http.post(this.apiurl + 'PropertyListingRentBuy', data);
  }
  TermsCondition() {
    return this.http.get(this.apiurl + 'TermsCondition');
  }
  CookiePolicy() {
    return this.http.get(this.apiurl + 'CookiePolicy');
  }
  PrivacyPolicy() {
    return this.http.get(this.apiurl + 'PrivacyPolicy');
  }
  AboutUs() {
    return this.http.get(this.apiurl + 'AboutUs');
  }
  FAQ() {
    return this.http.get(this.apiurl + 'FAQ');
  }
  AddContactUs(data:any) {
    return this.http.post(this.apiurl + 'AddContactUs', data);
  }
  TeamMembers() {
    return this.http.get(this.apiurl + 'TeamMembers');
  }
  HowWorkOvaluate() {
    return this.http.get(this.apiurl + 'HowWorkOvaluate');
  }
  OvaluateOfferings() {
    return this.http.get(this.apiurl + 'OvaluateOfferings');
  }
  UpdateProfile(data:any) {
    return this.http.post(this.apiurl + 'UpdateProfile', data);
  }

  StoreLead(data: any) {
    return this.http.post(this.apiurl + 'AddUserLead', data);
  }

  DisplayPropertyListing(id) {
    return this.http.get(this.apiurl + 'DisplayPropertyListing/'+id);
  }
}
