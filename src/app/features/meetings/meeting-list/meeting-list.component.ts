import { Component, inject, signal, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MeetingService } from '../../../core/services/meeting.service';
import { Meeting } from '../../../core/models/meeting.model';
import { UiCardComponent } from '../../../shared/components/ui-card/ui-card.component';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { UiInputComponent } from '../../../shared/components/ui-input/ui-input.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, UiCardComponent, UiButtonComponent, UiInputComponent],
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
  private meetingService = inject(MeetingService);
  
  @Input() projectId?: string;

  meetings = signal<Meeting[]>([]);
  loading = signal<boolean>(true);
  searchTerm = signal<string>('');

  ngOnInit() {
    this.loadMeetings();
  }

  loadMeetings() {
    this.loading.set(true);
    this.meetingService.getMeetings(this.projectId).subscribe({
      next: (data) => {
        this.meetings.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load meetings', err);
        this.loading.set(false);
      }
    });
  }

  get filteredMeetings() {
    return this.meetings().filter(m => 
      m.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      m.location.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(status: string): string {
    return status.replace('_', ' ').toUpperCase();
  }
}
