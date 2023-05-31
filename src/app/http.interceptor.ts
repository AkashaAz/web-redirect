import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { formatDate } from '@angular/common';
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Remove the Authorization header from the request
    // const modifiedRequest = request.clone({
    //   headers: request.headers.delete("Authorization"),
    // });
    // let accessToken = localStorage.getItem("Authorization") || "";
    // let setHeaders: any = {
    //   //   Authorization: accessToken,
    //   "X-Transaction-Id": "230509dw9N43465Vv1",
    //   "x-tid": "SGL-230509jjacvMjJhX6f",
    //   //   "Access-Control-Expose-Headers": "Authorization",
    // };
    // request = request.clone({ setHeaders });
    console.log('interceptor web-redirect');
    // Pass on the modified request to the next interceptor
    return next.handle(request);
  }
}
