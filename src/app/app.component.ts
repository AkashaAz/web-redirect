import { Component } from "@angular/core";
import { MiddlewareConfigService } from "./services/common/configMiddleware";
import { Ga4Service } from "./services/common/config-GA4.service";
import { ApiService } from "./services/api";
import * as jose from "jose";
import jwt_decode from "jwt-decode";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "web-redirect";
  constructor(private middlewareConfigService: MiddlewareConfigService, private ga4Service: Ga4Service, private apiService: ApiService) {}
  checkTokenMfaf: any;
  ngOnInit(): void {
    this.getJwks()
    console.log(this.checkTokenMfaf);
    console.log(this.ga4Service.checkEnvConfig("insurance"));
    (window as any).checkConfigMiddleware = this.checkConfigMiddleware.bind(this);
    (window as any).handleCommunication = this.handleCommunication.bind(this);
  }
  redirect() {
    window.location.replace("https://auto-schema.web.app/callback");
  }
  async checkConfigMiddleware() {}
  async handleCommunication(data: any) {
    //add header
    data.headers.headers.set("cache-Control", ["no-cache"]);
    data.headers.normalizedNames.set("cache-Control", "Cache-Control");
    // for (const [key, value] of data.headers.headers) {
    //   console.log(key);
    //   console.log(value);
    // }
    // check header

    // change url
    data.url = "https://restcountries.com/v2/name/Afghanistan";
    data.urlWithParams = "https://restcountries.com/v2/name/Afghanistan";

    console.log(data.headers.headers);
    console.log(data);
    return data;
  }
  private async getJwks() {
    try {
      await this.apiService
        .getOidc()
        .toPromise()
        .then(async (res: any) => {
          await this.apiService
            .getJwks(res.jwks_uri)
            .toPromise()
            .then(async (result: any) => {
              interface token {
                login_token: string;
              }
              const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
              let decoded: token = jwt_decode(accessToken ?? "");
              console.log(decoded);
              const JWKS = jose.createLocalJWKSet(result);
              interface loginToken {
                iss: string;
                aud: string;
              }
              let loginToken: loginToken = jwt_decode(decoded.login_token);
              const verify = await jose
                .jwtVerify(decoded.login_token, JWKS, {
                  issuer: loginToken.iss,
                  audience: loginToken.aud,
                })
                .then(
                  (res) => {
                    return res ? true : false;
                  },
                  (error) => {
                    console.log(error);
                    console.log("not Mfaf");
                    return false;
                  }
                );
              this.checkTokenMfaf = verify;
            });
        });
    } catch (error) {
      console.log(error);
      this.checkTokenMfaf = false
      console.log("catch");
    }
  }
}
