import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpBackend } from "@angular/common/http";

export class ApiService {
  httpClient;
  constructor(private http: HttpClient, httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  public getJwks() {
    return this.http.get("https://mfaf-party-stg.adldigitalservice.com/oidc/.well-known/openid-configuration", {
      headers: {},
    });
  }
}
