import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pantry', pathMatch: 'full' },
  {
    path: 'pantry',
    loadComponent: () =>
      import('./pages/pantry/pantry.component').then(m => m.PantryComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/add-product/add-product.component').then(m => m.AddProductComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then(m => m.SettingsComponent),
  },
  { path: '**', redirectTo: 'pantry' },
];
