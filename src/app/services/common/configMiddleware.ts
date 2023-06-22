import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MiddlewareConfigService {
  constructor() {}
  insuranceConfig = true;
  foodDeliveryConfig = true;
  wellBeingConfig = true;
  bankingConfig = true;
  retailConfig = true;
  consentConfig = true;
  tryMeConfig = true;
  mylifeplusConfig = true;
  gourmetConfig = true;

  get insurance(): any {
    return this.insuranceConfig;
  }
  get foodDelivery(): any {
    return this.foodDeliveryConfig;
  }
  get wellBeing(): any {
    return this.wellBeingConfig;
  }
  get banking(): any {
    return this.bankingConfig;
  }
  get retail(): any {
    return this.retailConfig;
  }
  get consent(): any {
    return this.consentConfig;
  }
  get tryMe(): any {
    return this.tryMeConfig;
  }
  get mylifeplus(): any {
    return this.mylifeplusConfig;
  }
  get gourmet(): any {
    return this.gourmetConfig;
  }
}
