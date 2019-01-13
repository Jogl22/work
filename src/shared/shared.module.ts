import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [ 
        CommonModule,     
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatListModule, 
        MatCardModule
    ],
    declarations: [  ],
    exports:      [                     
        CommonModule, 
        FormsModule,     
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatListModule, 
        MatCardModule
    ]
   })
   export class SharedModule { }