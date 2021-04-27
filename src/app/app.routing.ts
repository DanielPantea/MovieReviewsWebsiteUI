import { LogInComponent } from './log-in/log-in.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: 'login', component: LogInComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);