import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PantryService } from '../../core/services/pantry.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

const CATEGORIES = ['all', 'Nabiał', 'Pieczywo', 'Mięso i wędliny', 'Warzywa i owoce', 'Napoje', 'Inne'];

@Component({
  selector: 'app-pantry',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  template: `
    <div>
      <h2 class="mb-4">
        🏠 Spiżarnia
        <span class="badge bg-secondary ms-2">{{ pantry.totalCount() }}</span>
      </h2>

      @if (pantry.expiredCount() > 0) {
        <div class="alert alert-warning">
          ⚠️ Masz <strong>{{ pantry.expiredCount() }}</strong> przeterminowanych produktów!
        </div>
      }

      <div class="row g-2 mb-4">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text">🔍</span>
            <input class="form-control" type="text"
                   placeholder="Szukaj produktu..."
                   [ngModel]="searchSignal()"
                   (ngModelChange)="searchSignal.set($event)" />
          </div>
        </div>
        <div class="col-md-6">
          <select class="form-select"
                  [ngModel]="categorySignal()"
                  (ngModelChange)="categorySignal.set($event)">
            @for (cat of categories; track cat) {
              <option [value]="cat">
                {{ cat === 'all' ? 'Wszystkie kategorie' : cat }}
              </option>
            }
          </select>
        </div>
      </div>

      @if (filtered().length === 0) {
        <p class="text-muted">Brak produktów spełniających kryteria.</p>
      } @else {
        <div class="row g-3">
          @for (p of filtered(); track p.id) {
            <div class="col-md-6 col-lg-4">
              <app-product-card [product]="p" />
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class PantryComponent {
  pantry = inject(PantryService);
  categories = CATEGORIES;

  searchSignal = signal('');
  categorySignal = signal('all');

  filtered = computed(() => {
    const query = this.searchSignal().toLowerCase();
    const cat = this.categorySignal();
    return this.pantry.products()
      .filter(p => cat === 'all' || p.category === cat)
      .filter(p => p.name.toLowerCase().includes(query));
  });
}
