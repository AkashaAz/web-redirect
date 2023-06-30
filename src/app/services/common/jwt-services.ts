import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class JwtService {
  base64url(source) {
    let encodedSource = btoa(source);
    encodedSource = encodedSource.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return encodedSource;
  }

  generateJWT(header, payload, secretKey) {
    const encodedHeader = this.base64url(JSON.stringify(header));
    const encodedPayload = this.base64url(JSON.stringify(payload));
    const signature = btoa(encodedHeader + "." + encodedPayload + secretKey);
    const encodedSignature = signature.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const jwt = encodedHeader + "." + encodedPayload + "." + encodedSignature;

    return jwt;
  }

  generateToken(payload: any): string {
    const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
    const encodedPayload = btoa(JSON.stringify(payload));
    return `${header}.${encodedPayload}.`;
  }
}
