import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PI, PIDict } from './pi';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('slideLeft', [
      state('2', style({transform: 'translateX(-40px)'})),
      state('1', style({transform: 'translateX(-80px)'})),
      state('0', style({transform: 'translateX(-120px)'})),
      transition('2 => 1', animate('600ms ease')),
      transition('1 => 0', animate('600ms ease')),
      transition('void => 2', animate('600ms ease')),
      transition('void => 1', animate('0ms')),
      transition('void => 0', animate('0ms')),
      transition(':enter', [
        style({transform: 'translateX(0px)'}),
        animate('600ms ease', style({transform: 'translateX(-40px)'}))
      ]),
      transition(':leave', [
        animate('100ms', style({opacity: 0}))
      ])
    ]),
  ]
})
export class AppComponent implements OnInit {
  letterToEnterIndex = 3;
  PI = PI
  PIList = PI.split('')
  PIDict = PIDict
  PIDictList = Object.entries(PIDict)
  isWrong = false

  
  currentlyShownLetter: [string, string][] = [] 
  
  form = new FormGroup({
    pi: new FormControl('')
  })
  
  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      pi: [""],
    })
    
    this.refreshCurrentLetters()
  }

  newLetterEntered(letter: string) {
    this.letterToEnterIndex++;
    this.form.controls.pi.setValue("")
    if (this.isWrong) {
      this.isWrong = false;
    }
    if (letter !== this.PIDict[this.letterToEnterIndex - 1]) {
      this.isWrong = true;
      this.letterToEnterIndex = 3;
    }
    this.refreshCurrentLetters();
  }

  refreshCurrentLetters() {
    this.currentlyShownLetter = this.PIDictList
      .filter(
        x =>  +x[0] >= this.letterToEnterIndex - 3 && 
              +x[0] < this.letterToEnterIndex
      );
  }

  range(start: number, end: number) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
  }
}
