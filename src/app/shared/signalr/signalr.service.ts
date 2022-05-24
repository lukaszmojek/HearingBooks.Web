import { Injectable } from '@angular/core';

import * as signalR from "@microsoft/signalr";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: signalR.HubConnection;

  constructor() { }

  connect(): void {
    if (this.connection)
      return;
      
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseSignalRUrl}/syntheses`)
      .build();

    this.connection.on("messageReceived", (username: string, message: string) => {
      console.log('dupa')
    });
    
    this.connection.start().catch(err => document.write(err));
  }

  send(username: string, message: string): void {
    this.connection.send("SendMessage", username, message)
      .then((_) => _);
  }
}
