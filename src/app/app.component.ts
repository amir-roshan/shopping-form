import { Component } from '@angular/core';
import { NameAddressFormComponent } from './name-address-form/name-address-form.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { SummaryFormComponent } from './summary-form/summary-form.component';
import { first, last } from 'rxjs';
interface ProductItem {
  item: string;
  price: number;
  num: number;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NameAddressFormComponent, ItemFormComponent, SummaryFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fName: string = '';
  lName: string = '';
  address!: string;

  itemData!: ProductItem;

  handleFormSubmit(data: {
    firstName: string;
    lastName: string;
    streetAddress: string;
  }) {
    this.fName = data.firstName;
    this.lName = data.lastName;
    this.address = data.streetAddress;
  }

  handleItemSelected(data: { item: string; price: number; num: number }) {
    this.itemData = { item: data.item, price: data.price, num: data.num };
  }
}
