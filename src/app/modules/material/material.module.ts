import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  exports:[
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule
  ]}
)
export class MaterialModule { }
