import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'auto-schema',
    loadChildren: () =>
      import('./modules/auto-schema/auto-schema.module').then(
        (m) => m.AutoSchemaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
