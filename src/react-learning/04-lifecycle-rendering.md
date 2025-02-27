# Component Lifecycle and Rendering

## Component Lifecycle

While class components have explicit lifecycle methods, function components with hooks follow a simpler mental model. Let's understand how they map:

### Mounting Phase

**Class Component:**

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}
```

**Function Component:**

```jsx
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, []); // Empty dependency array = run once on mount

  return <div>{count}</div>;
}
```

### Updating Phase

**Class Component:**

```jsx
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `Count: ${this.state.count}`;
  }
}
```

**Function Component:**

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // Only run when count changes
```

### Unmounting Phase

**Class Component:**

```jsx
componentWillUnmount() {
  document.title = 'React App';
}
```

**Function Component:**

```jsx
useEffect(() => {
  return () => {
    document.title = "React App";
  };
}, []);
```

The beauty of hooks is that related code stays together, not split across different lifecycle methods.

## Render Process

React's rendering process is fascinating and important to understand:

1. **Trigger**: A render can be triggered by:

   - Initial mount
   - State changes
   - Props changes
   - Parent component re-renders
   - Context changes

2. **Render Phase**:

   - React calls your component function
   - Computes what has changed in the virtual DOM
   - This phase is "pure" with no side effects

3. **Commit Phase**:
   - React applies changes to the actual DOM
   - Runs layout effects
   - Runs effects (useEffect callbacks)

## Key Rendering Concepts

### Render Doesn't Always Mean DOM Update

When React renders a component:

- It calls your component function
- But it might not update the DOM if nothing has changed

This distinction is important - renders are cheap, DOM updates are expensive.

### Batching

React batches multiple state updates for performance:

```jsx
function handleClick() {
  setCount((c) => c + 1); // These don't each cause
  setFlag((f) => !f); // a separate render
  setText("updated"); // React batches them together
}
```

This is why you can't rely on reading state immediately after setting it.

### Render Optimization

To prevent unnecessary re-renders:

1. **React.memo** - Skip re-rendering when props haven't changed:

```jsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

2. **useMemo** - Memoize expensive calculations:

```jsx
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

3. **useCallback** - Prevent recreation of function objects:

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## React's Render Rules

Some important rules to remember:

1. **Components must be pure** when rendering:

   - Same inputs (props, state) → same output (JSX)
   - No side effects during render

2. **State updates must be immutable**:

   ```jsx
   // Wrong
   const newItems = items;
   newItems.push(newItem);
   setItems(newItems);

   // Right
   setItems([...items, newItem]);
   ```

3. **Keys must be stable, unique, and predictable**:

   ```jsx
   // Bad (uses index as key)
   {
     items.map((item, index) => <Item key={index} {...item} />);
   }

   // Good (uses stable ID)
   {
     items.map((item) => <Item key={item.id} {...item} />);
   }
   ```

Understanding these concepts will help you build efficient React applications that avoid common pitfalls and performance issues.
