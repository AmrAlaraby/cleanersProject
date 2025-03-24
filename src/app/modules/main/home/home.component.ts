import { Component } from '@angular/core';
import Swiper from 'swiper';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
ngOnInit(): void {
  this.initSwipers()
  register();
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
    image: 'https://via.placeholder.com/100',
    name: 'HOME.TEAM.MEMBERS.ALICE.NAME',
    role: 'HOME.TEAM.MEMBERS.ALICE.ROLE',
    description: 'HOME.TEAM.MEMBERS.ALICE.DESCRIPTION'
  },
  {
    image: 'https://via.placeholder.com/100',
    name: 'HOME.TEAM.MEMBERS.MARK.NAME',
    role: 'HOME.TEAM.MEMBERS.MARK.ROLE',
    description: 'HOME.TEAM.MEMBERS.MARK.DESCRIPTION'
  },
  {
    image: 'https://via.placeholder.com/100',
    name: 'HOME.TEAM.MEMBERS.SARAH.NAME',
    role: 'HOME.TEAM.MEMBERS.SARAH.ROLE',
    description: 'HOME.TEAM.MEMBERS.SARAH.DESCRIPTION'
  },
  {
    image: 'https://via.placeholder.com/100',
    name: 'HOME.TEAM.MEMBERS.EMMA.NAME',
    role: 'HOME.TEAM.MEMBERS.EMMA.ROLE',
    description: 'HOME.TEAM.MEMBERS.EMMA.DESCRIPTION'
  },
  {
    image: 'https://via.placeholder.com/100',
    name: 'HOME.TEAM.MEMBERS.DAVID.NAME',
    role: 'HOME.TEAM.MEMBERS.DAVID.ROLE',
    description: 'HOME.TEAM.MEMBERS.DAVID.DESCRIPTION'
  },
  {
    image: 'https://via.placeholder.com/100',
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
}


