import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NotificationService } from '../../_services';
import { Subscription } from 'rxjs';

@Component({
  selector: '[id=notifications]',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {

  @Input() message: any; style: any; dismissed: any; button1: any; button2: any;

	hasNotofication:boolean = false;
	subscription: Subscription | undefined;
  timeOut:any;
  
  constructor(private notificationService: NotificationService) { 

  }

  ngOnInit(): void {
    // clearTimeout(this.timeOut);
    // this.hasNotofication = false;
    this.showNotify()
  }

  showNotify() {
    this.subscription = this.notificationService.message$.subscribe(message => {
      clearTimeout(this.timeOut);
      this.message = message.content;
      this.style = message.style;
      this.button1 = message.button1;
      this.button2 = message.button2;
      this.hasNotofication = true;
      this.checkDismiss(message.dismissed);
    });
  }

  checkDismiss(dismissed:boolean) {
  	if(dismissed) {
  		this.timeOut = setTimeout(()=>{
		      this.hasNotofication = false;
			}, 5000);
  	}
  }

  clicked(link:string) {
    this.notificationService.getReply(link);
    this.hasNotofication = false;
  }

}
