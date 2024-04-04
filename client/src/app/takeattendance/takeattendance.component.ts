import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HeaderMergedComponent } from "../header-merged/header-merged.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-takeattendance',
  standalone: true,
  templateUrl: './takeattendance.component.html',
  styleUrl: './takeattendance.component.css',
  imports: [MatFormFieldModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, HeaderMergedComponent, FormsModule, CommonModule]
})
export class TakeattendanceComponent {
  //   buttonColorIndex: number = 0;
  //   buttonColors: string[] = ['green', 'red', 'orange'];
  //   buttonTexts: string[] = ['Present', 'Absent', 'Leave'];

  //   users = [
  //     { id: 'user-1', roll: '233205', name: 'suraj jitendra borgave', attence: '' },
  //     { id: 'user-2', roll: '233206', name: 'shubham dhondiram sargar', attence: '' },
  //     { id: 'user-3', roll: '233207', name: 'manas chandrashekahar patil', attence: '' },
  //     { id: 'user-4', roll: '233208', name: 'suraj shantinath upadhye', attence: '' }
  //   ];

  //   changeColor() {
  //     this.buttonColorIndex = (this.buttonColorIndex + 1) % this.buttonColors.length;
  //   }

  //   get buttonColor(): string {
  //     return this.buttonColors[this.buttonColorIndex];
  //   }

  //   get buttonText(): string {
  //     return this.buttonTexts[this.buttonColorIndex];
  //   }
  // }
  users = [
    { roll: '233205', name: 'suraj jitendra borgave', attence: 'Present' },
    { roll: '233206', name: 'shubham dhondiram sargar', attence: 'Present' },
    { roll: '233207', name: 'manas chandrashekahar patil', attence: 'Present' },
    { roll: '233208', name: 'suraj shantinath upadhye', attence: 'Present' },
    { roll: '233209', name: 'atharv anil niprul', attence: 'Present' },
  ];

  onfun(){

    console.log(this.users)
  }
  changeColor(index: number) {
    const user = this.users[index];
    switch (user.attence) {
      case 'Present':
        user.attence = 'Absent';
        break;
      case 'Absent':
        user.attence = 'Leave';
        break;
      case 'Leave':
        user.attence = 'Present';
        break;
    }
  }
}

