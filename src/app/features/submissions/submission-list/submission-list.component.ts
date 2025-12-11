import { Component, inject, Input, OnChanges, OnInit, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubmissionService } from '../../../core/services/submission.service';
import { Submission } from '../../../core/models/submission.model';
import { UiCardComponent } from '../../../shared/components/ui-card/ui-card.component';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { UiInputComponent } from '../../../shared/components/ui-input/ui-input.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-submission-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, UiCardComponent, UiButtonComponent, UiInputComponent],
  templateUrl: './submission-list.component.html',
  styleUrls: ['./submission-list.component.css']
})
export class SubmissionListComponent implements OnInit, OnChanges {
  private submissionService = inject(SubmissionService);

  @Input() projectId?: string;

  submissions = signal<Submission[]>([]);
  loading = signal<boolean>(true);
  searchTerm = signal<string>('');

  ngOnInit() {
    // Load all submissions when component initializes (for standalone /submissions route)
    if (!this.projectId) {
      this.loadSubmissions();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Load submissions for specific project when projectId input changes
    if (changes['projectId'] && this.projectId) {
      this.loadSubmissions();
    }
  }

  loadSubmissions() {
    this.loading.set(true);
    this.submissionService.getSubmissions(this.projectId).subscribe({
      next: (data) => {
        this.submissions.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load submissions', err);
        this.loading.set(false);
      }
    });
  }

  get filteredSubmissions() {
    return this.submissions().filter(s => 
      s.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      s.submittedBy.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(status: string): string {
    return status.replace('_', ' ').toUpperCase();
  }
}
