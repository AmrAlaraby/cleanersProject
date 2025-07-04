import { Component } from '@angular/core';

@Component({
  selector: 'app-best-cleaner',
  templateUrl: './best-cleaner.component.html',
  styleUrls: ['./best-cleaner.component.css']
})
export class BestCleanerComponent {
  cleaners = [
    {
      name: 'BEST_CLEANER.ALICE_NAME',
      role: 'BEST_CLEANER.ALICE_ROLE',
      description: 'BEST_CLEANER.ALICE_DESC',
      image: '',
      alt: 'Alice Johnson'
    },
    {
      name: 'BEST_CLEANER.MARK_NAME',
      role: 'BEST_CLEANER.MARK_ROLE',
      description: 'BEST_CLEANER.MARK_DESC',
      image: '',
      alt: 'Mark Smith'
    },
    {
      name: 'BEST_CLEANER.SARAH_NAME',
      role: 'BEST_CLEANER.SARAH_ROLE',
      description: 'BEST_CLEANER.SARAH_DESC',
      image: '',
      alt: 'Sarah Lee'
    },
    {
      name: 'BEST_CLEANER.EMMA_NAME',
      role: 'BEST_CLEANER.EMMA_ROLE',
      description: 'BEST_CLEANER.EMMA_DESC',
      image: '',
      alt: 'Emma Brown'
    },
    {
      name: 'BEST_CLEANER.DAVID_NAME',
      role: 'BEST_CLEANER.DAVID_ROLE',
      description: 'BEST_CLEANER.DAVID_DESC',
      image: '',
      alt: 'David White'
    },
    {
      name: 'BEST_CLEANER.LINDA_NAME',
      role: 'BEST_CLEANER.LINDA_ROLE',
      description: 'BEST_CLEANER.LINDA_DESC',
      image: '',
      alt: 'Linda Green'
    }
  ];
}
