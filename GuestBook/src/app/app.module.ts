import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppMemoryService } from "./app-memory.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommentsComponent } from "./comments/comments.component";
import { LoginComponent } from "./login/login.component";
import { msgService } from "./msg.service";
import { RegisterComponent } from "./register/register.component";
import { ReversePipe } from "./shared/reverse.pipe";
import { WebsocketService } from "./websocket.service";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CommentsComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [ReversePipe],
  providers: [msgService, WebsocketService, AppMemoryService],
  bootstrap: [AppComponent]
})
export class AppModule {}
