import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PantryService } from '../../../core/services/pantry.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbCollapseModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <div class="container">
        <a class="navbar-brand" routerLink="/pantry">🥫 Spiżarnia</a>
        <button
          class="navbar-toggler"
          type="button"
          (click)="isCollapsed = !isCollapsed"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" [ngbCollapse]="isCollapsed" id="mainNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/pantry" routerLinkActive="active">Spiżarnia</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/add" routerLinkActive="active">+ Dodaj</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/categories" routerLinkActive="active">Kategorie</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/settings" routerLinkActive="active">Ustawienia</a>
            </li>
          </ul>
          @if (pantry.expiredCount() > 0) {
            <span class="navbar-text text-warning">
              ⚠️
              <span class="badge bg-warning text-dark">
                {{ pantry.expiredCount() }}
              </span>
              przeterminowanych
            </span>
          }
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  pantry = inject(PantryService);
  isCollapsed = true;
}
