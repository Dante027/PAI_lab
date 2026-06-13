import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Mleko 3,2%', category: 'Nabiał', amount: '2', unit: 'l', expiry: '2026-03-12', opened: true, notes: 'Przechowywać w lodówce' },
  { id: 2, name: 'Chleb żytni', category: 'Pieczywo', amount: '1', unit: 'szt.', expiry: '2026-03-10', opened: true, notes: '' },
  { id: 3, name: 'Pierś z kurczaka', category: 'Mięso i wędliny', amount: '0.5', unit: 'kg', expiry: '2026-03-08', opened: false, notes: 'Zamrażarka' },
  { id: 4, name: 'Jabłka Gala', category: 'Warzywa i owoce', amount: '1', unit: 'kg', expiry: '2026-03-20', opened: false, notes: '' },
];

@Injectable({ providedIn: 'root' })
export class PantryService {
  private router = inject(Router);

  private _products = signal<Product[]>(
    JSON.parse(localStorage.getItem('pantry') ?? 'null') ?? INITIAL_PRODUCTS
  );

  readonly products = this._products.asReadonly();

  readonly totalCount = computed(() => this._products().length);
  readonly expiredCount = computed(() =>
    this._products().filter(p => new Date(p.expiry) < new Date()).length
  );
  readonly expiringSoonCount = computed(() =>
    this._products().filter(p => {
      const d = Math.ceil((new Date(p.expiry).getTime() - Date.now()) / 86_400_000);
      return d >= 0 && d <= 7;
    }).length
  );

  constructor() {
    effect(() => {
      localStorage.setItem('pantry', JSON.stringify(this._products()));
    });
  }

  getById(id: number): Product | undefined {
    return this._products().find(p => p.id === id);
  }

  addProduct(product: Omit<Product, 'id'>): void {
    this._products.update(list => [
      ...list,
      { ...product, id: Date.now() },
    ]);
  }

  removeProduct(id: number): void {
    this._products.update(list => list.filter(p => p.id !== id));
  }

  clearAll(): void {
    this._products.set([]);
    this.router.navigate(['/pantry']);
  }
}
