import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";
import {BuyComponent} from "./pages/buy/buy.component";

const routes: Routes = [
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  { path: 'search', loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule),
    canActivate: [AuthGuard]
  },
  { path: 'buy', component: BuyComponent, loadChildren: () => import('./pages/buy/buy.module').then(m => m.BuyModule),
    canActivate: [AuthGuard]
  },
  { path: 'successful', loadChildren: () => import('./pages/successful/successful.module').then(m => m.SuccessfulModule),
    canActivate: [AuthGuard]
  },
  { path: '',
    redirectTo:'/login',
    pathMatch:'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
