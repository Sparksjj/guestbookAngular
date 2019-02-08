import { Injectable } from "@angular/core";
import Echo from "laravel-echo";
import { BehaviorSubject, Subject } from "rxjs";
import * as io from "socket.io-client";
declare global {
  interface Window {
    io: any;
  }
}
@Injectable()
export class WebsocketService {
  socketInstance: Echo;
  socketEvents$: Subject<any> = new Subject();
  isConnected$ = new BehaviorSubject(null);
  private host: string = "http://pusher.cpl.by:6020";
  constructor() {
    window.io = io;
    console.log(
      (this.socketInstance = new Echo({
        broadcaster: "socket.io",
        host: this.host,
        auth: {
          headers: {
            Authorization: localStorage.getItem("apiToken")
          }
        }
      }))
    );

    this.socketInstance.channel("public-push").listen("PublicPush", e => {
      //console.log(e);
      alert(e.action + " " + e.comment.title + " " + e.comment.message);
    });

    let privateChannel = "user." + localStorage.getItem("userID");
    this.socketInstance.private(privateChannel).listen("UserPush", e => {
      alert(e.data.action + " " + e.data.answer.message);
    });

    this.socketInstance
      .channel("public-push")
      .listen("PublicPush", e => this.socketEvents$.next(e));

    this.socketInstance
      .private(privateChannel)
      .listen("UserPush", e => this.socketEvents$.next(e));
  }

  bindGeneralEventListiners() {
    const socket: SocketIOClient.Socket = this.socketInstance.connector.socket;

    socket.on("connect", () => {
      // Fired upon a connection including a successful reconnection.
      console.log(`Socket connected to ${this.socketInstance.options.host}`);
    });

    socket.on("disconnect", (reason: string) => {
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        console.log("Socket disconnection was initiated by the server", reason);
      }

      console.log("Socket disconnected");
      // else the socket will automatically try to reconnect
    });

    socket.on("connect_error", error => {
      // Fired upon a connection error.
      console.log("Socket connect_error");
    });

    socket.on("connect_timeout", timeout => {
      // Fired upon a connection timeout.
      console.log("Socket connect_timeout");
    });

    socket.on("error", error => {
      // Fired when an error occurs.
      console.log("Socket error");
    });
  }
}
