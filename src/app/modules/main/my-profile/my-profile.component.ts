import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  worker: any;
  loading = true;
  showEditModal = false;
  editForm!: FormGroup;
  selectedImage: File | null = null;

  constructor(private service: MainService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getWorkerData();
  }

  getWorkerData() {
    this.loading = true;
    this.service.getCurrentWorkerInfo().subscribe({
      next: (res) => {
        console.log('Worker data:', res);
        
        this.worker = res;
        this.createForm();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  createForm() {
    const [firstName, lastName] = this.worker.fullName?.split(' ') ?? ['', ''];
    this.editForm = this.fb.group({
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      userName: [this.worker.userName, Validators.required],
      phoneNumber: [this.worker.phoneNumber, Validators.required],
      dateOfBirth: ['', Validators.required], // إذا كنت هتستعمله لاحقاً
      description: [this.worker.description],
      hourlyRate: [this.worker.hourlyRate],
      experienceYears: [this.worker.experienceYears],
      profileImage: [null]
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('فقط صور JPG و PNG مدعومة');
        return;
      }
      this.selectedImage = file;
    }
  }

  submitEditForm() {
   if (this.editForm.invalid) return;

const formData = new FormData();
const formValues = this.editForm.value;

for (const key in formValues) {
  if (
    formValues.hasOwnProperty(key) &&
    key !== 'profileImage' &&
    formValues[key] !== null &&
    formValues[key] !== undefined &&
    formValues[key] !== ''
  ) {
    formData.append(key, formValues[key]);
  }
}

// الصورة فقط لو موجودة
if (this.selectedImage) {
  formData.append('ProfileImage', this.selectedImage);
}

// WorkerId ضروري
formData.append('WorkerId', this.worker.id);

    this.service.updateWorkerInfo(formData).subscribe({
      next: () => {
        this.showEditModal = false;
        this.getWorkerData();
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error updating worker info:', err);
        
        alert('حدث خطأ أثناء التحديث');
      }
    });
  }

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }
}
