import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { UiCardComponent } from '../../../shared/components/ui-card/ui-card.component';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { UiInputComponent } from '../../../shared/components/ui-input/ui-input.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, UiCardComponent, UiButtonComponent, UiInputComponent],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {
  private projectService = inject(ProjectService);
  private authService = inject(AuthService);
  
  projects = signal<Project[]>([]);
  loading = signal<boolean>(true);
  searchTerm = signal<string>('');

  constructor() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading.set(true);
    
    // As per user request: "In this project I don't have admin yet"
    // So we enforce filtering for everyone to ensure data isolation.
    const user = this.authService.currentUser();
    const emailToFilter = user?.email;

    this.projectService.getProjects(emailToFilter).subscribe({
      next: (data) => {
        this.projects.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load projects', err);
        this.loading.set(false);
      }
    });
  }

  get filteredProjects() {
    return this.projects().filter(p => 
      p.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      p.description.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'proposed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(status: string): string {
    return status.replace('_', ' ').toUpperCase();
  }
}
