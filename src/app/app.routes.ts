import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: ':zip', component: AppComponent },
    { path: '', redirectTo: '/90210', pathMatch: 'full' }
];
