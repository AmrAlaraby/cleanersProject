import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerToReturnDto } from '../interfaces/interfaces';
declare var bootstrap: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: CustomerToReturnDto[] = [];
  isLoading: boolean = false;

  // Pagination
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;

  // Filtering
  searchTerm: string = '';
  selectedSort: string = '';

  // Reactive Form
  editCustomerForm!: FormGroup;
  editModalRef: any;
selectedCustomer:any
  constructor(
    private mainService: MainService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.initEditForm();
  }

  getCustomers(): void {
    this.isLoading = true;

    const sortValue = this.selectedSort === 'nameAsc' ? 'name' : this.selectedSort === 'nameDesc' ? 'nameDesc' : '';

    this.mainService.getAllCustomers(this.pageIndex, this.pageSize, this.searchTerm).subscribe({
      next: (res) => {
        this.customers = res.data;
        this.totalCount = res.count;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  initEditForm(): void {
    this.editCustomerForm = this.fb.group({
      customerId: ['', Validators.required],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  openEditModal(customer: CustomerToReturnDto): void {
      this.selectedCustomer = customer;

    this.editCustomerForm.patchValue({
      customerId: customer.id,
      userName: customer.userName,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
dateOfBirth: customer.dateOfBirth ? new Date(customer.dateOfBirth).toISOString().split('T')[0] : ''

    });

    const modalEl = document.getElementById('editCustomerModal');
    this.editModalRef = new bootstrap.Modal(modalEl);
    this.editModalRef.show();
  }

  updateCustomer(): void {
    if (this.editCustomerForm.invalid) return;

   const formData = new FormData();
Object.entries(this.editCustomerForm.value).forEach(([key, value]) => {
  formData.append(key, value !== null && value !== undefined ? String(value) : '');
});

// إضافة CustomerId إذا كان مطلوباً بشكل صريح
formData.append('CustomerId', this.selectedCustomer.id);


    this.mainService.updateCustomer(formData).subscribe({
      next: () => {
        this.getCustomers();
        this.editModalRef.hide();
        alert('Customer updated successfully ✅');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update customer ❌');
      }
    });
  }

  deleteCustomer(id: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.mainService.deleteCustomer(id).subscribe({
        next: () => {
          this.getCustomers();
          alert('Customer deleted successfully 🗑️');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete customer ❌');
        }
      });
    }
  }

  pageChanged(event: number) {
    this.pageIndex = event;
    this.getCustomers();
  }

}
