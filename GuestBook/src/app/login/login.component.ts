import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { msgService } from "app/msg.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private msgService: msgService, private router: Router) {}
  comments: Comment[] = [];
  ngOnInit() {}

  submitForm(form: HTMLFormElement) {
    this.msgService.login(form).subscribe(e => {
      this.router.navigate(["/"]);
    });
  }

  logout() {
    localStorage.clear();
    alert("Вы вышли");
    this.msgService.apiToken = "";
    this.msgService.userName = "";
    this.router.navigate(["/"]);
  }

  register() {
    if (localStorage.getItem("userName") == null) {
      this.router.navigate(["/register"]);
    }
  }
}
