import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ProductItem {
  item: string;
  price: number;
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
  constructor() {
    this.items = [
      { item: 'Apples', price: 1.5 },
      { item: 'Peaches', price: 2.0 },
      { item: 'Pears', price: 1.8 },
      { item: 'Plums', price: 2.5 },
    ];
  }

  @Output() itemSelected = new EventEmitter<{ item: string; price: number }>();

  onSubmit() {
    const selectedItemData = this.items.find(
      (item) => item.item === this.selectedItem
    );

    if (selectedItemData) {
      console.log('Form Submitted:', selectedItemData);
      this.itemSelected.emit(selectedItemData);
    }
  }
}
