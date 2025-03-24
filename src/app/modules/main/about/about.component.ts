import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  teamMembers = [
    {
      name: 'Alice Johnson',
      position: 'Operations Manager',
      description: 'Alice ensures smooth operations and exceptional service delivery across all cleaning projects.',
      image: '../../../../assets/Team/6/Placeholder Image.png',
      social: {
        facebook: '#',
        twitter: '#'
      }
    },
    {
      name: 'John Doe',
      position: 'Lead Cleaner',
      description: 'John is an expert in deep cleaning and ensures the highest standards for every project.',
      image: '../../../../assets/Team/6/Placeholder Image.png',
      social: {
        facebook: '#',
        twitter: '#'
      }
    },
    {
      name: 'Emily Smith',
      position: 'Customer Relations',
      description: 'Emily handles customer inquiries and makes sure clients are satisfied with our service.',
      image: '../../../../assets/Team/6/Placeholder Image.png',
      social: {
        facebook: '#',
        twitter: '#'
      }
    }
  ];

}
