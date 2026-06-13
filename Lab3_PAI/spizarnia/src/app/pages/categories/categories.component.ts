import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { PantryService } from '../../core/services/pantry.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, NgbAccordionModule],
  template: `
    <div>
      <h2 class="mb-4">📂 Kategorie produktów</h2>

      @if (grouped().size === 0) {
        <p class="text-muted">Brak produktów w spiżarni.</p>
      } @else {
        <div ngbAccordion>
          @for (entry of grouped().entries(); track entry[0]) {
            <div ngbAccordionItem>
              <h2 ngbAccordionHeader>
                <button ngbAccordionButton>
                  {{ entry[0] }}
                  <span class="badge bg-secondary ms-2">{{ entry[1].length }}</span>
                </button>
              </h2>
              <div ngbAccordionCollapse>
                <div ngbAccordionBody>
                  <ul class="list-group list-group-flush">
                    @for (product of entry[1]; track product.id) {
                      <li class="list-group-item d-flex justify-content-between align-items-center">
                        <a [routerLink]="['/product', product.id]">{{ product.name }}</a>
                        <span class="badge bg-secondary">{{ product.amount }} {{ product.unit }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class CategoriesComponent {
  private pantry = inject(PantryService);

  grouped = computed(() => {
    const map = new Map<string, Product[]>();
    for (const p of this.pantry.products()) {
      const cat = p.category || 'Inne';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(p);
    }
    return map;
  });
}
