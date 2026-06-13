import { Component, inject, computed, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { PantryService } from '../../core/services/pantry.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgbProgressbarModule],
  template: `
    <div>
      <h2 class="mb-4">⚙️ Ustawienia</h2>

      <div class="card mb-4">
        <div class="card-header"><strong>Statystyki spiżarni</strong></div>
        <div class="card-body">
          <div class="row g-3 mb-3">
            <div class="col-6 col-md-3">
              <div class="card text-center border-success">
                <div class="card-body">
                  <h3 class="text-success">{{ pantry.totalCount() }}</h3>
                  <small>Wszystkich</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card text-center border-danger">
                <div class="card-body">
                  <h3 class="text-danger">{{ pantry.expiredCount() }}</h3>
                  <small>Przeterminowanych</small>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="card text-center border-warning">
                <div class="card-body">
                  <h3 class="text-warning">{{ pantry.expiringSoonCount() }}</h3>
                  <small>Kończy się wkrótce</small>
                </div>
              </div>
            </div>
          </div>

          <h6 class="mt-3">Podział na kategorie:</h6>
          @for (entry of byCategory(); track entry[0]) {
            <div class="mb-2">
              <div class="d-flex justify-content-between">
                <small>{{ entry[0] }}</small>
                <small>{{ entry[1] }}</small>
              </div>
              <ngb-progressbar
                type="success"
                [height]="'8px'"
                [value]="pantry.totalCount() ? (entry[1] / pantry.totalCount()) * 100 : 0"
              />
            </div>
          }
        </div>
      </div>

      <div class="card border-danger">
        <div class="card-header text-danger"><strong>Strefa niebezpieczna</strong></div>
        <div class="card-body">
          <p>Usunięcie wszystkich produktów jest nieodwracalne.</p>
          <button class="btn btn-danger" (click)="openConfirmModal(confirmModal)">
            🗑️ Wyczyść całą spiżarnię
          </button>
        </div>
      </div>
    </div>

    <ng-template #confirmModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">Potwierdzenie</h5>
        <button type="button" class="btn-close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body">
        <p>
          Czy na pewno usunąć <strong>wszystkie {{ pantry.totalCount() }} produkty</strong>?
        </p>
        <p class="text-muted mb-0">Tej operacji nie można cofnąć.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss()">Anuluj</button>
        <button type="button" class="btn btn-danger" (click)="confirmClear(modal)">Usuń wszystko</button>
      </div>
    </ng-template>
  `,
})
export class SettingsComponent {
  pantry = inject(PantryService);
  private modalService = inject(NgbModal);

  @ViewChild('confirmModal') confirmModal!: TemplateRef<unknown>;

  byCategory = computed(() => {
    const map = new Map<string, number>();
    for (const p of this.pantry.products()) {
      const cat = p.category || 'Inne';
      map.set(cat, (map.get(cat) ?? 0) + 1);
    }
    return [...map.entries()];
  });

  openConfirmModal(content: TemplateRef<unknown>): void {
    this.modalService.open(content);
  }

  confirmClear(modal: { close: () => void }): void {
    this.pantry.clearAll();
    modal.close();
  }
}
