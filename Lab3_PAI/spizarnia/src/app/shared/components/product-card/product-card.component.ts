import { Component, input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, getExpiryStatus, EXPIRY_BADGE } from '../../../core/models/product.model';
import { PantryService } from '../../../core/services/pantry.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="card h-100 shadow-sm">
      <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <strong>{{ product().name }}</strong>
        <span class="badge bg-{{ badge().bg }} {{ badge().bg === 'warning' ? 'text-dark' : '' }}">
          {{ badge().text }}
        </span>
      </div>
      <div class="card-body">
        <p class="mb-1">
          <small class="text-muted">Kategoria:</small> {{ product().category }}
        </p>
        <p class="mb-1">
          <small class="text-muted">Ilość:</small>
          {{ product().amount }} {{ product().unit }}
        </p>
        <p class="mb-1">
          <small class="text-muted">Ważność:</small> {{ product().expiry }}
        </p>
        @if (product().opened) {
          <span class="badge bg-info text-dark">Otwarty</span>
        }
        @if (product().notes) {
          <p class="mt-2 mb-0 text-muted">
            <small>{{ product().notes }}</small>
          </p>
        }
      </div>
      <div class="card-footer d-flex gap-2">
        <a [routerLink]="['/product', product().id]"
           class="btn btn-outline-success btn-sm flex-grow-1">
          Szczegóły
        </a>
        <button class="btn btn-outline-danger btn-sm"
                (click)="pantry.removeProduct(product().id)">
          🗑️
        </button>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  product = input.required<Product>();
  pantry = inject(PantryService);
  badge = computed(() => EXPIRY_BADGE[getExpiryStatus(this.product().expiry)]);
}
