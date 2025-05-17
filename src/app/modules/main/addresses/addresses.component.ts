import { MainService } from 'src/app/services/main.service';
import { Component } from '@angular/core';
import { Address } from '../interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent {
    addresses: Address[] = [];
  filteredAddresses: Address[] = [];
  searchTerm = '';

  addressForm!: FormGroup;
  showModal = false;
  editMode = false;
  editingAddressId: number | null = null;

  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';
  showToast = false;

  constructor(
    private addressService: MainService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
    this.initForm();
  }

  loadAddresses() {
    this.addressService.getUserAddresses().subscribe({
      next: (data) => {
        this.addresses = data;
        this.filteredAddresses = data;
        console.log(
          'Addresses loaded successfully',
          this.addresses
        );
        
      },
      error: () => this.showErrorToast('Failed to load addresses'),
    });
  }

  filterAddresses() {
    const term = this.searchTerm.toLowerCase();
    this.filteredAddresses = this.addresses.filter(address =>
      address.addressLine.toLowerCase().includes(term) ||
      address.city.toLowerCase().includes(term)
    );
  }

  initForm() {
    this.addressForm = this.fb.group({
      addressLine: ['', Validators.required],
      addressNote: [''],
      city: ['', Validators.required],
      homeNumber: [''],
      floorNumber: [''],
      flatNumber: ['']
    });
  }

  onAdd() {
    this.addressForm.reset();
    this.editMode = false;
    this.showModal = true;
  }

  onEdit(address: Address) {
    this.editMode = true;
    this.editingAddressId = address.id;
    this.addressForm.patchValue(address);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editMode = false;
    this.editingAddressId = null;
  }

  submitForm() {
    if (this.addressForm.invalid) return;

    const payload = this.addressForm.value;

    if (this.editMode && this.editingAddressId !== null) {
      const updatedAddress: Address = { ...payload, addressId: this.editingAddressId };
      this.addressService.updateAddress(updatedAddress).subscribe({
        next: () => {
          this.showSuccessToast('Address updated successfully');
          this.loadAddresses();
          this.closeModal();
        },
        error: (err) => {this.showErrorToast('Failed to update address'),
        console.log(err);}
        
      });
    } else {
      this.addressService.createAddress(payload).subscribe({
        next: () => {
          this.showSuccessToast('Address added successfully');
          this.loadAddresses();
          this.closeModal();
        },
        error: () => this.showErrorToast('Failed to create address'),
      });
    }
  }

  deleteAddress(id: number) {
    if (!confirm('Are you sure you want to delete this address?')) return;

    this.addressService.deleteAddress(id).subscribe({
      next: () => {
        this.showSuccessToast('Address deleted');
        this.loadAddresses();
      },
      error: () => this.showErrorToast('Failed to delete address'),
    });
  }

  showSuccessToast(message: string) {
    this.toastType = 'success';
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }

  showErrorToast(message: string) {
    this.toastType = 'danger';
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3000);
  }
}
