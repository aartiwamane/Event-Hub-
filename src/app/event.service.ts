import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  
  private _eventsUrl = "http://https://event-hub-wdvo.onrender.com/api/events";
  private _specialEventsUrl = "http://https://event-hub-wdvo.onrender.com/api/special";


  constructor(private http :HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventsUrl)
  }
}
