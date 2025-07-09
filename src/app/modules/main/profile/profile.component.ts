import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  loading: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';
  selectedFile: File | null = null;
  previewImageUrl: string | null = null;

  constructor(private fb: FormBuilder, private profileService: ProfileService,
        private authService: AuthenticationService

  ) {
    
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
      dateOfBirth: ['', Validators.required]
    });

    this.loadProfileData();
  }

  loadProfileData(): void {
    const userData = this.authService.userData.getValue();
    
    this.loading = true;
    this.profileService.getCurrentCustomerInfo().subscribe({
      next: (data) => {
         const [firstName, ...lastNameParts] = data.fullName.split(' ');
         const lastName = lastNameParts.join(' ');
        
        this.profileForm.patchValue({
          firstName: firstName,
          lastName: lastName,
          userName: userData?.UserName,
          phoneNumber: data.phoneNumber,
          dateOfBirth: data.dateOfBirth?.split('T')[0]
        });

        this.previewImageUrl = data.profileImage;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Failed to load profile';
        this.loading = false;
        console.log("err",err);
        
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Show preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    const formData = new FormData();
    formData.append('firstName', this.profileForm.value.firstName);
    formData.append('lastName', this.profileForm.value.lastName);
    formData.append('userName', this.profileForm.value.userName);
    formData.append('phoneNumber', this.profileForm.value.phoneNumber);
    formData.append('dateOfBirth', this.profileForm.value.dateOfBirth);

    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    this.loading = true;
    this.profileService.updateCustomerInfo(formData).subscribe({
      next: () => {
        this.successMsg = 'Profile updated successfully';
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Update failed';
        this.loading = false;
      }
    });
  }
}
