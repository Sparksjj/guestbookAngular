import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommentsComponent } from "./comments/comments.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const appRoutes: Routes = [
  //localhost:4200
  { path: "", component: CommentsComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
