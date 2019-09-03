import { NgModule } from "@angular/core";

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatInputModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        MatInputModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class MaterialModule { }