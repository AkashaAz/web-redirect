import { Component } from "@angular/core";
import { MiddlewareConfigService } from "./services/common/configMiddleware";
import { Ga4Service } from "./services/common/config-GA4.service";
import { ApiService } from "./services/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "web-redirect";
  constructor(private middlewareConfigService: MiddlewareConfigService, private ga4Service: Ga4Service, private apiService: ApiService) {}
  ngOnInit(): void {
    this.getJwks();
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
  private getJwks() {
    this.apiService.getJwks().subscribe(async (res: any) => {
      console.log(res);
    });
  }
}
