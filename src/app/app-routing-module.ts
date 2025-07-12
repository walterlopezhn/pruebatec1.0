
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Pagina1Component } from './pagina1/pagina1';
import { Pagina2Component } from './pagina2/pagina2';
import { Pagina3Component } from './pagina3/pagina3';


const routes: Routes = [
  
 {path: '', component: Home},
 {path: 'clientes', component: Pagina1Component},
 {path: 'productos', component: Pagina2Component },
 {path: 'orden', component: Pagina3Component},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
