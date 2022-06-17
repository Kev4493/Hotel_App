import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { Bookings } from '../mock-bookings';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }  // Für was brauchen wir den Constructor in einer Komponente?

  booking: Booking = {
    id: 100,
    name: 'Your Name',
    roomNumber: 100,
    startDate: new Date(),
    endDate: new Date()
  }

  ngOnInit(): void {
    if(this.router.url != '/create') { // Wenn die URL nicht /create ist, dann suche uns eine ID:
      
      var id = Number(this.activatedRoute.snapshot.paramMap.get('id')); // Wir holen von der activated Route die ID.
      var bookingById = Bookings.find(x => x.id == id)!; // Bitte gib uns aus dem Array "Bookings" das booking zurück, wo die ID == Die ID vom Parameter ist.
      this.booking = bookingById;
    }

  }

  save(): void {
    Bookings.push(this.booking);
    this.router.navigate(['bookings']);
  }

}
