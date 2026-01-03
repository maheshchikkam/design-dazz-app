# Migration Checklist & Best Practices

## ✅ Team Migration Guide

Use this checklist when updating code to follow the new refactored patterns.

---

## 🔄 Migration Checklist

### For New Components

- [ ] Import constants instead of hardcoding values
  ```javascript
  // ❌ Before
  const routes = ['/', '/portfolio', '/about'];
  
  // ✅ After
  import { ROUTES } from '../constants';
  const routes = Object.values(ROUTES);
  ```

- [ ] Use reusable UI components
  ```javascript
  // ❌ Before
  <button className="bg-primary text-white px-4 py-2 rounded">Click</button>
  
  // ✅ After
  import Button from '../components/common/Button';
  <Button variant="primary">Click</Button>
  ```

- [ ] Use utility functions for common tasks
  ```javascript
  // ❌ Before
  const badgeClass = category === 'residential' ? 'bg-primary text-white' : 'bg-brown text-white';
  
  // ✅ After
  import { getCategoryBadgeClass } from '../utils/classNameUtils';
  const badgeClass = getCategoryBadgeClass(category);
  ```

- [ ] Handle errors with error utilities
  ```javascript
  // ❌ Before
  catch (err) {
    setError(err.message || 'Something went wrong');
  }
  
  // ✅ After
  import { getErrorMessage, logError } from '../utils/errorUtils';
  catch (err) {
    const message = getErrorMessage(err);
    logError(err, 'ComponentName');
    setError(message);
  }
  ```

### For API Calls

- [ ] Use fetchWithRetry instead of fetch
  ```javascript
  // ❌ Before
  const response = await fetch(API_URL);
  
  // ✅ After
  import { fetchWithRetry } from '../utils/apiClient';
  const data = await fetchWithRetry(API_URL);
  ```

- [ ] Normalize data after fetching
  ```javascript
  // ❌ Before
  const items = Array.isArray(data) ? data : data.projects || [];
  
  // ✅ After
  import { normalizePortfolioData } from '../utils/apiClient';
  const items = normalizePortfolioData(data);
  ```

- [ ] Use caching utilities
  ```javascript
  // ❌ Before
  // No caching logic
  
  // ✅ After
  import { getCachedPortfolio, setPortfolioCache } from '../utils/cacheUtils';
  const cached = getCachedPortfolio();
  if (cached) return cached;
  // ... fetch
  setPortfolioCache(data);
  ```

### For Navigation

- [ ] Use route constants
  ```javascript
  // ❌ Before
  <NavLink to="/portfolio" />
  
  // ✅ After
  import { ROUTES } from '../constants';
  <NavLink to={ROUTES.PORTFOLIO} />
  ```

- [ ] Configuration-driven lists
  ```javascript
  // ❌ Before
  const items = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
  ];
  
  // ✅ After
  const NAV_ITEMS = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Portfolio', path: ROUTES.PORTFOLIO },
  ];
  items.map(item => <NavLink key={item.path} to={item.path}>{item.label}</NavLink>)
  ```

### For Loading States

- [ ] Use LoadingSpinner component
  ```javascript
  // ❌ Before
  {loading && <div>Loading...</div>}
  
  // ✅ After
  import LoadingSpinner from '../components/common/LoadingSpinner';
  {loading && <LoadingSpinner message="Loading..." fullScreen={false} />}
  ```

- [ ] Use SkeletonLoader for placeholders
  ```javascript
  // ❌ Before
  {loading && (
    <div className="grid...">
      {[...Array(6)].map((_, i) => <div key={i} className="animate-pulse..." />)}
    </div>
  )}
  
  // ✅ After
  import SkeletonLoader from '../components/common/SkeletonLoader';
  {loading && <SkeletonLoader count={6} columns={3} />}
  ```

### For Error States

- [ ] Use ErrorMessage component
  ```javascript
  // ❌ Before
  {error && (
    <div className="bg-red-100...">
      <p>{error}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  )}
  
  // ✅ After
  import ErrorMessage from '../components/common/ErrorMessage';
  {error && <ErrorMessage message={error} onRetry={onRetry} />}
  ```

---

## 🏗️ Code Organization Guidelines

### File Structure for New Features

```
src/
├── features/
│   └── [feature-name]/
│       ├── [Feature].jsx          # Main component
│       ├── [Feature].module.css   # Scoped styles
│       ├── useFeature.js          # Custom hook
│       ├── [Feature]Context.jsx   # Feature context (if needed)
│       └── constants.js           # Feature-specific constants
```

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase | `PortfolioCard.jsx` |
| Hooks | camelCase with 'use' prefix | `usePortfolio.js` |
| Utilities | camelCase | `apiClient.js` |
| Constants | UPPER_CASE | `ROUTES`, `API_CONFIG` |
| Contexts | PascalCase with 'Context' suffix | `PortfolioContext.jsx` |

---

## 📋 Component Creation Checklist

When creating a new component:

### Planning
- [ ] Define component responsibilities
- [ ] Identify reusable sub-components
- [ ] Plan prop interface
- [ ] Check if similar component exists

### Implementation
- [ ] Add JSDoc comment at top
- [ ] Define prop types in comments
- [ ] Extract magic strings to constants
- [ ] Use reusable components
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Add accessibility attributes

### Example Template
```javascript
/**
 * MyComponent
 * @param {string} title - Component title
 * @param {Function} onAction - Callback when action is triggered
 * @returns {JSX.Element}
 */
const MyComponent = ({ title, onAction = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ErrorMessage message={error} onRetry={...} />;

  return (
    <div className="...">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

---

## 🧪 Testing Checklist

When modifying components:

- [ ] Component renders without errors
- [ ] Loading state displays correctly
- [ ] Error state displays correctly
- [ ] Success state displays data correctly
- [ ] Callbacks are triggered
- [ ] Navigation works
- [ ] Responsive design tested
- [ ] Accessibility tested

### Testing with Different States

```bash
# Test loading state
# Check SkeletonLoader displays

# Test error state
# Check ErrorMessage displays with retry button

# Test success state
# Check data displays correctly

# Test empty state
# Check appropriate message shows
```

---

## 🚀 Performance Optimization Checklist

When refactoring existing code:

- [ ] Remove unnecessary renders with `useMemo`
- [ ] Memoize callbacks with `useCallback`
- [ ] Use lazy loading for images
- [ ] Implement proper code splitting
- [ ] Remove console.log in production
- [ ] Optimize bundle size
- [ ] Use performance utilities for monitoring

### Code Review Questions

- Is this function doing one thing? (Single Responsibility)
- Can this be reused elsewhere? (DRY)
- Are there magic strings? (Use constants)
- Is error handling proper? (Try-catch/Error Boundary)
- Are performance optimizations needed? (useMemo, useCallback)
- Is accessibility considered? (aria-labels, semantic HTML)

---

## 📚 Common Patterns

### Pattern 1: Data Fetching with Loading & Error
```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchWithRetry(API_URL);
      setData(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  fetch();
}, []);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} onRetry={...} />;
return <div>{/* render data */}</div>;
```

### Pattern 2: Configuration-Driven Lists
```javascript
const ITEMS = [
  { id: 'item1', label: 'Item 1', value: 'value1' },
  { id: 'item2', label: 'Item 2', value: 'value2' },
];

return (
  <div>
    {ITEMS.map(item => (
      <Component key={item.id} {...item} />
    ))}
  </div>
);
```

### Pattern 3: Reusable Form Component
```javascript
const FormField = ({ label, error, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <input {...props} />
    {error && <ErrorMessage message={error} />}
  </div>
);
```

---

## ⚠️ Common Mistakes to Avoid

| ❌ Don't | ✅ Do |
|----------|-------|
| Hardcode API URLs | Use `API_CONFIG.PORTFOLIO_URL` |
| Repeat button styles | Use `<Button />` component |
| String comparison for categories | Use `PROJECT_CATEGORIES` constants |
| Custom loading spinners | Use `<LoadingSpinner />` |
| Inline error handling | Use `getErrorMessage()` utility |
| Magic numbers/strings | Define as constants |
| Large monolithic components | Split into sub-components |
| Missing error boundaries | Wrap with `<ErrorBoundary />` |
| No loading/error states | Always handle all states |
| Hardcoded routes | Use `ROUTES` constants |

---

## 🔗 Quick Reference

### Import Statements

```javascript
// Constants
import { ROUTES, PROJECT_CATEGORIES, API_CONFIG, CATEGORY_LABELS } from '../constants';

// Utilities
import { fetchWithRetry, normalizePortfolioData } from '../utils/apiClient';
import { getErrorMessage, logError } from '../utils/errorUtils';
import { getCategoryBadgeClass, getNavLinkClass, cn } from '../utils/classNameUtils';
import { getCachedPortfolio, setPortfolioCache } from '../utils/cacheUtils';

// Components
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SkeletonLoader from '../components/common/SkeletonLoader';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Hooks
import { usePortfolio } from '../hooks/usePortfolio';
```

---

## 📞 Getting Help

If you're unsure about something:

1. **Check existing implementations** - Look at Portfolio.jsx, Header.jsx
2. **Read the REFACTORING.md** - Comprehensive guide with examples
3. **Check JSDoc comments** - All functions are documented
4. **Follow patterns** - Use configuration-driven approaches
5. **Ask in code reviews** - Get feedback from team

---

## ✨ Benefits of Following These Patterns

- 🎯 **Consistency** - Uniform code style across the project
- 🚀 **Performance** - Optimized rendering and loading
- 🛡️ **Reliability** - Proper error handling and recovery
- 📈 **Scalability** - Easy to add new features
- 🧪 **Testability** - Pure functions are easier to test
- 📚 **Maintainability** - Clear structure and documentation
- 👥 **Team Collaboration** - Everyone follows same patterns

---

**Happy Coding! 🎉**

Remember: Clean code is code that's easy for others (and future you) to understand and maintain.
