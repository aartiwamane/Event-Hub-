import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  
  private _eventsUrl = "https://event-hub-wdvo.onrender.com/api/events";
  private _specialEventsUrl = "https://event-hub-wdvo.onrender.com/api/special";


  constructor(private http :HttpClient) { }

  // getEvents() {
  //   return this.http.get<any>(this._eventsUrl)
  // }
  getEvents() {
  return this.http.get<any>(this._eventsUrl, {
  headers: { 'Content-Type': 'application/json' }
});

}

  // getSpecialEvents() {
  //   return this.http.get<any>(this._specialEventsUrl)
  // }

  getSpecialEvents() {
  return this.http.get<any>(this._specialEventsUrl, {
  headers: { 'Content-Type': 'application/json' }
});

}
}
