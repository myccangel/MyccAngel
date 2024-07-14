import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth-guard';

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
    data: { pageName: 'Profile' },
    canActivate: [AuthGuard]
  },
  {
    path: 'library',
    loadChildren: () => import('./pages/library/library.module').then( m => m.LibraryPageModule),
    data: { pageName: 'Library' },
    canActivate: [AuthGuard]
  },
  {
    path: 'connections',
    loadChildren: () => import('./pages/connections/connections.module').then( m => m.ConnectionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'donation',
    loadChildren: () => import('./pages/donation/donation.module').then( m => m.DonationPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/video/video.module').then( m => m.VideoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'photo',
    loadChildren: () => import('./pages/photo/photo.module').then( m => m.PhotoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.module').then( m => m.BlogPageModule),
    canActivate: [AuthGuard]
  },  {
    path: 'partner',
    loadChildren: () => import('./pages/partner/partner.module').then( m => m.PartnerPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'contact-form',
    loadChildren: () => import('./pages/contact-form/contact-form.module').then( m => m.ContactFormPageModule)
  },
  {
    path: 'about-ibd',
    loadChildren: () => import('./pages/about-ibd/about-ibd.module').then( m => m.AboutIbdPageModule)
  },
  {
    path: 'ai-help',
    loadChildren: () => import('./pages/ai-help/ai-help.module').then( m => m.AiHelpPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'resources',
    loadChildren: () => import('./pages/resources/resources.module').then( m => m.ResourcesPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
