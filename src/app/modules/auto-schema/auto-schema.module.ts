import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoSchemaRoutingModule } from './auto-schema-routing.module';
import { AutoSchemaComponent } from './auto-schema-web/auto-schema-web.component';
import { MainAutoSchemaComponent } from './main-auto-schema-web/main-auto-schema.component';

@NgModule({
  declarations: [MainAutoSchemaComponent, AutoSchemaComponent],
  imports: [CommonModule, AutoSchemaRoutingModule],
})
export class AutoSchemaModule {}
