import { Component, OnInit } from "@angular/core";
import { MiddlewareConfigService } from "../../../services/common/configMiddleware";
@Component({
  selector: "app-main-auto-schema",
  templateUrl: "./main-auto-schema.component.html",
  styleUrls: ["./main-auto-schema.component.scss"],
})
export class MainAutoSchemaComponent implements OnInit {
  constructor(private middlewareConfigService: MiddlewareConfigService) {}

  ngOnInit(): void {
    this.importElmScript();
    this.importElmScriptTest();
  }
  importElmScript(): void {
    const body = document.body;
    const elmScript = "https://auto-schema.web.app/assets/main/main.js";
    const script = document.createElement("script");
    script.src = elmScript;
    script.type = "text/javascript";
    script.onerror = () => console.error(`Error load script ${elmScript}`);
    body.appendChild(script);
    // const myComponent = new main.js();
  }
  importElmScriptTest(): void {
    const elmScript = document.createElement("script");
    elmScript.type = "text/javascript";
    elmScript.innerHTML = `var middlewareConfig = ${this.middlewareConfigService.insurance}`;
    document.body.appendChild(elmScript);
  }
}
