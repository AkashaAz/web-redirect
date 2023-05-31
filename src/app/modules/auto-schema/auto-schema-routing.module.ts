import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoSchemaComponent } from './auto-schema-web/auto-schema-web.component';
import { MainAutoSchemaComponent } from './main-auto-schema-web/main-auto-schema.component';

const routes: Routes = [
  {
    path: '',
    component: MainAutoSchemaComponent,
    data: { role: '' },
    children: [
      {
        path: '',
        component: AutoSchemaComponent,
        data: { role: '' },
        children: [
          {
            path: '**',
            component: AutoSchemaComponent,
            data: { role: '' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoSchemaRoutingModule {}
