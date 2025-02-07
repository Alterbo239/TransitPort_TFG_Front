import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes} from './app/app.routes';
import { LogInComponent} from './app/log-in/log-in.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

