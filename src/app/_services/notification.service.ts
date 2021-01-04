import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from '../_models'


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
	
  private message = new Subject<Message>();
  private reply = new Subject<string>();

	message$ = this.message.asObservable();
  reply$ = this.reply.asObservable();

  constructor() { }

  sendMessages(content:string, style:string, dismissed:boolean, button1?:object, button2?:object) {
    this.message.next(new Message(content, style, dismissed, button1, button2));
  }

  getReply(action:string) {
    this.reply.next(action);
  }

}
