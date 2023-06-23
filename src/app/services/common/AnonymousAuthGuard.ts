import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AnonymousAuthGuard implements CanLoad {
  private accessToken: any;
  constructor(private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log(route);
    return true;
  }
}
