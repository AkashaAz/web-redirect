import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpBackend } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getOidc() {
    return this.http.get("https://mfaf-party-stg.adldigitalservice.com/oidc/.well-known/openid-configuration", {
      headers: {},
    });
  }
  public getJwks(url: any) {
    return this.http.get(url, {
      headers: {},
    });
  }
}
