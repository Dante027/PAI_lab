import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PantryService } from '../../core/services/pantry.service';
import { Product, getExpiryStatus, EXPIRY_BADGE } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  template: `
    <div>
      <button class="btn btn-outline-secondary mb-3" (click)="router.navigate(['/pantry'])">
        ← Powrót do spiżarni
      </button>

      @if (!product()) {
        <div class="alert alert-danger">
          Produkt o ID {{ id() }} nie istnieje.
        </div>
      } @else {
        <div class="card shadow">
          <div class="card-header bg-success text-white py-3">
            <h4 class="mb-0">{{ product()!.name }}</h4>
          </div>
          <div class="card-body">
            <div class="alert alert-{{ badge().bg }} {{ badge().bg === 'warning' ? 'text-dark' : '' }} mb-3">
              {{ badge().text }}
            </div>
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Kategoria</th>
                  <td>{{ product()!.category }}</td>
                </tr>
                <tr>
                  <th scope="row">Ilość</th>
                  <td>{{ product()!.amount }} {{ product()!.unit }}</td>
                </tr>
                <tr>
                  <th scope="row">Data ważności</th>
                  <td>{{ product()!.expiry }}</td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td>
                    <span class="badge {{ product()!.opened ? 'bg-info text-dark' : 'bg-secondary' }}">
                      {{ product()!.opened ? 'Otwarty' : 'Zamknięty' }}
                    </span>
                  </td>
                </tr>
                @if (product()!.notes) {
                  <tr>
                    <th scope="row">Uwagi</th>
                    <td>{{ product()!.notes }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div class="card-footer d-flex justify-content-end">
            <button class="btn btn-danger" (click)="onDelete()">
              🗑️ Usuń produkt
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  private pantry = inject(PantryService);

  id = signal<number>(0);
  product = signal<Product | undefined>(undefined);
  badge = computed(() => {
    const p = this.product();
    return p ? EXPIRY_BADGE[getExpiryStatus(p.expiry)] : EXPIRY_BADGE['ok'];
  });

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    const numId = Number(rawId);
    this.id.set(numId);
    const found = this.pantry.getById(numId);
    this.product.set(found);
  }

  onDelete(): void {
    this.pantry.removeProduct(this.id());
    this.router.navigate(['/pantry']);
  }
}
