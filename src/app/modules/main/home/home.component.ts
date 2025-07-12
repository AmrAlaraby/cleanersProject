import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MainService } from 'src/app/services/main.service';
import Swiper from 'swiper';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { category } from '../interfaces/interfaces';
import { TranslateService } from '@ngx-translate/core';
// register Swiper custom elements
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    categories: category[] = [];
    categoryNameMap: { [id: number]: string } = {};
  islogin: boolean = false;
  constructor(private authService: AuthenticationService,private _mainService: MainService,public translate: TranslateService) {}
ngOnInit(): void {
  this._mainService.getAllCategories().subscribe({
    next:(res) => {
      this.categories = res.slice(0, 3); // نعرض أول 3 فقط
    },complete:()=>this.updateCategoryNames()
  });
  this.initSwipers()
  register();

  if (this.authService.userData.getValue() != null) {
       
          
          this.islogin = true;}
}

initSwipers():void{
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    centeredSlides: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    
    breakpoints: {
      0:{
        slidesPerView: 1,
      },
      770: {
        slidesPerView: 2,

      },

    },
  });
  
}

teamMembers = [
  {
    image: 'assets/Team/6/Placeholder Image.png',
    name: 'HOME.TEAM.MEMBERS.ALICE.NAME',
    role: 'HOME.TEAM.MEMBERS.ALICE.ROLE',
    description: 'HOME.TEAM.MEMBERS.ALICE.DESCRIPTION'
  },
  {
    image: 'assets/Team/6/Placeholder Image.png',
    name: 'HOME.TEAM.MEMBERS.MARK.NAME',
    role: 'HOME.TEAM.MEMBERS.MARK.ROLE',
    description: 'HOME.TEAM.MEMBERS.MARK.DESCRIPTION'
  },
  {
    image: 'assets/Team/6/Placeholder Image.png',
    name: 'HOME.TEAM.MEMBERS.SARAH.NAME',
    role: 'HOME.TEAM.MEMBERS.SARAH.ROLE',
    description: 'HOME.TEAM.MEMBERS.SARAH.DESCRIPTION'
  },
  {
    image: 'assets/Team/6/Placeholder Image.png',
    name: 'HOME.TEAM.MEMBERS.EMMA.NAME',
    role: 'HOME.TEAM.MEMBERS.EMMA.ROLE',
    description: 'HOME.TEAM.MEMBERS.EMMA.DESCRIPTION'
  },
  {
    image: 'assets/Team/6/Placeholder Image.png',
    name: 'HOME.TEAM.MEMBERS.DAVID.NAME',
    role: 'HOME.TEAM.MEMBERS.DAVID.ROLE',
    description: 'HOME.TEAM.MEMBERS.DAVID.DESCRIPTION'
  },
  {
    image: 'assets/Team/6/Placeholder Image.png',
    name: 'HOME.TEAM.MEMBERS.LINDA.NAME',
    role: 'HOME.TEAM.MEMBERS.LINDA.ROLE',
    description: 'HOME.TEAM.MEMBERS.LINDA.DESCRIPTION'
  }
];

  testimonials = [
    {
      text: 'HOME.TESTIMONIALS.REVIEW_1',
      name: 'HOME.TESTIMONIALS.NAME_1',
      position: 'HOME.TESTIMONIALS.POSITION_1',
      image: '../../../../assets/Testimonial/11/Avatar1.png'
    },
    {
      text: 'HOME.TESTIMONIALS.REVIEW_2',
      name: 'HOME.TESTIMONIALS.NAME_2',
      position: 'HOME.TESTIMONIALS.POSITION_2',
      image: '../../../../assets/Testimonial/11/Avatar2.png'
    }
  ];

  updateCategoryNames() {
    this.categoryNameMap = {};
    for (let cat of this.categories) {
      this.categoryNameMap[cat.id] = this.translate.currentLang === 'ar' ? cat.arabicName : cat.englishName;
}
}
}


