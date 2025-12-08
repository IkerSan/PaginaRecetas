import { Routes } from '@angular/router';
import { RecetasComponent } from './receta/receta';
import { RecetaDetailComponent } from './receta/receta-detail/receta-detail.component';

export const routes: Routes = [
    { path: '', component: RecetasComponent },
    { path: 'receta/:id', component: RecetaDetailComponent }
];
