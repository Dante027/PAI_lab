import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PantryService } from '../../core/services/pantry.service';

const CATEGORIES = ['Nabiał', 'Pieczywo', 'Mięso i wędliny', 'Warzywa i owoce', 'Napoje', 'Inne'];
const UNITS = ['szt.', 'l', 'kg', 'g', 'ml', 'op.'];
const TODAY = new Date().toISOString().split('T')[0];

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div>
      <h2 class="mb-4">+ Nowy produkt w spiżarni</h2>

      @if (errorMsg()) {
        <div class="alert alert-danger alert-dismissible">
          {{ errorMsg() }}
          <button type="button" class="btn-close" (click)="errorMsg.set('')"></button>
        </div>
      }

      @if (successMsg()) {
        <div class="alert alert-success">{{ successMsg() }}</div>
      }

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-floating mb-3">
          <input #nameInput id="name" type="text" class="form-control"
                 formControlName="name" placeholder="np. Mleko 3,2%"
                 [class.is-invalid]="isInvalid('name')" />
          <label for="name">Nazwa produktu *</label>
          @if (isInvalid('name')) {
            <div class="invalid-feedback">Nazwa produktu jest wymagana.</div>
          }
        </div>

        <div class="row g-2 mb-3">
          <div class="col-6">
            <div class="form-floating">
              <input id="amount" type="number" class="form-control"
                     formControlName="amount" placeholder="0" min="0" step="0.1" />
              <label for="amount">Ilość</label>
            </div>
          </div>
          <div class="col-6">
            <div class="form-floating">
              <select id="unit" class="form-select" formControlName="unit">
                @for (u of units; track u) {
                  <option [value]="u">{{ u }}</option>
                }
              </select>
              <label for="unit">Jednostka</label>
            </div>
          </div>
        </div>

        <div class="form-floating mb-3">
          <select id="category" class="form-select" formControlName="category"
                  [class.is-invalid]="isInvalid('category')">
            <option value="">Wybierz kategorię</option>
            @for (cat of categories; track cat) {
              <option [value]="cat">{{ cat }}</option>
            }
          </select>
          <label for="category">Kategoria *</label>
          @if (isInvalid('category')) {
            <div class="invalid-feedback">Należy wybrać kategorię.</div>
          }
        </div>

        <div class="form-floating mb-3">
          <input id="expiry" type="date" class="form-control"
                 formControlName="expiry" [min]="today" />
          <label for="expiry">Data ważności</label>
        </div>

        <div class="form-floating mb-3">
          <textarea id="notes" class="form-control" style="height:80px"
                    formControlName="notes"
                    placeholder="np. przechowywać w lodówce"></textarea>
          <label for="notes">Uwagi (opcjonalne)</label>
        </div>

        <div class="form-check form-switch mb-4">
          <input class="form-check-input" type="checkbox"
                 id="opened" formControlName="opened" />
          <label class="form-check-label" for="opened">Produkt otwarty</label>
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-success flex-grow-1"
                  [disabled]="form.invalid">
            Dodaj do spiżarni
          </button>
          <button type="button" class="btn btn-outline-secondary"
                  (click)="router.navigate(['/pantry'])">
            Anuluj
          </button>
        </div>
      </form>
    </div>
  `,
})
export class AddProductComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  router = inject(Router);
  private pantry = inject(PantryService);

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  categories = CATEGORIES;
  units = UNITS;
  today = TODAY;

  errorMsg = signal('');
  successMsg = signal('');

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    amount: [''],
    unit: ['szt.'],
    category: ['', Validators.required],
    expiry: [TODAY],
    notes: [''],
    opened: [false],
  });

  ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && (ctrl.dirty || ctrl.touched));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMsg.set('Należy uzupełnić wymagane pola.');
      return;
    }
    this.pantry.addProduct(this.form.value);
    this.successMsg.set('Produkt dodany! Przekierowanie...');
    this.form.reset({ unit: 'szt.', expiry: TODAY, opened: false });
    setTimeout(() => this.router.navigate(['/pantry']), 1500);
  }
}
