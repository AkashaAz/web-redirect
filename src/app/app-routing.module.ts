import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnonymousAuthGuard } from "./services/common/AnonymousAuthGuard";
const routes: Routes = [
  {
    path: "auto-schema",
    canLoad: [AnonymousAuthGuard],
    loadChildren: () => import("./modules/auto-schema/auto-schema.module").then((m) => m.AutoSchemaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
