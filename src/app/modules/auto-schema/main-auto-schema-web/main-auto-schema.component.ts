import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-auto-schema',
  templateUrl: './main-auto-schema.component.html',
  styleUrls: ['./main-auto-schema.component.scss'],
})
export class MainAutoSchemaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // const mainAutoSchemaComponent = (window as any).MainAutoSchemaComponent();
    // console.log(mainAutoSchemaComponent);
    this.importElmScript();
    this.importElmScriptTest();
    // document.addEventListener('apiCallEvent', (event) => {
    //   const message = event;
    //   console.log('API call event triggered:', message);
    //   // Additional event handling logic
    //   return 'JOSH';
    // });
  }
  importElmScript(): void {
    const body = document.body;
    const elmScript = 'https://auto-schema.web.app/assets/main/main.js';
    const script = document.createElement('script');
    script.src = elmScript;
    script.type = 'text/javascript';
    script.onerror = () => console.error(`Error load script ${elmScript}`);
    body.appendChild(script);
    // const myComponent = new main.js();
  }
  importElmScriptTest(): void {
    const elmScript = document.createElement('script');
    elmScript.innerHTML = 'console.log(new Date())';
    document.body.appendChild(elmScript);
  }
}
