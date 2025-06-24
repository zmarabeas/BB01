import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { THEMES, ThemeName } from '../interfaces/theme.interface';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockLocalStorage: { [key: string]: string } = {};

  beforeEach(() => {
    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => mockLocalStorage[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      mockLocalStorage[key] = value;
    });

    // Mock window.matchMedia for dark mode detection
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jasmine.createSpy('matchMedia').and.returnValue({
        matches: false,
        media: '',
        onchange: null,
        addListener: jasmine.createSpy('addListener'),
        removeListener: jasmine.createSpy('removeListener'),
        addEventListener: jasmine.createSpy('addEventListener'),
        removeEventListener: jasmine.createSpy('removeEventListener'),
        dispatchEvent: jasmine.createSpy('dispatchEvent'),
      }),
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    mockLocalStorage = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with coastal theme by default', () => {
    expect(service.currentTheme()).toBe('coastal');
  });

  it('should initialize with light mode by default', () => {
    expect(service.isDarkMode()).toBe(false);
    expect(service.themeMode()).toBe('light');
  });

  it('should load saved theme from localStorage', () => {
    mockLocalStorage['demo-theme'] = 'icarus';
    service = TestBed.inject(ThemeService);
    expect(service.currentTheme()).toBe('icarus');
  });

  it('should load saved mode from localStorage', () => {
    mockLocalStorage['demo-mode'] = 'dark';
    service = TestBed.inject(ThemeService);
    expect(service.isDarkMode()).toBe(true);
    expect(service.themeMode()).toBe('dark');
  });

  it('should change theme and save to localStorage', () => {
    service.changeTheme('midnight-lightning');
    expect(service.currentTheme()).toBe('midnight-lightning');
    expect(localStorage.setItem).toHaveBeenCalledWith('demo-theme', 'midnight-lightning');
  });

  it('should not change theme for invalid theme name', () => {
    const originalTheme = service.currentTheme();
    service.changeTheme('invalid-theme' as ThemeName);
    expect(service.currentTheme()).toBe(originalTheme);
  });

  it('should toggle dark mode', () => {
    expect(service.isDarkMode()).toBe(false);
    
    service.toggleDarkMode();
    expect(service.isDarkMode()).toBe(true);
    expect(service.themeMode()).toBe('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('demo-mode', 'dark');
    
    service.toggleDarkMode();
    expect(service.isDarkMode()).toBe(false);
    expect(service.themeMode()).toBe('light');
    expect(localStorage.setItem).toHaveBeenCalledWith('demo-mode', 'light');
  });

  it('should set theme mode to auto', () => {
    service.setThemeMode('auto');
    expect(service.themeMode()).toBe('auto');
    expect(localStorage.setItem).toHaveBeenCalledWith('demo-mode', 'auto');
  });

  it('should get current theme config', () => {
    const theme = service.getCurrentTheme();
    expect(theme).toEqual(THEMES.coastal);
  });

  it('should get all themes', () => {
    const themes = service.getAllThemes();
    expect(themes.length).toBe(5);
    expect(themes.map(t => t.name)).toContain('coastal');
    expect(themes.map(t => t.name)).toContain('icarus');
    expect(themes.map(t => t.name)).toContain('midnight-lightning');
    expect(themes.map(t => t.name)).toContain('future-house');
    expect(themes.map(t => t.name)).toContain('wedding-adjacent');
  });

  it('should update CSS variables when theme changes', () => {
    const mockSetProperty = jasmine.createSpy('setProperty');
    const mockClassList = {
      toggle: jasmine.createSpy('toggle')
    };
    const mockSetAttribute = jasmine.createSpy('setAttribute');
    
    Object.defineProperty(document, 'documentElement', {
      value: {
        style: { setProperty: mockSetProperty },
        classList: mockClassList,
        setAttribute: mockSetAttribute
      },
      writable: true
    });

    service.changeTheme('icarus');
    
    expect(mockSetProperty).toHaveBeenCalledWith('--primary', THEMES.icarus.colors.primary);
    expect(mockSetProperty).toHaveBeenCalledWith('--secondary', THEMES.icarus.colors.secondary);
    expect(mockSetProperty).toHaveBeenCalledWith('--surface', THEMES.icarus.colors.surface);
    expect(mockSetProperty).toHaveBeenCalledWith('--neutral', THEMES.icarus.colors.neutral);
    expect(mockSetProperty).toHaveBeenCalledWith('--text', THEMES.icarus.colors.text);
    expect(mockSetProperty).toHaveBeenCalledWith('--background', THEMES.icarus.colors.background);
    expect(mockSetAttribute).toHaveBeenCalledWith('data-theme', 'icarus');
  });

  it('should apply dark mode CSS variables', () => {
    const mockSetProperty = jasmine.createSpy('setProperty');
    const mockClassList = {
      toggle: jasmine.createSpy('toggle')
    };
    const mockSetAttribute = jasmine.createSpy('setAttribute');
    
    Object.defineProperty(document, 'documentElement', {
      value: {
        style: { setProperty: mockSetProperty },
        classList: mockClassList,
        setAttribute: mockSetAttribute
      },
      writable: true
    });

    service.toggleDarkMode();
    
    expect(mockSetProperty).toHaveBeenCalledWith('--background', '#1a1a1a');
    expect(mockSetProperty).toHaveBeenCalledWith('--text', '#ffffff');
    expect(mockSetProperty).toHaveBeenCalledWith('--surface', '#2d2d2d');
    expect(mockSetProperty).toHaveBeenCalledWith('--neutral', '#404040');
    expect(mockClassList.toggle).toHaveBeenCalledWith('dark', true);
  });
}); 