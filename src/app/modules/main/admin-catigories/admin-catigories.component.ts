import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';
// @ts-ignore
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-admin-catigories',
  templateUrl: './admin-catigories.component.html',
  styleUrls: ['./admin-catigories.component.css']
})
export class AdminCatigoriesComponent {
  categories: any[] = [];
  filteredCategories: any[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  // لاضافة كاتيجوري جديد
  newCategory = {
    englishName: '',
    arabicName: '',
    image: ''
  };
  imagePreview: string | null = null;

  // للتعديل
  editCategoryData: any | null = null;
  editImagePreview: string | null = null;

  selectedCategoryIdToDelete: number | null = null;

  loading = false;

 @ViewChild('editModalCloseBtn', { static: false }) editModalCloseBtn!: ElementRef<HTMLButtonElement>;


  constructor(private _mainService: MainService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.loading = true;
    this._mainService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.filteredCategories = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterCategories() {
    this.filteredCategories = this.categories.filter(cat =>
      cat.englishName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      cat.arabicName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  // onImageSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  //     if (!allowedTypes.includes(file.type)) {
  //       alert('Only JPG/PNG images are allowed.');
  //       return;
  //     }
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreview = reader.result as string;
  //       this.newCategory.image = this.imagePreview;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }


onImageSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG/PNG images are allowed.');
      return;
    }

    // للعرض فقط
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

    // للرفع في FormData
    this.newCategory.image = file;
  }
}

  // onEditImageSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  //     if (!allowedTypes.includes(file.type)) {
  //       alert('Only JPG/PNG images are allowed.');
  //       return;
  //     }
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.editImagePreview = reader.result as string;
  //       if (this.editCategoryData) {
  //         this.editCategoryData.image = this.editImagePreview;
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onEditImageSelected(event: any) {
  const file = event.target.files[0];

  if (file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG/PNG images are allowed.');
      return;
    }

    // ✅ preview فقط
    const reader = new FileReader();
    reader.onload = () => {
      this.editImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

    // ✅ نخزن الصورة نفسها كـ File
    if (this.editCategoryData) {
      this.editCategoryData.image = file;
    }
  }
}


  createCategory(form: NgForm) {
    if (form.invalid) return;
    this._mainService.createCategory(this.newCategory).subscribe(() => {
      this.getAllCategories();
      form.resetForm();
      this.imagePreview = null;
    });}

  openEditModal(category: any) {
    this.editCategoryData = { ...category };
    this.editImagePreview = category.image;
  }

  updateCategory() {
 
    if (!this.editCategoryData) return;

    
    this._mainService.updateCategory(this.editCategoryData).subscribe(() => {
      this.getAllCategories();
      this.editCategoryData = null;

       this.editModalCloseBtn.nativeElement.click();
    
  });
  }

  openDeleteModal(categoryId: number) {
    this.selectedCategoryIdToDelete = categoryId;
  }

  deleteCategory() {
    if (!this.selectedCategoryIdToDelete) return;
    this._mainService.deleteCategory(this.selectedCategoryIdToDelete).subscribe(() => {
      this.getAllCategories();
      this.selectedCategoryIdToDelete = null;
    });
  }
}
