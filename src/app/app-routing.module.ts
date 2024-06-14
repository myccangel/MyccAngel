import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'loader', pathMatch: 'full' },
  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then(m => m.LoaderPageModule),
    data: { pageName: 'Loader' }
  },
  {
    path: 'records',
    loadChildren: () => import('./pages/records/records.module').then(m => m.RecordsPageModule),
    data: { pageName: 'Records' }
  },
  {
    path: 'update',
    loadChildren: () => import('./pages/update/update.module').then(m => m.UpdatePageModule),
    data: { pageName: 'Update' }
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    data: { pageName: 'Home' }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    data: { pageName: 'Login' }
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
    data: { pageName: 'Register' }
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    data: { pageName: 'Profile' }
  },
  {
    path: 'library',
    loadChildren: () => import('./pages/library/library.module').then( m => m.LibraryPageModule),
    data: { pageName: 'Library' }
  },
  {
    path: 'connections',
    loadChildren: () => import('./pages/connections/connections.module').then( m => m.ConnectionsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
