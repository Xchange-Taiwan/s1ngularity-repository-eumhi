# 🚀 CI/CD Pipeline Documentation

## Overview

This document describes the comprehensive CI/CD pipeline setup for the X-Talent project, designed to ensure high code quality, security, and performance.

## 🎯 Pipeline Goals

- ✅ Automatically check code quality on each push/PR
- 🔒 Run security scans and vulnerability checks
- ⚡ Monitor performance and bundle size
- 🧪 Execute tests (when implemented)
- 🚫 Fail pipeline if any issues are found
- 📊 Provide detailed feedback and reports

## 🔧 Workflow Files

### 1. **Main CI Pipeline** (`.github/workflows/ci.yml`)

**Triggers:** Push to main/develop, Pull Requests
**Jobs:**

- Code Quality Checks (TypeScript, ESLint, Prettier)
- Security Scanning (Dependencies, Secrets, CodeQL)
- Build Testing
- Storybook Build Validation
- Accessibility Testing
- Performance Monitoring

### 2. **Pull Request Checks** (`.github/workflows/pr-checks.yml`)

**Triggers:** Pull Request events
**Features:**

- PR title format validation (Conventional Commits)
- Change analysis and file categorization
- Large PR detection
- Sensitive file change alerts
- Orchestrates other workflow calls

### 3. **Code Quality** (`.github/workflows/code-quality.yml`)

**Triggers:** Code changes, workflow calls
**Checks:**

- Prettier formatting
- ESLint rules compliance
- TypeScript compilation
- TODO/FIXME comment detection
- `any` type usage detection
- Unused dependency detection
- File size analysis
- Console statement detection

### 4. **Security** (`.github/workflows/security.yml`)

**Triggers:** Push, PR, Daily schedule
**Scans:**

- Dependency vulnerabilities (`pnpm audit`)
- Secret scanning (TruffleHog)
- Code scanning (GitHub CodeQL)
- Hardcoded secret detection
- License compliance checking
- Environment security validation

### 5. **Performance** (`.github/workflows/performance.yml`)

**Triggers:** Pull Requests with relevant changes
**Tests:**

- Bundle size analysis
- Lighthouse audits (Performance, Accessibility, SEO)
- Large chunk detection
- Accessibility compliance (axe-core)

### 6. **Testing** (`.github/workflows/test.yml`)

**Triggers:** Push, Pull Requests
**Ready for:**

- Unit tests (Jest/Vitest)
- Component tests (React Testing Library)
- Integration tests (Playwright/Cypress)
- Coverage reporting (Codecov)

## 📋 Required Secrets

Add these secrets in your GitHub repository settings:

```bash
# Vercel Deployment
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
VERCEL_DS_PROJECT_ID=your_storybook_project_id

# Application Environment
NEXT_PUBLIC_API_URL=your_api_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_app_url
```

## 🚦 Quality Gates

### ❌ Pipeline Fails If:

- TypeScript compilation errors
- ESLint errors (warnings allowed)
- Prettier formatting issues
- Security vulnerabilities (moderate+)
- Build failures
- Console statements in source code
- TODO/FIXME comments
- Hardcoded secrets detected
- Accessibility score < 90%

### ⚠️ Pipeline Warns If:

- Large files (>300 lines)
- Large PRs (>20 files)
- Performance score < 80%
- Bundle size increases significantly
- Unused dependencies found

## 📊 Reports Generated

1. **Security Report** - Vulnerability scan results
2. **License Report** - Dependency license compliance
3. **Bundle Analysis** - Size and composition analysis
4. **Lighthouse Report** - Performance and accessibility scores
5. **Change Analysis** - PR impact assessment

## 🔧 Local Development

### Pre-commit Hooks

```bash
# Already configured with Husky
# Runs on every commit:
- lint-staged (ESLint + Prettier)
```

### Manual Quality Checks

```bash
# Run all CI checks locally
pnpm run ci

# Individual checks
pnpm run lint:check      # Check formatting & linting
pnpm run type-check      # TypeScript compilation
pnpm run security:audit  # Security audit
pnpm run deps:check      # Unused dependencies
```

## 🎯 PR Requirements

### Title Format (Conventional Commits)

```
feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
style: format component files
refactor: restructure auth components
test: add login form tests
chore: update dependencies
perf: optimize image loading
ci: improve build performance
```

### Required Checks

- ✅ All CI jobs must pass
- ✅ PR description required
- ✅ No draft PRs in review
- ✅ Sensitive file changes flagged for review

## 🔄 Workflow Optimization

### Caching Strategy

- **pnpm store** - Cached across jobs
- **Node modules** - Cached by lock file hash
- **Build artifacts** - Cached for performance tests

### Parallel Execution

- Code quality and security run in parallel
- Performance tests run after build validation
- Independent job execution for faster feedback

### Conditional Execution

- Draft PRs skip most checks
- Performance tests only on relevant changes
- Security scans run daily + on changes

## 🚀 Deployment Integration

### Vercel Integration

- **Main branch** → Production deployment
- **Pull Requests** → Preview deployments
- **Storybook** → Separate design system deployment

### Environment Promotion

1. **Development** - Feature branches
2. **Staging** - Pull request previews
3. **Production** - Main branch merges

## 📈 Monitoring & Alerts

### GitHub Notifications

- Failed builds notify PR authors
- Security issues create alerts
- Performance regressions flagged

### Reporting

- Weekly dependency updates
- Monthly security audit summaries
- Performance trend analysis

## 🛠️ Troubleshooting

### Common Issues

**Build Failures:**

```bash
# Check locally first
pnpm run build

# Common fixes
pnpm install --frozen-lockfile
pnpm run type-check
```

**Linting Errors:**

```bash
# Auto-fix most issues
pnpm run lint:fix

# Check specific files
pnpm exec eslint src/path/to/file.tsx
```

**Security Alerts:**

```bash
# Check vulnerabilities
pnpm audit

# Fix automatically
pnpm audit --fix
```

### Pipeline Debugging

- Check job logs in GitHub Actions
- Run commands locally to reproduce
- Use `--verbose` flags for detailed output

## 🔮 Future Enhancements

### Planned Additions

- [ ] Visual regression testing
- [ ] E2E test automation
- [ ] Performance budgets
- [ ] Automated dependency updates
- [ ] Code coverage requirements
- [ ] Deployment rollback automation

### Testing Framework Integration

```bash
# When adding tests, update package.json:
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
"test:e2e": "playwright test"
```

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [Vercel Deployment](https://vercel.com/docs/deployments/git)

---

**Need Help?** Check the workflow logs in GitHub Actions or contact the development team.
