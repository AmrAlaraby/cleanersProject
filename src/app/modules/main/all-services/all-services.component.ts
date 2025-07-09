import { Component, OnInit } from '@angular/core';
import { categories } from '../interfaces/interfaces';
import { MainService } from 'src/app/services/main.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit {
  services:categories=[]
  Loader:boolean=false;
  constructor(private _mainService:MainService,public translate: TranslateService
  ){}

  categoryNameMap: { [id: number]: string } = {};
  ngOnInit(): void {
    this.getCategories()
    this.updateCategoryNames();

  this.translate.onLangChange.subscribe(() => {
    this.updateCategoryNames();
  });
  }
  getCategories(){
    this.Loader=true
    this._mainService.getAllCategories().subscribe({
      next:(res)=>{
        this.Loader=false
        this.services=res
      },complete:()=>this.updateCategoryNames()
    })
  }

  updateCategoryNames() {
    this.categoryNameMap = {};
    for (let cat of this.services) {
      this.categoryNameMap[cat.id] = this.translate.currentLang === 'ar' ? cat.arabicName : cat.englishName;
}
}
}