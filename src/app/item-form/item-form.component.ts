import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ProductItem {
  item: string;
  price: number;
  num: number;
}

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent {
  items: Array<ProductItem>;
  selectedItem: string = '';
  quantity!: number;
  constructor() {
    this.items = [
      { item: 'Apples', price: 1.5, num: 0 },
      { item: 'Peaches', price: 2.0, num: 0 },
      { item: 'Pears', price: 1.8, num: 0 },
      { item: 'Plums', price: 2.5, num: 0 },
    ];
  }

  @Output() itemSelected = new EventEmitter<{
    item: string;
    price: number;
    num: number;
  }>();

  onSubmit() {
    const selectedItemData = this.items.find(
      (item) => item.item === this.selectedItem
    );

    if (selectedItemData) {
      selectedItemData.num = this.quantity;
      console.log('Form Submitted:', selectedItemData);
      this.itemSelected.emit(selectedItemData);
    }
  }
}
