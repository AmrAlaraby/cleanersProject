import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-admin-workers',
  templateUrl: './admin-workers.component.html',
  styleUrls: ['./admin-workers.component.css']
})
export class AdminWorkersComponent {
  workers: any[] = [];
  categories: any[] = [];
  selectedCategoryId: any = '';
  searchTerm: string = '';
  defaultImage = './assets/Team-Member-Male-Placeholder.png';
  isLoading = false;
  lang = 'en';

  // Edit Worker Modal
  editForm!: FormGroup;
  selectedWorkerId: string = '';
  selectedImage: File | null = null;
  showModal = false;

  // Pagination
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(private _mainService: MainService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getCategories();
    this.getWorkers();
    this.initForm();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      hourlyRate: ['', Validators.required],
      experienceYears: ['', Validators.required],
      nationalId: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      description: ['']
    });
  }

  getCategories(): void {
    this._mainService.getAllCategories().subscribe(res => this.categories = res);
  }

  getWorkers(): void {
    this.isLoading = true;
    this._mainService.getAllWorkers(this.pageIndex, this.pageSize, this.searchTerm, this.selectedCategoryId)
      .subscribe(res => {
        this.workers = res.data;
        this.totalCount = res.count;
        this.isLoading = false;
      }, () => this.isLoading = false);
  }

  pageChanged(event: number) {
    this.pageIndex = event;
    this.getWorkers();
  }

  openEditModal(worker: any) {
    this.selectedWorkerId = worker.id;
    this.editForm.patchValue({
      firstName: worker.firstName,
      lastName: worker.lastName,
      userName: worker.userName,
      phoneNumber: worker.phoneNumber,
      hourlyRate: worker.hourlyRate,
      experienceYears: worker.experienceYears,
      nationalId: worker.nationalId,
      dateOfBirth: worker.dateOfBirth?.split('T')[0], // "YYYY-MM-DD"
      description: worker.description || ''
    });
    this.selectedImage = null;
    this.showModal = true;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG/PNG images are allowed.');
        return;
      }
      this.selectedImage = file;
    }
  }

  updateWorker(): void {
    if (!this.selectedWorkerId) return;

    const formValue = this.editForm.value;

    const body = {
      workerId: this.selectedWorkerId,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      userName: formValue.userName,
      phoneNumber: formValue.phoneNumber,
      hourlyRate: formValue.hourlyRate,
      experienceYears: formValue.experienceYears,
      nationalId: formValue.nationalId,
      dateOfBirth: formValue.dateOfBirth,
      description: formValue.description,
      profileImage: this.selectedImage
    };

    this._mainService.updateWorker(body).subscribe({
      next: () => {
        this.getWorkers();
        this.closeModal();
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });
  }

  closeModal(): void {
    this.editForm.reset();
    this.showModal = false;
    this.selectedWorkerId = '';
  }
  deleteWorker(id: string): void {
    if (confirm('Are you sure you want to delete this worker?')) {
      this._mainService.deleteWorker(id).subscribe({
        next: () => {
          this.getWorkers();
        },
        error: (err) => {
          console.error('Delete error:', err);
        }
      });
    }
  }
}