import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit
{
    events : any[] = [];

    constructor(private _eventService: EventService,private router: Router) { }
    

    
  ngOnInit() 
  {
    this._eventService.getEvents()
      .subscribe(
        res => this.events = res,
        err => console.log(err)
      )
  }
  openAdmissionForm(event: any) {
    this.router.navigate(['/admission-form'], { 
      queryParams: { 
        eventId: event._id, 
        eventName: event.name 
      } 
    });
}
}