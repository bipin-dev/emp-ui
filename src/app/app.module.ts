import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { WorkflowComponent } from "./workflow/workflow.component";
import { ActionsComponent } from "./actions/actions.component";
import { NavsComponent } from "./navs/navs.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { InlineActionsComponent } from "./inline-actions/inline-actions.component";
import { FormArrayComponent } from './form-array/form-array.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    WorkflowComponent,
    ActionsComponent,
    NavsComponent,
    InlineActionsComponent,
    FormArrayComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
