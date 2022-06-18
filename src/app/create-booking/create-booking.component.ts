import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {

  constructor(  // Für was brauchen wir den Constructor in einer Komponente?
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private bookingService:BookingService) { }  

  booking: Booking = {
    id: 100,
    name: 'Your Name',
    roomNumber: 100,
    startDate: new Date(),
    endDate: new Date()
  }

  ngOnInit(): void {
    if (this.router.url != '/create') { // Wenn die URL nicht /create ist, dann suche uns eine ID:

      var id = Number(this.activatedRoute.snapshot.paramMap.get('id')); // Wir holen von der activated Route die ID.
      var bookingById = this.bookingService.getBookingById(id);
      this.booking = bookingById;
    }

  }

  save(): void {
    var bookingById = this.bookingService.getBookingById(this.booking.id);

    if(bookingById == null || bookingById == undefined) {
      this.bookingService.addBooking(this.booking);
    } else {
      this.bookingService.updateBooking(this.booking);
    }

    this.router.navigate(['bookings']);
  }

  dateChanged(event: Event, isStart: boolean) {
    var val = (event.target as HTMLInputElement).value;

    if (isStart == true) {
      this.booking.startDate = new Date(val);
    } else {
      this.booking.endDate = new Date(val);
    }
  }

}
