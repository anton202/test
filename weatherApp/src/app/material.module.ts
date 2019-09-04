import { NgModule } from "@angular/core";

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule { }