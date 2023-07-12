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

  base64UrlDecode = (base64Url) => {
    const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
    const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");

    const decodedData = atob(base64);
    const uint8Array = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; ++i) {
      uint8Array[i] = decodedData.charCodeAt(i);
    }

    return uint8Array;
  };

  decodeJwtToken = (jwtToken, secretKey) => {
    const [headerBase64Url, payloadBase64Url, signature] = jwtToken.split(".");

    const header = JSON.parse(new TextDecoder().decode(this.base64UrlDecode(headerBase64Url)));
    const payload = JSON.parse(new TextDecoder().decode(this.base64UrlDecode(payloadBase64Url)));

    return { header, payload, signature };
  };
}
