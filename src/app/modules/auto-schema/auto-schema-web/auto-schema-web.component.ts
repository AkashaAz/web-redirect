import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-auto-schema',
  templateUrl: './auto-schema-web.component.html',
  styleUrls: ['./auto-schema-web.component.scss'],
})
export class AutoSchemaComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {
    this.onLoadWebElement();
  }

  private onLoadWebElement(): void {
    const conf = 'auto-schema';
    const htmlTag = document.getElementById('auto-schema');
    const htmlElm: HTMLElement = document.createElement(conf);
    htmlElm.addEventListener('message', (msg) => this.handleMessage(msg));
    if (htmlTag) {
      htmlTag.appendChild(htmlElm);
    }
    const eventRoute: any = new CustomEvent('auto-schemaroute', {
      detail: this.location.path(),
    });
    document.dispatchEvent(eventRoute);
  }
  handleMessage(msg: any): void {
    // tslint:disable-next-line:no-console
    console.debug('shell received message: ', msg.detail);
  }
}
