import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { ToastService } from '../../../core/services/toast.service';
import { UiCardComponent } from '../../../shared/components/ui-card/ui-card.component';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { UiInputComponent } from '../../../shared/components/ui-input/ui-input.component';
import { SubmissionListComponent } from '../../submissions/submission-list/submission-list.component';
import { MeetingListComponent } from '../../meetings/meeting-list/meeting-list.component';
import { EvaluationListComponent } from '../../evaluations/evaluation-list/evaluation-list.component';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, UiCardComponent, UiButtonComponent, UiInputComponent, SubmissionListComponent, MeetingListComponent, EvaluationListComponent],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);
  private toastService = inject(ToastService);
  public authService = inject(AuthService);

  project = signal<Project | null>(null);
  loading = signal<boolean>(true);
  error = signal<string>('');
  activeTab = signal<'submissions' | 'meetings' | 'evaluations' | 'milestones'>('submissions');

  // Invite Modal State
  showInviteModal = false;
  inviteRole: 'student' | 'supervisor' | null = null;
  inviteEmailControl = new FormControl('', [Validators.required, Validators.email]);
  inviting = false;

  // Loading states
  leavingProject = false;
  deletingProject = false;

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProject(id);
      }
    });

    this.route.queryParamMap.subscribe(params => {
      const tab = params.get('tab');
      if (tab && ['submissions', 'meetings', 'evaluations', 'milestones'].includes(tab)) {
        this.activeTab.set(tab as any);
      }
    });
  }

  loadProject(id: string) {
    this.loading.set(true);
    this.projectService.getProject(id).subscribe({
      next: (data) => {
        this.project.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load project details');
        this.loading.set(false);
        console.error(err);
      }
    });
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

  canInvite(role: 'student' | 'supervisor'): boolean {
    const user = this.authService.currentUser();
    const p = this.project();
    
    // Debug logging
    console.log('canInvite check:', { 
      userRole: user?.userRole, 
      targetRole: role, 
      projectStudent: p?.studentEmail, 
      projectSupervisor: p?.supervisorEmail 
    });

    if (!user || !p) return false;

    // Supervisor can invite Student
    if (user.userRole === 'supervisor' && role === 'student' && !p.studentEmail) return true;
    
    // Student can invite Supervisor
    if (user.userRole === 'student' && role === 'supervisor' && !p.supervisorEmail) return true;

    return false;
  }

  openInviteModal(role: 'student' | 'supervisor') {
    this.inviteRole = role;
    this.inviteEmailControl.setValue('');
    this.showInviteModal = true;
  }

  closeInviteModal() {
    this.showInviteModal = false;
    this.inviteRole = null;
  }

  sendInvitation() {
    if (this.inviteEmailControl.invalid || !this.inviteRole || !this.project()) return;

    this.inviting = true;
    const projectId = this.project()!.id!;
    const email = this.inviteEmailControl.value!;
    const roleName = this.inviteRole === 'student' ? 'Student' : 'Supervisor';

    this.projectService.inviteUser(projectId, email, this.inviteRole).subscribe({
      next: () => {
        this.toastService.success(`Invitation sent to ${email} as ${roleName}`);
        this.inviting = false;
        this.closeInviteModal();
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Failed to send invitation. Please try again.');
        this.inviting = false;
      }
    });
  }

  // Navigate to chat with the other project member
  openChat() {
    const user = this.authService.currentUser();
    const p = this.project();

    if (!user || !p) return;

    // Determine who to chat with based on current user role
    let recipientEmail = '';
    let recipientName = '';

    if (user.userRole === 'student' && p.supervisorEmail) {
      recipientEmail = p.supervisorEmail;
      recipientName = p.supervisorName || 'Supervisor';
    } else if (user.userRole === 'supervisor' && p.studentEmail) {
      recipientEmail = p.studentEmail;
      recipientName = p.studentName || 'Student';
    }

    if (recipientEmail) {
      // Navigate to chat with query params
      this.router.navigate(['/chat'], {
        queryParams: {
          recipientEmail,
          recipientName,
          projectId: p.id
        }
      });
    } else {
      this.toastService.info('No other member in this project to chat with');
    }
  }

  // Check if chat is available (both student and supervisor are assigned)
  get canChat(): boolean {
    const user = this.authService.currentUser();
    const p = this.project();

    if (!user || !p) return false;

    // Student can chat if supervisor exists
    if (user.userRole === 'student' && p.supervisorEmail) return true;

    // Supervisor can chat if student exists
    if (user.userRole === 'supervisor' && p.studentEmail) return true;

    return false;
  }

  // Check if current user is the project owner
  get isOwner(): boolean {
    const user = this.authService.currentUser();
    const p = this.project();
    return !!(user && p && p.ownerEmail === user.email);
  }

  // Check if current user is a member (not owner)
  get isMember(): boolean {
    const user = this.authService.currentUser();
    const p = this.project();
    if (!user || !p || p.ownerEmail === user.email) return false;

    return p.studentEmail === user.email || p.supervisorEmail === user.email;
  }

  // Delete project (owner only)
  deleteProject() {
    const p = this.project();
    const user = this.authService.currentUser();

    if (!p || !user || !this.isOwner) return;

    const confirmMsg = `Are you sure you want to delete "${p.title}"? This action cannot be undone.`;
    if (!confirm(confirmMsg)) return;

    this.deletingProject = true;

    this.projectService.deleteProject(p.id!, user.email).subscribe({
      next: () => {
        this.toastService.success('Project deleted successfully');
        this.deletingProject = false;
        setTimeout(() => {
          this.router.navigate(['/projects']);
        }, 500);
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Failed to delete project. Please try again.');
        this.deletingProject = false;
      }
    });
  }

  // Leave project (members only)
  leaveProject() {
    const p = this.project();
    const user = this.authService.currentUser();

    console.log('Leave project clicked', {
      hasProject: !!p,
      hasUser: !!user,
      isMember: this.isMember,
      projectId: p?.id,
      userEmail: user?.email
    });

    if (!p || !user) {
      this.toastService.error('Project or user information not available');
      return;
    }

    if (!this.isMember) {
      this.toastService.error('Only project members can leave');
      return;
    }

    const confirmMsg = `Are you sure you want to leave "${p.title}"?`;
    if (!confirm(confirmMsg)) return;

    this.leavingProject = true;

    this.projectService.leaveProject(p.id!, user.email).subscribe({
      next: () => {
        this.toastService.success('You have left the project successfully');
        this.leavingProject = false;
        setTimeout(() => {
          this.router.navigate(['/projects']);
        }, 500);
      },
      error: (err) => {
        console.error('Leave project error:', err);
        const errorMsg = err?.error?.message || err?.message || 'Failed to leave project. Please try again.';
        this.toastService.error(errorMsg);
        this.leavingProject = false;
      }
    });
  }
}
