# BB Foundation Bug Fixing Workflow

## 🎯 **Overview**

This document defines the systematic approach for handling bugs, features, and enhancements in the BB Foundation project. It provides both the workflow I'll follow and a template for you to submit clear, actionable requests.

## 🔧 **My Implementation Process**

When you provide a bug/feature request using the template below, I'll follow this structured 5-phase approach:

### **Phase 1: Analysis & Classification** (5-10 mins)
- **Parse Request**: Analyze your template submission for type, priority, and scope
- **Component Mapping**: Identify affected areas (theme service, UI components, build system, docs)
- **Impact Assessment**: Determine user impact and whether changes are breaking
- **Resource Planning**: Estimate effort and identify dependencies

### **Phase 2: Investigation & Reproduction** (10-15 mins)
- **Environment Setup**: Use existing demo app and development tools
- **Issue Reproduction**: Create reliable test case to demonstrate the problem
- **Root Cause Analysis**: 
  - Examine theme service (`projects/bb-foundation/src/lib/core/theme/`)
  - Check CSS custom properties and Material component integration
  - Review component architecture and signal-based state management
  - Analyze build configuration and dependency issues
- **Dependency Mapping**: Identify related files and potential side effects

### **Phase 3: Solution Design** (5-10 mins)
- **Strategy Selection**: Choose between patch, enhancement, or architectural change
- **Implementation Plan**: Define specific file changes and code modifications
- **Testing Strategy**: Plan unit tests, integration tests, and manual verification
- **Risk Assessment**: Evaluate breaking changes and migration requirements

### **Phase 4: Implementation** (15-30 mins)
- **Code Development**: 
  - Follow established BB Foundation patterns and conventions
  - Use Angular Signals for reactive state management
  - Maintain CSS custom property naming (`--bb-*` prefix)
  - Implement comprehensive error handling and fallbacks
  - Add debug logging for development troubleshooting
- **Test Development**: Write/update unit and integration tests
- **Documentation Updates**: Update relevant docs if API or behavior changes

### **Phase 5: Validation & Quality Assurance** (10-15 mins)
- **Automated Testing**: Run full validation suite
  ```bash
  npm run validate  # Runs build + test + format check
  npm run build:all # Builds both library and demo
  npm run test:all  # Runs all tests
  ```
- **Manual Verification**:
  - Test in demo application across different themes
  - Verify dark/light mode functionality
  - Check keyboard accessibility and ARIA compliance
  - Validate responsive behavior
- **Performance Check**: Ensure no bundle size or runtime regressions
- **Change Documentation**: Create clear commit message and update tracking

## 📝 **Request Template for You**

Copy and fill out this template when submitting bug reports or feature requests:

```markdown
# [Bug/Feature] Title

## Type
- [ ] Bug Fix
- [ ] New Feature  
- [ ] Enhancement
- [ ] Documentation
- [ ] Performance Issue

## Priority
- [ ] Critical (System broken/unusable)
- [ ] High (Major functionality affected)
- [ ] Medium (Minor functionality affected)
- [ ] Low (Nice to have)

## Description
[Clear description of the issue or feature request]

## Current Behavior
[What currently happens - for bugs only]

## Expected Behavior  
[What should happen]

## Steps to Reproduce (for bugs)
1. 
2. 
3. 

## Acceptance Criteria
- [ ] [Specific requirement 1]
- [ ] [Specific requirement 2]
- [ ] [Specific requirement 3]

## Additional Context
- **Affected Components**: [Theme service/UI components/Build system/etc.]
- **User Impact**: [Who is affected and how]
- **Breaking Change**: [Yes/No - will this break existing implementations?]
- **Screenshots/Examples**: [If applicable]

## Technical Notes (optional)
[Any technical details, constraints, or implementation hints]
```

## 🛠️ **Implementation Guidelines**

### **Code Standards**
- **Architecture**: Follow library-based pattern with clear separation between foundation and demo
- **Reactive Patterns**: Use Angular Signals for state management
- **Theme System**: Maintain CSS custom property conventions and Material integration
- **Error Handling**: Include comprehensive validation and fallback mechanisms
- **TypeScript**: Update interfaces and maintain strict type safety
- **Testing**: Write unit tests following existing patterns

### **File Structure**
```
projects/bb-foundation/src/lib/
├── core/
│   ├── theme/           # Theme service and interfaces
│   └── services/        # Core services
├── components/          # UI component library
└── index.ts            # Public API exports

projects/demo/           # Demonstration application
docs/                   # Documentation and specifications
```

### **Testing Requirements**
- **Unit Tests**: Component logic and service functionality
- **Integration Tests**: Theme switching and component interactions  
- **Manual Tests**: Demo app functionality and accessibility
- **Performance Tests**: Bundle size and runtime performance

### **Quality Gates**
All changes must pass:
- ✅ TypeScript compilation (`npm run build:lib`)
- ✅ Unit tests (`npm run test:lib`)  
- ✅ Demo app build (`npm run build:demo`)
- ✅ Linting (`npm run lint`)
- ✅ Code formatting (`npm run format:check`)
- ✅ Manual verification in demo app
- ✅ Theme switching functionality
- ✅ Dark/light mode compatibility

## 📊 **Classification System**

### **Bug Types**
- **Critical**: System unusable, build failures, security issues
- **High**: Major features broken, significant UX problems
- **Medium**: Minor functionality issues, edge cases
- **Low**: Cosmetic issues, nice-to-have improvements

### **Component Areas**
- **Theme Service**: Core theming functionality and CSS custom properties
- **UI Components**: Individual component implementations
- **Build System**: Angular configuration, bundling, and compilation
- **Documentation**: Guides, specifications, and examples
- **Demo App**: Demonstration and testing application

### **Change Types**
- **Patch**: Bug fixes that don't change public API
- **Enhancement**: New features or improvements to existing functionality
- **Breaking**: Changes that require user code modifications
- **Documentation**: Pure documentation updates without code changes

## 🚀 **Quick Reference**

### **For Bug Reports**
1. Fill out template with reproduction steps
2. Specify affected components and user impact
3. Include screenshots/examples if visual
4. Mark priority based on severity

### **For Feature Requests**  
1. Describe the desired functionality clearly
2. Define specific acceptance criteria
3. Consider breaking change implications
4. Provide use case context

### **For Enhancements**
1. Explain current limitations
2. Propose specific improvements
3. Consider backward compatibility
4. Define success metrics

This workflow ensures consistent, high-quality implementations that follow BB Foundation patterns while maintaining system stability and performance.