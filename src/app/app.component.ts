import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'web-redirect';
  ngOnInit(): void {
    (window as any).handleCommunication = this.handleCommunication.bind(this);
  }
  redirect() {
    window.location.replace('https://auto-schema.web.app/callback');
  }
  async handleCommunication(data: any) {
    console.log(data.headers.headers);
    for (const [key, value] of data.headers.headers) {
      console.log(key);
      console.log(value);
    }

    let response = {
      url: 'https://restcountries.com/v2/name/Afghanistan',
      headers: [
        {
          example: 'token',
        },
        {
          example: 'token',
        },
        {
          example: 'token',
        },
      ],
      body: {
        name: 'josh',
      },
      responseType: 'json',
      method: 'get',
    };
    console.log(response);
    return response;
  }
}
