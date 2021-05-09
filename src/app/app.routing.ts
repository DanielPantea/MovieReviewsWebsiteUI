import { HomepageComponent } from './homepage/homepage.component';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { DiarypageComponent } from './diarypage/diarypage.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'register', component: RegisterComponent  },
    { path: 'diary', component:DiarypageComponent},
    { path: 'movie-details', component:MovieDetailsPageComponent},
    { path: 'homepage', component:HomepageComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);