import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService, THEME_SERVICE_CONFIG } from './core/theme/theme.service';
import { ThemeUtilsService } from './utils/theme-utils.service';
import { ThemeServiceConfig } from './core/theme/theme.interface';

/**
 * B01 Foundation Module
 * 
 * Provides the complete B01 foundation theming system for Angular applications.
 * This module includes the theme service, utilities, and all necessary providers.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ThemeService,
    ThemeUtilsService
  ]
})
export class BbFoundationModule {
  
  /**
   * Configure the foundation module with custom settings
   */
  static forRoot(config?: ThemeServiceConfig) {
    return {
      ngModule: BbFoundationModule,
      providers: [
        ThemeService,
        ThemeUtilsService,
        {
          provide: THEME_SERVICE_CONFIG,
          useValue: config
        }
      ]
    };
  }
  
  /**
   * Use this for feature modules (no configuration needed)
   */
  static forChild() {
    return {
      ngModule: BbFoundationModule,
      providers: [
        // Don't provide ThemeService here - use root instance
        ThemeUtilsService
      ]
    };
  }
}