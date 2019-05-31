import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebsocketService],
})
export class AppComponent implements OnInit {
  constructor(private websocketService: WebsocketService) {}
  ngOnInit() {
    let i = 0;
    setInterval(() => {
      i++;
      throw new Error(`${i} OMG!!!`);
    }, 5000);
  }
}
