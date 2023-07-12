import { Component, HostListener } from "@angular/core";
import { MiddlewareConfigService } from "./services/common/configMiddleware";
import { Ga4Service } from "./services/common/config-GA4.service";
import { ApiService } from "./services/api";
import * as jose from "jose";
import jwt_decode from "jwt-decode";
// import { JwtService } from "./services/common/jwt-services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "web-redirect";
  constructor(
    private middlewareConfigService: MiddlewareConfigService,
    private ga4Service: Ga4Service,
    private apiService: ApiService // private jwtService: JwtService
  ) {}
  @HostListener("window:scroll", ["$event"])
  @HostListener("touchmove", ["$event"])
  handleTouch(event) {
    let touch = event.touches[0] || event.changedTouches[0];
    // console.log(touch.pageY);
    this.scroll = touch.pageY;
  }
  scroll = 0;
  // onScrollEvent($event) {
  //   // console.log($event);
  //   let element = document.getElementById("scroll");
  //   if (element) {
  //     console.log(element.scrollHeight);
  //     console.log(element.clientHeight);
  //   }
  //   this.scroll = window.scrollY;
  //   // console.log(window.scrollY);
  // }
  ngAfterViewChecked() {
    console.log(this.scroll);
  }

  checkTokenMfaf: any;
  ngOnInit(): void {
    console.log(document.documentElement.clientHeight);
    // let checkToken = this.getJwks();
    const payload = { id: 1, username: "example" };
    const token = this.generateToken(payload);
    console.log(token);
    console.log(this.ga4Service.checkEnvConfig("insurance"));
    (window as any).checkConfigMiddleware = this.checkConfigMiddleware.bind(this);
    (window as any).handleCommunication = this.handleCommunication.bind(this);
  }
  redirect() {
    window.location.replace("https://auto-schema.web.app/callback");
  }
  generateToken(payload: any): string {
    const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
    const encodedPayload = btoa(JSON.stringify(payload));
    return `${header}.${encodedPayload}.`;
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
  // getScroll() {
  //   this.scrollY = window.scrollY;
  // }
  // onScroll(event) {
  //   this.scrollY = window.scrollY;
  //   console.log(this.scrollY);
  // }
  // onScroll(event) {
  //   console.log(event);
  //   this.scrollY = window.scrollY;
  //   console.log(this.scrollY);
  // }
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
      this.checkTokenMfaf = false;
      console.log("catch");
    }
    console.log(this.checkTokenMfaf);
  }
}
