import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

@Injectable()
export class msgService {
  constructor(private http: HttpClient) {}

  apiToken: string = localStorage.getItem("apiToken");
  isAdmin: string = localStorage.getItem("isAdmin");
  userID: string = localStorage.getItem("userID");
  userName: string = localStorage.getItem("UserName");

  // email: rodnenok@test.com
  // password: qwerty
  // name: RodnenokTest
  // avatar: (binary)

  register(form: HTMLFormElement, avatar: any) {
    let email = form.value.email;
    let password = form.value.password;
    let name = form.value.name;

    const FD = new FormData();
    FD.append("email", email);
    FD.append("password", password);
    FD.append("name", name);
    FD.append("avatar", avatar);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json"
      })
    };

    return new Promise((resolve, reject) => {
      this.http
        .post("http://pusher.cpl.by/api/v1/auth/register", FD, httpOptions)
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  login(form: HTMLFormElement) {
    let email = form.value.email;
    let password = form.value.password;

    const FD = new FormData();
    FD.append("email", email);
    FD.append("password", password);

    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json"
      })
    };

    return this.http
      .post("http://pusher.cpl.by/api/v1/auth/login", FD, httpOptions)
      .pipe(
        tap(e => {
          this.apiToken = e["api_token"];
          this.isAdmin = e["is_admin"];
          this.userID = e["id"];
          localStorage.setItem("apiToken", e["api_token"]);
          localStorage.setItem("isAdmin", e["is_admin"]);
          localStorage.setItem("userID", e["id"]);
          localStorage.setItem("userName", e["name"]);
          console.log(e);
        })
      );
  }

  getComments(page: any) {
    const params = new HttpParams()
      .set("api_token", this.apiToken)
      .set("page", page);
    const options = { params };
    return new Promise((resolve, reject) => {
      this.http
        .get("http://pusher.cpl.by/api/v1/comment", { params })
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getAnswers(commentID: any) {
    const params = new HttpParams().set("api_token", this.apiToken);
    let url = "http://pusher.cpl.by/api/v1/comment/" + commentID + "/answer";
    return new Promise((resolve, reject) => {
      this.http.get(url, { params }).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  postComment(form: HTMLFormElement) {
    let title = form.value.title;
    let message = form.value.message;

    const FD = new FormData();
    FD.append("title", title);
    FD.append("message", message);

    const params = new HttpParams().set("api_token", this.apiToken);
    const options = { params: params };

    return new Promise((resolve, reject) => {
      this.http
        .post("http://pusher.cpl.by/api/v1/comment", FD, { params })
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  postAnswer(form: HTMLFormElement) {
    let message = form.value.message;
    // let apiToken = form.value.apitoken;
    let userid = form.value.userid;
    let commentid = form.value.commentid;
    let url =
      "http://pusher.cpl.by/api/v1/comment/" + form.value.commentid + "/answer";

    const FD = new FormData();
    FD.append("message", message);
    const params = new HttpParams().set("api_token", this.apiToken);

    return new Promise((resolve, reject) => {
      this.http.post(url, FD, { params }).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    });
  }
}
