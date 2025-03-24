import { Component } from '@angular/core';

@Component({
  selector: 'app-cleaners',
  templateUrl: './cleaners.component.html',
  styleUrls: ['./cleaners.component.css']
})
export class CleanersComponent {
  cleaners = [
    { image: '../../../../assets/Team/6/Placeholder Image.png' },
    { image: '../../../../assets/Team/6/Placeholder Image.png' },
    { image: '../../../../assets/Team/6/Placeholder Image.png' }
  ];
}
