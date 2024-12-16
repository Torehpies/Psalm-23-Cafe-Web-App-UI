import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-panel.component.html',
  styleUrl: './category-panel.component.css'
})
export class CategoryPanelComponent {

  categories = ['Bread','Cake','Milk Tea','Coffee']

  categoryService = inject(CategoryService)
  
  selectCategory(category: string): void {
    this.categoryService.setCategory(category);
  }
  

}
