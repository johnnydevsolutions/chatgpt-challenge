import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})


export class QuizComponent implements OnInit {
  questions: any[] = [
    {
      question: 'Qual é a capital do Brasil?',
      options: ['Rio de Janeiro', 'Brasília', 'São Paulo', 'Belo Horizonte'],
      answer: 'Brasília'
    },
    {
      question: 'Qual é a maior montanha do mundo?',
      options: ['Everest', 'K2', 'Makalu', 'Lhotse'],
      answer: 'Everest'
    },
    {
      question: 'Qual é o país mais populoso do mundo?',
      options: ['Índia', 'Estados Unidos', 'China', 'Brasil'],
      answer: 'China'
    },
    {
      question: 'Qual é a maior economia do mundo?',
      options: ['UK', 'Estados Unidos', 'China', 'Finlandia'],
      answer: 'Estados Unidos'
    }
  ];
  currentQuestionIndex = 0;
  showResult = false;
  correctAnswers = 0;
  showPopup = false;
  showFailPopup = false;
  selectedOption: string | null = null;

  showSuccessPopup = false;
showErrorPopup = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(opt: string) {
    const question = this.questions[this.currentQuestionIndex];

    if (opt === question.answer) {
      this.correctAnswers++;
      question.result = 'correct';
    } else {
      question.result = 'wrong';
    }

    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResult = true;
      if (this.correctAnswers === this.questions.length) {
        this.showPopup = true;
      } else if (this.correctAnswers < this.questions.length / 2) {
        this.showFailPopup = true;
      }
    } else {
      this.currentQuestionIndex++;
    }
  }

  resetGame() {
    this.currentQuestionIndex = 0;
    this.showResult = false;
    this.correctAnswers = 0;
    this.showPopup = false;
    this.showFailPopup = false;
    this.selectedOption = null;
    this.questions.forEach((question) => {
      question.result = null;
    });
    this.shuffleQuestions();
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }


  shuffleArray(array: any[]) {
    let currentIndex = array.length;
    let temporaryValue: any;
    let randomIndex: number;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  closePopup() {
    this.showPopup = false;
  }


}
