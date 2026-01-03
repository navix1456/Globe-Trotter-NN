# Git Commit Guide - Best Practices

## 📋 Quick Reference Commands

```bash
# Check status
git status

# Stage specific files
git add <file>

# Stage all changes
git add .

# Commit with message
git commit -m "type: description"

# Push to remote
git push origin main

# View commit history
git log --oneline

# Amend last commit (if not pushed)
git commit --amend -m "new message"
```

---

## ✅ Good Commit Message Format

```
<type>: <short description>

[optional body]

[optional footer]
```

### Commit Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting (no logic change)
- `refactor`: Code restructuring (no feature/fix)
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Build process, dependencies, tooling
- `ui`: UI/UX improvements
- `security`: Security improvements

---

## 🎯 10 Example Commits for GlobeTrotter

### 1. Landing Page Enhancement
```bash
git add src/App.tsx src/App.css
git commit -m "ui: add interactive gallery section to landing page

- Add 6 destination images with hover effects
- Implement masonry-style grid layout
- Remove duplicate testimonials and stats sections
- Optimize page structure and flow"
git push
```

### 2. Remove Duplicates
```bash
git add src/App.tsx
git commit -m "refactor: remove duplicate sections from landing page

- Remove duplicate testimonials section
- Remove duplicate stats section
- Reduce page length by 40%"
git push
```

### 3. Add Responsive Styles
```bash
git add src/App.css
git commit -m "style: add mobile responsive styles for gallery

- Gallery adapts to single column on mobile
- Optimize image sizes for smaller screens
- Add touch-friendly hover states"
git push
```

### 4. Authentication System
```bash
git add src/contexts/AuthContext.tsx src/pages/LoginPage.tsx src/pages/RegisterPage.tsx
git commit -m "feat: implement user authentication system

- Add Auth Context for global state management
- Create login and registration pages
- Integrate Supabase authentication
- Add protected route wrapper"
git push
```

### 5. Dashboard Features
```bash
git add src/pages/DashboardPage.tsx src/components/TripCard.tsx
git commit -m "feat: add user dashboard with trip management

- Display user's trips in grid layout
- Add quick action buttons
- Show trip statistics
- Implement trip filtering"
git push
```

### 6. Bug Fix
```bash
git add src/components/ProtectedRoute.tsx
git commit -m "fix: resolve redirect issue in protected routes

- Fix infinite loop in authentication check
- Add proper loading state handling
- Improve error boundary"
git push
```

### 7. API Integration
```bash
git add src/services/api.ts src/config/supabase.ts
git commit -m "feat: integrate Supabase API for backend operations

- Set up Supabase client configuration
- Add API service layer for data operations
- Implement error handling and retry logic"
git push
```

### 8. Performance Optimization
```bash
git add src/App.tsx src/components/*.tsx
git commit -m "perf: optimize component rendering and image loading

- Add lazy loading for images
- Implement React.memo for expensive components
- Reduce bundle size by code splitting"
git push
```

### 9. Documentation
```bash
git add README.md docs/*.md
git commit -m "docs: update project documentation and setup guide

- Add comprehensive README with screenshots
- Document API endpoints
- Add troubleshooting section
- Include deployment instructions"
git push
```

### 10. Security Enhancement
```bash
git add src/utils/validation.ts src/middleware/auth.ts
git commit -m "security: add input validation and XSS protection

- Implement input sanitization
- Add CSRF token validation
- Secure API endpoints with JWT
- Add rate limiting"
git push
```

---

## 🔄 Common Git Workflows

### For Current Changes (Landing Page):
```bash
# 1. Check what changed
git status

# 2. Review changes
git diff

# 3. Stage changes
git add src/App.tsx src/App.css landing-page-improvements.md

# 4. Commit with descriptive message
git commit -m "ui: enhance landing page with gallery and remove duplicates

- Add interactive destination gallery with 6 images
- Remove duplicate testimonials and stats sections
- Improve mobile responsive design
- Optimize page structure and user flow"

# 5. Push to remote
git push origin main
```

### Multiple Small Commits:
```bash
# Commit 1: Remove duplicates
git add src/App.tsx
git commit -m "refactor: remove duplicate sections from landing page"

# Commit 2: Add gallery
git add src/App.tsx
git commit -m "feat: add destination gallery section"

# Commit 3: Add styles
git add src/App.css
git commit -m "style: add gallery responsive styles"

# Commit 4: Documentation
git add landing-page-improvements.md
git commit -m "docs: document landing page improvements"

# Push all commits
git push origin main
```

---

## 🚫 Bad vs Good Commit Messages

### ❌ Bad Examples:
```
- "fixed stuff"
- "updates"
- "changes"
- "wip"
- "asdfasdf"
- "final version"
- "final version 2"
```

### ✅ Good Examples:
```
- "feat: add user authentication with JWT tokens"
- "fix: resolve memory leak in trip list component"
- "ui: improve mobile navigation menu"
- "refactor: extract trip service to separate module"
- "perf: optimize database queries for faster load times"
```

---

## 📝 Best Practices

1. **Commit Often**: Small, focused commits are better than large ones
2. **Write Clear Messages**: Future you will thank present you
3. **Use Present Tense**: "add feature" not "added feature"
4. **Be Specific**: Describe WHAT and WHY, not HOW
5. **Test Before Commit**: Ensure code works before committing
6. **Review Changes**: Use `git diff` before staging
7. **Group Related Changes**: One commit = one logical change
8. **Avoid Mixing Types**: Don't mix features and fixes in one commit

---

## 🛠️ Useful Git Commands

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View commit history
git log --oneline --graph --all

# Show what changed in last commit
git show HEAD

# Stage parts of a file
git add -p <file>

# Commit and stage all tracked files
git commit -am "message"

# Create a new branch and switch to it
git checkout -b feature/new-feature

# Switch back to main
git checkout main

# Pull latest changes
git pull origin main

# View remote repositories
git remote -v

# Check differences before staging
git diff

# Check differences after staging
git diff --staged
```

---

## 🎯 Quick Commit Template

```bash
git add .
git commit -m "type: brief description

- What was changed
- Why it was changed
- Impact of the change"
git push
```

---

## 📊 Commit Frequency Guide

**Good Balance:**
- After completing a feature
- After fixing a bug
- After refactoring a module
- Before switching tasks
- At the end of the day (if changes are stable)

**Too Frequent:**
- Every line change
- Every typo fix
- Every save

**Too Infrequent:**
- Once per day with all changes
- Only when "everything is perfect"
- After a week of work

---

## 🔥 Emergency Commands

```bash
# Forgot to add files to last commit
git add forgotten-file.txt
git commit --amend --no-edit

# Wrong commit message
git commit --amend -m "correct message"

# Need to undo everything
git reset --hard HEAD

# Discard changes in specific file
git checkout -- <file>

# Stash changes temporarily
git stash
# Restore stashed changes
git stash pop
```

---

## ✨ For Your Current Landing Page Changes

**Recommended Commit:**
```bash
cd F:\Globe-Trotter
git add globetrotter-ui/src/App.tsx globetrotter-ui/src/App.css landing-page-improvements.md
git commit -m "ui: enhance landing page with gallery and remove duplicates

- Add interactive destination gallery with 6 stunning images
- Remove duplicate testimonials and stats sections
- Improve mobile responsive design for gallery
- Optimize page structure (40% reduction in duplicates)
- Add hover effects and smooth animations
- Document all improvements in markdown file"
git push origin main
```

---

**Happy Committing! 🚀**
