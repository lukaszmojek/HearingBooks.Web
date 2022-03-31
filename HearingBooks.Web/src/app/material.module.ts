import { NgModule } from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'

const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatIconModule,
  MatCardModule,
  MatDividerModule,
]

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MaterialModule {}
