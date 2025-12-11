import { Component, inject, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EvaluationService } from '../../../core/services/evaluation.service';
import { Evaluation } from '../../../core/models/evaluation.model';
import { UiCardComponent } from '../../../shared/components/ui-card/ui-card.component';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-evaluation-list',
  standalone: true,
  imports: [CommonModule, RouterModule, UiCardComponent, UiButtonComponent],
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent implements OnChanges {
  private evaluationService = inject(EvaluationService);
  
  @Input() projectId!: string;

  evaluations = signal<Evaluation[]>([]);
  loading = signal<boolean>(true);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId'] && this.projectId) {
      this.loadEvaluations();
    }
  }

  loadEvaluations() {
    this.loading.set(true);
    this.evaluationService.getEvaluations(this.projectId).subscribe({
      next: (data) => {
        this.evaluations.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load evaluations', err);
        this.loading.set(false);
      }
    });
  }
}
