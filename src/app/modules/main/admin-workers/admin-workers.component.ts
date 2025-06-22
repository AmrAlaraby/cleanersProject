import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-admin-workers',
  templateUrl: './admin-workers.component.html',
  styleUrls: ['./admin-workers.component.css']
})
export class AdminWorkersComponent {
 workers: any[] = [];
  categories: any[] = [];
  selectedCategoryId: any | '' = ''  ;
  searchTerm: string = '';
  defaultImage = './assets/Team-Member-Male-Placeholder.png'; 
  isLoading: boolean = false;
  lang: string = 'en';

  // Pagination
  pageIndex: number = 1;
  pageSize: number = 10;
  totalCount: number = 0;

  constructor(    private _mainService: MainService,) { }

  ngOnInit(): void {
        this.getCategories();
    this.getWorkers();
  }

  getCategories(): void {
    this._mainService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getWorkers(): void {
    this.isLoading = true;
    this._mainService.getAllWorkers(this.pageIndex, this.pageSize, this.searchTerm, this.selectedCategoryId).subscribe(res => {
      this.workers = res.data;
      this.totalCount = res.count;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }

  pageChanged(event: number) {
    this.pageIndex = event;
    this.getWorkers();
  }
}

