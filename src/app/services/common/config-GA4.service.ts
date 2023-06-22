import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class Ga4Service {
  constructor() {}
  configGA4 = [
    {
      name: "insurance",
      production: true,
      staging: true,
    },
    {
      name: "foodDelivery",
      production: true,
      staging: true,
    },

    {
      name: "wellBeing",
      production: true,
      staging: true,
    },
    {
      name: "banking",
      production: true,
      staging: true,
    },
    {
      name: "retail",
      production: true,
      staging: true,
    },
    {
      name: "consent",
      production: true,
      staging: true,
    },
    {
      name: "tryMe",
      production: true,
      staging: true,
    },
    {
      name: "mylifeplus",
      production: true,
      staging: true,
    },
    {
      name: "gourmet",
      production: true,
      staging: true,
    },
  ];
  env = environment.env;
  checkEnvConfig(businessDomain: string) {
    let configGA4;
    this.env == "production"
      ? this.configGA4.some((e) => {
          if (e.name == businessDomain) {
            configGA4 = e.production;
            return true;
          }
          return;
        })
      : this.configGA4.some((e) => {
          if (e.name == businessDomain) {
            configGA4 = e.staging;
            return true;
          }
          return;
        });
    return configGA4;
  }
}
