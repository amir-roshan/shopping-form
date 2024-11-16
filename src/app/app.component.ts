import { Component } from '@angular/core';
import { NameAddressFormComponent } from './name-address-form/name-address-form.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { SummaryFormComponent } from './summary-form/summary-form.component';
interface ProductItem {
  item: string;
  price: number;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NameAddressFormComponent, ItemFormComponent, SummaryFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  itemData!: ProductItem;
  handleFormSubmit(data: {
    firstName: string;
    lastName: string;
    streetAddress: string;
  }) {
    console.log('Data received from child:', data);
  }

  handleItemSelected(data: { item: string; price: number }) {
    this.itemData = { item: data.item, price: data.price };
  }
}
