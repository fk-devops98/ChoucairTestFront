import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginGuard } from './core/guards/login.guard';
import { SessionGuard } from './core/guards/session.guard';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppLayoutComponent,
          children: [
            {
              path: 'tareas',
              loadChildren: () =>
                import('./views/tareas/tareas.module').then((m) => m.TareasModule),
            },
          ],
          canActivate: [SessionGuard],
        },
        {
          path: 'login',
          component: LoginComponent,
          canActivate: [LoginGuard],
        },
        {
          path: 'register',
          component: RegisterComponent
        },
        { path: '**', redirectTo: '/tareas' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
