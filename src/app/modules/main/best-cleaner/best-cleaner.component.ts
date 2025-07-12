import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { worker } from '../interfaces/interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-best-cleaner',
  templateUrl: './best-cleaner.component.html',
  styleUrls: ['./best-cleaner.component.css']
})
export class BestCleanerComponent implements OnInit {
  @Input() categoryId?: number;

  math = Math;
  cleaners: worker[] = [];
  Loader = false;

  defaultImages = [
    'https://res.cloudinary.com/ducftdiug/image/upload/userImage_e8xgpm.png',
    'https://res.cloudinary.com/ducftdiug/image/upload/userImage1_swvrns.png',
    'https://res.cloudinary.com/ducftdiug/image/upload/userImage4_rbf730.png',
    'https://res.cloudinary.com/ducftdiug/image/upload/userImage3_mwc4rn.png',
    'https://res.cloudinary.com/ducftdiug/image/upload/userImage2_bln0bn.png',
    'https://res.cloudinary.com/ducftdiug/image/upload/userImage5_dxefya.png'
  ];

  constructor(
    private _mainService: MainService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.Loader = true;

    if (this.categoryId) {
      this._mainService.getRecommendedWorkersByCategory(this.categoryId).subscribe({
        next: (res: worker[]) => {
          if (res && res.length > 0) {
            this.setCleaners(res);
          } else {
            this.loadFallback();
          }
        },
        error: () => {
          this.loadFallback();
        }
      });
    } else {
      this.loadFallback();
    }
  }

  loadFallback() {
    this._mainService.getRecommendedWorkers().subscribe({
      next: (res: worker[]) => {
        this.setCleaners(res);

        
      },
      error: () => {
        this.Loader = false;
      }
    });
  }

  setCleaners(workers: worker[]) {
    this.cleaners = workers.map((worker, index) => ({
      ...worker,
      profilePictureUrl: worker.profilePictureUrl || this.defaultImages[index % this.defaultImages.length]
    }));
    this.Loader = false;
  }

  getCategoryName(category: any): string {
    return this.translate.currentLang === 'ar'
      ? category.categoryArabicName
      : category.categoryEnglishName;
  }
}
