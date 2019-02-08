import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { msgService } from "app/msg.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  constructor(private msgService: msgService, private router: Router) {}

  selectedFiles: FileList;

  ngOnInit() {}

  onFileChange(event) {
    this.selectedFiles = event.target.files[0];
  }
  submitForm(form: HTMLFormElement) {
    this.msgService.register(form, this.selectedFiles).then(data => {
      this.msgService.login(form).subscribe(e => this.router.navigate(["/"]));
    });
  }
}
