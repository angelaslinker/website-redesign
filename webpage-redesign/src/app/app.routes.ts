import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'quiz', component: QuizComponent },
];
