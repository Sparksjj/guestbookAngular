import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { msgService } from "app/msg.service";
import { WebsocketService } from "../websocket.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  comments: any;
  answers = [];
  defaultPage = 1;
  currentPage: any;
  isAdmin = localStorage.getItem("isAdmin");
  userName = localStorage.getItem("userName");
  disableButton = false;

  constructor(
    private msgService: msgService,
    private WebsocketService: WebsocketService,
    private router: Router
  ) {
    this.WebsocketService.socketEvents$.subscribe(e => {
      this.msgService.getComments(this.defaultPage).then(data => {
        (this.comments = data["data"]),
          (this.currentPage = data["current_page"]),
          this.getCurrentAnswers();
      });
      //  console.log(e);
    });
  }

  ngOnInit() {
    if (this.userName == null) {
      this.router.navigate(["/login"]);
      alert("Пройдите авторизацию");
    } else {
      this.msgService.getComments(this.defaultPage).then(data => {
        (this.comments = data["data"]),
          (this.currentPage = data["current_page"]),
          this.getCurrentAnswers();
      });
      this.WebsocketService.bindGeneralEventListiners();
      this.currentPage = this.defaultPage;
    }
  }

  submitForm(form: HTMLFormElement) {
    this.disableButton = true;
    this.msgService.postComment(form).then(data => {
      this.msgService.getComments(this.defaultPage).then(data => {
        this.comments = data["data"];
        this.getCurrentAnswers();
        this.disableButton = false;
      });
    });

    form.reset();
  }

  switchPrevPage() {
    if (this.currentPage <= 1) {
      alert("Текущая страница 1");
    } else {
      const page = this.currentPage - 1;
      this.msgService.getComments(page).then(data => {
        (this.comments = data["data"]), this.getCurrentAnswers();
      });
      this.currentPage = page;
    }
  }

  switchNextPage() {
    const page = this.currentPage + 1;
    this.msgService.getComments(page).then(data => {
      (this.comments = data["data"]), this.getCurrentAnswers();
    });
    this.currentPage = page;
  }

  submitAnswer(form: HTMLFormElement) {
    this.disableButton = true;
    this.msgService.postAnswer(form).then(data => {
      this.disableButton = false;
      this.getCurrentAnswers();
      form.reset();
    });
  }

  getCurrentAnswers() {
    let answerList = [];
    let commentListID = this.comments.map(a => a.comment_id);
    for (let i = 0; i < 5; i++) {
      this.msgService.getAnswers(commentListID[i]).then(data => {
        if (data["length"] != 0) {
          for (let j in data) {
            answerList.push(data[j].message);
          }
          this.comments[i].answer = answerList;
          answerList = [];
        }
      });
    }
  }

  trackByFn(index, item) {
    return item.id;
  }
}
