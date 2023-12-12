import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PI } from './pi';
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
      
      // transition('* => *', animate('600ms ease')),
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
  animationState = 'start';
  currentlyShownLetter = PI.slice(this.letterToEnterIndex - 3, this.letterToEnterIndex).split('');

  form = new FormGroup({
    pi: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log('AppComponent.onInit()');
    console.log(PI)

    this.form = this.formBuilder.group({
      pi: [""],
    })
  }

  newLetterEntered(letter: string) {
    this.animationState = 'end';
    this.letterToEnterIndex++;
    this.form.controls.pi.setValue("")
    this.currentlyShownLetter = PI.slice(this.letterToEnterIndex - 3, this.letterToEnterIndex).split('');
    console.log(this.currentlyShownLetter)
  }

  letterClicked(index: number, letter: string | null) {
    console.log(`letterClicked(${index}, ${letter})`)
  }
  animationDone(event: any) {
    console.log(event)
  }
}
