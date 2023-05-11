import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent, PostsComponent, RegisterComponent} from './components';
import {MainLayoutComponent} from "./layouts";
import {AuthGuard} from "./guards";
import {PostResolver} from "./services";
import {Error404Component} from "./components/error404/error404.component";
import {HomeComponent} from "./components/home/home.component";
import {PostCreateEditComponent} from "./components/post-create-edit/post-create-edit.component";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {
        path: 'posts',
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {data: PostResolver},
        component: PostsComponent,
      },
      {
        path: 'createpost',
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {data: PostResolver},
        component: PostCreateEditComponent
      },

      {path: '**', redirectTo: 'error404', title: '404', data: {error: 404}},
      {path: 'error404', data: {error: 404}, component: Error404Component}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
