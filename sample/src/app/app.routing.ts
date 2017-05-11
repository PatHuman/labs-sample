import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AgendaComponent} from './agenda/agenda.component';
import {VplayerComponent} from './vplayer/vplayer.component';
import {ArticlesComponent} from './articles/articles.component';  

const appRoutes: Routes = [
	  {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {path : 'home', component : HomeComponent },
       {path: 'projects', loadChildren: 'app/project/project.module#ProjectModule' }, 
      // {path: 'access', loadChildren: 'app/access/access.module#AccessModule' }, 
       {path : 'agenda', component : AgendaComponent }, 
       {path : 'layout', component : VplayerComponent }, 
       {path : 'articles', component : ArticlesComponent }, 
  /*    {path: 'heroes',  component: MyTodoComponent },
      {path: 'detail/:id', component: MyTodoDetailComponent },
  	  
  	  {path : 'categories', component : CategoryComponent }, 
      {path : 'articles', component : ArticleComponent }, 
 	 
      {path: 'dashboard', component: DashboardComponent,canActivate: ['GateKeeper'] } ,
      {path: 'relay', loadChildren: 'app/relay/relay.module#RelayModule' }, 
     {path: 'labs', loadChildren: 'app/projectize/projectize.module#ProjectizeModule' } 
     */
];

export const routing = RouterModule.forRoot(appRoutes);
