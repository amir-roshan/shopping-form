import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-name-address-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './name-address-form.component.html',
  styleUrl: './name-address-form.component.css',
})
export class NameAddressFormComponent {
  firstName: string = '';
  lastName: string = '';
  streetAddress: string = '';

  @Output() formSubmitted = new EventEmitter<{
    firstName: string;
    lastName: string;
    streetAddress: string;
  }>();

  onSubmit() {
    console.log('Form Submitted:');
    console.log(`First Name: ${this.firstName}`);
    console.log(`Last Name: ${this.lastName}`);
    console.log(`Street Address: ${this.streetAddress}`);

    this.formSubmitted.emit({
      firstName: this.firstName,
      lastName: this.lastName,
      streetAddress: this.streetAddress,
    });
  }
}
