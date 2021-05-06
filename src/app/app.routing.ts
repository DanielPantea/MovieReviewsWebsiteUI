import { DiarypageComponent } from './diarypage/diarypage.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';


const routes: Routes = [
    { path: 'navbar',component: NavbarComponent},
    { path: 'login', component: LogInComponent },
    { path: 'register', component: RegisterComponent  },
    { path: 'diary', component:DiarypageComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);