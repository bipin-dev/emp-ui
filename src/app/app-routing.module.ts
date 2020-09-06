import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { WorkflowComponent } from "./workflow/workflow.component";

const routes: Routes = [
  { path: "login", component: AdminLoginComponent },
  { path: "wrk/:wf", component: WorkflowComponent },
  { path: "wrk/", component: WorkflowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
