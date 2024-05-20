import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { appRoutes } from './app.routes';
import { FormsModule } from '@angular/forms';

export const appConfig = {
  providers: [
    provideRouter(appRoutes)
  ]
};
