import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "../api";
import * as jose from "jose";
import jwt_decode from "jwt-decode";
import { JwtService } from "./jwt-services";

@Injectable({
  providedIn: "root",
})
export class AnonymousAuthGuard implements CanLoad {
  private accessToken: any;
  constructor(private router: Router, private apiService: ApiService, private jwtService: JwtService) {}
  tokenMfaf: any;
  checkTokenMfaf: any;
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log(route);
    return new Promise(async (resolve) => {
      await this.apiService
        .testAPi()
        .toPromise()
        .then(
          async (res: any) => {
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
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
                      this.tokenMfaf = res;
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
      if (this.checkTokenMfaf) {
        try {
          const mobileNumber = `0${this.tokenMfaf.payload.login_mobile_number.substr(2)}`;
          //   const data = {
          //     memberId: "",
          //     firstname: mobileNumber,
          //     lastname: mobileNumber,
          //     username: mobileNumber,
          //     accountCategory: "",
          //   };
          const data = {
            memberId: "5yzk0DGH0So",
            firstname: "Sirin",
            lastname: "T",
            username: "sirit603@chare.postbox.in.th",
            accountCategory: "residential",
            ial: "1.1",
            roles: [],
            iat: 1683863449,
          };
          const header = {
            alg: "HS256", // Algorithm used for signing the token (e.g., HMAC with SHA-256)
            typ: "JWT", // Token type
          };
          const jwtKey = "SGL_SECRET_R4ND0M_!@#$%^&*_CUR";
          localStorage.setItem("X-Digitalco-Id", `${this.jwtService.generateJWT(header, data, jwtKey)}`);
          const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
          localStorage.setItem("Authorization", `Bearer ${accessToken}`);
          await this.apiService
            .testGetParner(this.jwtService.generateJWT(header, data, jwtKey), accessToken)
            .toPromise()
            .then(
              async (res: any) => {
                console.log(res);
              },
              (error) => {
                console.log(error);
              }
            );
          resolve(true);
        } catch (error) {
          this.router.navigateByUrl("/error");
        }
      } else {
      }
      //   if (this.isTokenAndXDigitalCoId() && this.isExpireAccessToken()) {
      //     resolve(true);
      //   } else {
      //     this.logger.log("=== canLoad Else ====");
      //     if (this.authService.checkCookies()) {
      //       this.router.navigateByUrl("/error");
      //     } else {
      //       this.authService.authAnonymous().subscribe(
      //         (response) => {
      //           this.logger.log("== resonse ===", response);
      //           resolve(true);
      //         },
      //         (error) => {
      //           this.router.navigateByUrl("/error");
      //         }
      //       );
      //     }
      //   }
    });
  }
}
