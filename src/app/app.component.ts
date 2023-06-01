import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "web-redirect";
  ngOnInit(): void {
    (window as any).handleCommunication = this.handleCommunication.bind(this);
  }
  redirect() {
    window.location.replace("https://auto-schema.web.app/callback");
  }
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
}
