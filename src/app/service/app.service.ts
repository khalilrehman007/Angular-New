import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiurl = 'https://beta.ovaluate.com/api/';
  id = 0;
  token: any = localStorage.getItem('token');
  // bearer :any = this.token.replace(/^"(.+)"$/,'$1') ;

  constructor(private http: HttpClient) {
  }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(this.token)
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
  LoadExpertIn() {
    // BlogBanners
    return this.http.get(this.apiurl + 'ExpertIn');
  }
  LoadSpokenLanguages() {
    // BlogBanners
    return this.http.get(this.apiurl + 'SpokenLanguages');
  }
  LoadNationality() {
    // BlogBanners
    return this.http.get(this.apiurl + 'Nationalties');
  }
  LoadFeeback() {
    // BlogBanners
    return this.http.get(this.apiurl + 'GetFeedbacks');
  }
  LoadBlogById(id: any) {
    return this.http.get(this.apiurl + 'blog/' + id);
  }
  LoadCountries() {
    return this.http.get(this.apiurl + 'Countries');
  }
  OvaluateFeatures() {
    return this.http.get(this.apiurl + 'OvaluateFeatures');
  }
  LoadDashboardData(id) {
    return this.http.get(this.apiurl + 'Dashboard/' + id, { headers: this.headers });
  }
  LoadListing(data) {
    return this.http.post(this.apiurl + 'MyListings', data, { headers: this.headers });
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
  LoadTypebyLatLng(e: any) {
    return this.http.get(this.apiurl + 'PropertyType/?Proplat=' + e.lat + '&Proplong=' + e.lng + '&categoryId=' + e.id);
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
  LatestPropertiesListingResidential(data: any) {
    return this.http.post(this.apiurl + 'LatestPropertiesListingResidential', data);
  }
  LatestPropertiesListingCommercial(data: any) {
    return this.http.post(this.apiurl + 'LatestPropertiesListingCommercial', data);
  }
  LoadSimilarProperty(data: any) {
    return this.http.post(this.apiurl + 'SimilarProperties', data);
  }
  PropertyCategories() {
    return this.http.get(this.apiurl + 'PropertyCategories/');
  }
  PropertySortBy() {
    return this.http.get(this.apiurl + 'PropertySortBy/');
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
    return this.http.post(this.apiurl + 'ListingDashboard/', data, { headers: this.headers });
  }
  valuationDashboard(id) {
    return this.http.get(this.apiurl + 'ValuationDashboard/' + id, { headers: this.headers });
  }
  LoadValuationListing(data: any) {
    return this.http.post(this.apiurl + 'MyValuations', data, { headers: this.headers });
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
  PropertyListingRentBuy(data: any) {
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
  AddContactUs(data: any) {
    return this.http.post(this.apiurl + 'AddContactUs', data);
  }
  TeamMembers() {
    return this.http.get(this.apiurl + 'TeamMembers');
  }
  TeamMemberBanner() {
    return this.http.get(this.apiurl + 'TeamMemberBanner');
  }
  HowWorkOvaluate() {
    return this.http.get(this.apiurl + 'HowWorkOvaluate');
  }
  OvaluateOfferings() {
    return this.http.get(this.apiurl + 'OvaluateOfferings');
  }
  UpdatePersonalDetails(data: any) {
    return this.http.post(this.apiurl + 'UpdatePersonalDetails', data);
  }

  StoreLead(data: any) {
    return this.http.post(this.apiurl + 'AddUserLead', data);
  }

  DisplayPropertyListing(data: any) {
    return this.http.post(this.apiurl + 'DisplayPropertyListing', data);
  }
  LoadSearchListing(data: any) {
    return this.http.post(this.apiurl + 'FindPropertites', data, { headers: this.headers });
  }
  ChangePassword(data: any) {
    return this.http.post(this.apiurl + 'ChangePassword', data);
  }
  UpdateImage(data: any) {
    return this.http.post(this.apiurl + 'UpdateImage', data);
  }
  UserProfile(id: any) {
    return this.http.get(this.apiurl + 'UserProfile/' + id);
  }
  MyLeads(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'false',
        "processData": "false",
        "dataType": "json",
      })
    }
    return this.http.post(this.apiurl + 'MyLeads', data);
  }
  MyValuations(id: any) {
    return this.http.get(this.apiurl + 'MyValuations/' + id);
  }
  ValuationPrices(id: any) {
    return this.http.get(this.apiurl + 'ValuationPrices/' + id);
  }
  PropertyPackageType() {
    return this.http.get(this.apiurl + 'PropertyPackageType');
  }
  ExploreCountry(id: any) {
    return this.http.get(this.apiurl + 'ExploreCountry/' + id);
  }
  ValuationDocumentTypes() {
    return this.http.get(this.apiurl + 'ValuationDocumentTypes');
  }
  FindCities(data: any) {
    return this.http.post(this.apiurl + 'FindCities', data);
  }
  BlogLatestNews() {
    return this.http.get(this.apiurl + 'BlogLatestNews');
  }
  BlogFeatures() {
    return this.http.get(this.apiurl + 'BlogFeatures');
  }
  BlogCategories() {
    return this.http.get(this.apiurl + 'BlogCategories');
  }
  FindDistricts(data: any) {
    return this.http.post(this.apiurl + 'FindDistricts', data);
  }
  BlogCategorybyId(id: any) {
    return this.http.get(this.apiurl + 'BlogCategory/' + id);
  }
  ExploreCity(id: any) {
    return this.http.get(this.apiurl + 'ExploreCity/' + id);
  }
  BestAgent(id: any) {
    return this.http.get(this.apiurl + 'BestAgent?countryId=' + id);
  }
  ExploreDistrict(id: any) {
    return this.http.get(this.apiurl + 'ExploreDistrict/' + id);
  }
  NearPlaces(id: any) {
    return this.http.get(this.apiurl + 'NearPlaces/' + id);
  }
  FindCompanies(data) {
    return this.http.post(this.apiurl + 'FindCompanies', data);
  }
  DisplayAgent(data) {
    return this.http.post(this.apiurl + 'DisplayAgent', data);
  }
  AgentAutoCompleteSearch(data) {
    return this.http.post(this.apiurl + 'AgentAutoCompleteSearch', data);
  }
  CompanyLocationAutoCompleteSearch(data: any) {
    return this.http.post(this.apiurl + 'CompanyLocationAutoCompleteSearch', data);
  }

  PropertiesListingResidentialByDistrict(data: any) {
    return this.http.post(this.apiurl + 'PropertiesListingResidentialByDistrict', data);
  }
  PropertiesListingCommercialByDistrict(data: any) {
    return this.http.post(this.apiurl + 'PropertiesListingCommercialByDistrict', data);
  }
  ValuationPayment(data: any) {
    return this.http.post(this.apiurl + 'ValuationPayment', data);
  }
  FindAgents(data: any) {
    return this.http.post(this.apiurl + 'FindAgents', data);
  }
  GenerateReport(data: any) {
    // return this.http.get(this.apiurl + 'GenerateReport?ReportNumberCode=' + data);
    return this.http.request("Get", this.apiurl + 'GenerateReport?ReportNumberCode=' + data, {
      body: "",
      observe: "response",
      responseType: "blob",
    });
  }
  getLatLng(address: any) {
    return this.http.get(environment.mapbox.geoCoder + address + ".json?types=address&access_token=" + environment.mapbox.accessToken);
  }
  FavoriteAddRemove(status: any, data: any) {
    if (status == true) {
      return this.http.post(this.apiurl + 'RemoveFavorite', data, { headers: this.headers });
    } else {
      return this.http.post(this.apiurl + 'AddToFavorite', data, { headers: this.headers });
    }
  }
}
