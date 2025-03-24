import { Component } from '@angular/core';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent {
  services = [
    {
      title: 'ALLSERVICES.OFFICE_CLEANING',
      description: 'ALLSERVICES.DESCRIPTION',
      image: '../../../../assets/images/Layout/241/Header/5(1).png',
      alt: 'Office Cleaning'
    },
    {
      title: 'ALLSERVICES.SPRING_CLEANING',
      description: 'ALLSERVICES.DESCRIPTION',
      image: '../../../../assets/images/Layout/241/Header/5.png',
      alt: 'Spring Cleaning'
    },
    {
      title: 'ALLSERVICES.HOUSE_CLEANING',
      description: 'ALLSERVICES.DESCRIPTION',
      image: '../../../../assets/images/Layout/241/Header/5(2).png',
      alt: 'House Cleaning'
    },
    {
      title: 'ALLSERVICES.OFFICE_CLEANING',
      description: 'ALLSERVICES.DESCRIPTION',
      image: '../../../../assets/images/Layout/241/Header/5(1).png',
      alt: 'Office Cleaning'
    },
    {
      title: 'ALLSERVICES.SPRING_CLEANING',
      description: 'ALLSERVICES.DESCRIPTION',
      image: '../../../../assets/images/Layout/241/Header/5.png',
      alt: 'Spring Cleaning'
    },
    {
      title: 'ALLSERVICES.HOUSE_CLEANING',
      description: 'ALLSERVICES.DESCRIPTION',
      image: '../../../../assets/images/Layout/241/Header/5(2).png',
      alt: 'House Cleaning'
    }
  ];
}
