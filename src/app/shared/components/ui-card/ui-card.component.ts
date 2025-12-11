import { Component } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  template: `
    <div class="card glass">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);
      border: 1px solid var(--slate-200);
      background-color: white;
      box-shadow: var(--shadow-sm);
    }
  `]
})
export class UiCardComponent {}
