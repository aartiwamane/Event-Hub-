import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.css']
})
export class AdmissionFormComponent implements OnInit {

  eventId: string = '';
  eventName: string = '';

  constructor(private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.eventId = params['eventId'];
      this.eventName = params['eventName'];
    });
  }

  onSubmit(form: any) {

    if (!form.valid) {
      alert('Please fill out all required fields before submitting.');
      return;
    }
    const formData = {
      ...form.value,
      eventId: this.eventId,
      eventName: this.eventName
    };

    this.http.post('http://localhost:3000/api/admissions', formData)
      .subscribe({
        next: (res) => {
          console.log('Submitted successfully', res);
          alert('Admission submitted successfully!');
          form.reset();
        },
        error: (err) => {
          console.error('Error submitting admission', err);
          alert('Failed to submit admission.');
        }
      });
  }
}

