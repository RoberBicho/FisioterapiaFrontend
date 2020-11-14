import { NgModule, LOCALE_ID } from '@angular/core';
import { DashboadComponent } from '../pages/dashboad/dashboad.component';
import { PagesComponent } from '../pages/pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routing';
import { FormsModule } from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CommonModule } from '@angular/common';
import { ModalUploadComponent } from '../resusableComp/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { HospitalService } from '../services/hospital.service';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico/medico.component';
import { SearchingComponent } from './searching/searching.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import { ModalDateComponent } from './dashboad/modal-date/modal-date.component';
import { CreateComponentComponent } from './dashboad/create-component/create-component.component';
import { CreateComponentDirective } from './dashboad/create-component/create-component.directive';
import { BlogComponent } from './blog/blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogReadComponent } from './blog/blog-read/blog-read.component';
import { MatStepperModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material'; 
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

registerLocaleData(localeFr);
registerLocaleData(localeEs, 'es');
registerLocaleData(localeEs, 'en');

@NgModule({
  declarations: [
    DashboadComponent,
    PagesComponent,
    AccountSettingsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    SearchingComponent,
    ModalDateComponent,
    CreateComponentComponent,
    CreateComponentDirective,
    BlogComponent,
    BlogPostComponent,
    BlogEditComponent,
    BlogReadComponent

  ],
  exports: [
    DashboadComponent,
    PagesComponent
    
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    CommonModule,
    PipesModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatStepperModule, 
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    EditorModule
    
  ],
  providers: [HospitalService, {provide: LOCALE_ID, useValue: 'en'}, { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],

  entryComponents: [
    CreateComponentComponent
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class PagesModule { }