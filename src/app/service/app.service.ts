import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiurl = 'https://beta.ovaluate.com/api/';
  id = 0;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'false',
    "processData": "false",
    "dataType": "json",
  });
  constructor(private http: HttpClient) {

  }
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
    return this.http.get(this.apiurl + 'Banners');
  }
  LoadBlogById() {
    return this.http.get(this.apiurl + 'blog/' + this.id);
  }
  LoadCountries() {
    return this.http.get(this.apiurl + 'Countries');
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
}
