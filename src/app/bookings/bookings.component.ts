import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  constructor(private bookingService:BookingService) { }

  bookings : Booking[] = [];

  ngOnInit(): void {
    this.bookings = this.bookingService.getBookings();
  }

  deleteBooking(booking: Booking): void {
    this.bookingService.deleteBooking(booking);
  }

}
