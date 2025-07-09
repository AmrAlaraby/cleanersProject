import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MainService } from 'src/app/services/main.service';
import { categories } from '../interfaces/interfaces';
// @ts-ignore
import { Toast } from 'bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-choose-catrgory',
  templateUrl: './choose-catrgory.component.html',
  styleUrls: ['./choose-catrgory.component.css']
})
export class ChooseCatrgoryComponent {
  toastMessage: string = '';
  isLoading = false;
  Loader:boolean=false
  chosedId=0
   services:categories=[]
     constructor(private _mainService:MainService,public translate: TranslateService,private _router:Router
     ){}
   
     categoryNameMap: { [id: number]: string } = {};
     ngOnInit(): void {
       this.getCategories()
       this.updateCategoryNames();
   
     this.translate.onLangChange.subscribe(() => {
       this.updateCategoryNames();
     });
     }
     choose(id: number) {
      this.isLoading = true;
      this.chosedId=id
      this._mainService.ChooseCategories(id).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.showToast('Category chosen successfully! ✅');
          console.log(res);
          setTimeout(() => this._router.navigate(['/home']), 500);
        },
        error: (err: any) => {
          this.isLoading = false;
          this.showToast(err.error?.message || 'An error occurred');
          console.error(err);
        }
      });
    }
        showToast(message: string) {
          this.toastMessage = message;
          const toastEl = document.getElementById('loginToast');
          if (toastEl) {
            const toast = new Toast(toastEl);
            toast.show();
          }
        }

     
     getCategories(){
      this.Loader=true
       this._mainService.getAllCategories().subscribe({
         next:(res)=>{
           console.log(res)
           this.services=res
           this.Loader=false

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

