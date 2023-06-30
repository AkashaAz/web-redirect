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
  public testGetParner(xdigitalco, accesstoken) {
    return this.http.get("https://api-dev.adldigitalservice.com/digitalco/api/v3/digitalco/partner-management/servicecategories", {
      headers: {
        "X-Tid": "CO-230512cHQxPxL5FBEo",
        "X-Transaction-Id": "230512DMTUMF5RJXX8",
        "X-Digitalco-Id": xdigitalco,
        Authorization: `Bearer ${accesstoken}`,
      },
    });
  }
  public testAPi() {
    return this.http.get(
      "https://stg-digital.ais.th/digitalco/api/v3/digitalco/merchant-management/merchantcategories?merchantId=dRQ9cZO6t4g&language=th&limit=30",
      {
        headers: {
          "X-Tid": "SGL-230629xLhBkz3x8vzt",
          "X-Transaction-Id": "2306298qsqRQqWiuk3",
          "X-Digitalco-Id":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6InRUcURtNFYzRXRiIiwiZmlyc3RuYW1lIjoiMDY1OTMzMTIxNiIsImxhc3RuYW1lIjoiMDY1OTMzMTIxNiIsInVzZXJuYW1lIjoiMDY1OTMzMTIxNiIsImFjY291bnRDYXRlZ29yeSI6InJlc2lkZW50aWFsIiwiaWFsIjoiMS4xIiwicm9sZXMiOltdLCJpYXQiOjE2ODgwMjEwOTZ9.HE63yhvjSlx5ZzqYh3HbYTRgF4fYKNx4GZSKoPtj01w",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNHZjV1a1ZONDIifQ.eyJpc3MiOiJzcmYuYWlzLmNvLnRoL2FkbWQiLCJzdWIiOiJ0b2tlbl9wYXNzd29yZCIsImF1ZCI6IkV1dkRUUW02MXpDVGxDbmd0OFE4WWtzbHpzTXlYaHdRSm1UK3h4N0J1WW1pdFE3Z2t5ODlkQT09IiwiZXhwIjoxNjg4MTA3NDk2LCJpYXQiOjE2ODgwMjEwOTYsImp0aSI6IjEycE1RMTdOMDhpelBnR2N2emJlYncxNjg4MDIxMDk2IiwicGlkIjoialVuZHM0JlIyUmtlQTVjVzdnYnFlR3ZaR2NLVGwxU2xGcVJYSmlPR0l4TVMxQlJFMUVMVTVFWmxGV2FFdDBNR1JQVm5OWFJVOVVRMnQ2YlN0SFNHY3ZSMjFQWjI1MGRsbEhVMEpVTURjMU9HOUhNM3BoUkhOck0zVXpVVEozUkdzMlJXazBXalU9ViYxNSIsImNsaWVudCI6Ik9UQXdNREF3TURBd01EQXdOall4TEdScFoybDBZV3hqYjN4Q2NtOTNjMlZ5ZkRFdU1DNHciLCJzc2lkIjoiZDA4U2MyczRnTmZ0N2JqMnJNODYwSiIsImF1dCI6eyJ0eXBlIjoidXNlcm5hbWUiLCJhY3Rpb24iOiJsb2dpbiIsImxvZ2luX2NoYW5uZWwiOiJ1c2VyX3Bhc3N3b3JkIiwibmV0d29yayI6ImFub255bW91cyJ9LCJuYmYiOjE2ODgwMTkyOTZ9.AzLqWr6le4-adHFLASWo03WNKZLaOdhpCNIc-i_z0oSicI4AOBOLArM0Revu3Gk98tSOV4T9_97HlvzEIOpX-bApjJjRPcEvTHzJSBsq0PENvKWNRc6tEUs1-z2FxAs009ihoAgu4SVIfBiarnU186NlFW22-FvpLRCctgX-zPo",
        },
      }
    );
  }
}
