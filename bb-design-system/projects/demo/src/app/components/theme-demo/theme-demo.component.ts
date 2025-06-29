import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '@bb/foundation';
// Angular Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-theme-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatStepperModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    MatAutocompleteModule
  ],
  templateUrl: './theme-demo.component.html',
  styleUrls: ['./theme-demo.component.scss']
})
export class ThemeDemoComponent {
  private fb = inject(FormBuilder);
  private themeService = inject(ThemeService);

  // Form groups for stepper
  firstFormGroup: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  secondFormGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required]
  });

  // Sample data for demos
  sampleUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' }
  ];

  sampleProducts = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, stock: 15 },
    { id: 2, name: 'Mouse', category: 'Electronics', price: 29.99, stock: 50 },
    { id: 3, name: 'Keyboard', category: 'Electronics', price: 79.99, stock: 25 },
    { id: 4, name: 'Monitor', category: 'Electronics', price: 299.99, stock: 10 },
    { id: 5, name: 'Headphones', category: 'Electronics', price: 149.99, stock: 30 }
  ];

  // Form data
  formData = {
    name: '',
    email: '',
    category: '',
    message: '',
    agree: false,
    notifications: 'all'
  };

  // Additional properties for template
  selectedDate: Date | null = null;
  selectedTags: string[] = [];
  sliderValue = 50;
} 