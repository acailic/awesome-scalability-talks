# React Hooks

## What Are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 as a way to use stateful logic without writing a class.

Hooks solve several problems in React:

- Reusing stateful logic between components was difficult
- Complex components became hard to understand
- Classes confuse both people and machines (this binding, boilerplate code)

## Core Hooks

### useState

The useState hook lets you add state to function components:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  // useState returns [current state, function to update state]

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Key things to understand:

- The argument to useState is the initial state
- setState does not merge objects like this.setState in class components
- You can use multiple useState calls for different pieces of state

### useEffect

useEffect lets you perform side effects in function components:

```jsx
import { useState, useEffect } from "react";

function DocumentTitleUpdater() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This runs after every render
    document.title = `You clicked ${count} times`;

    // Optional cleanup function
    return () => {
      document.title = "React App";
    };
  }, [count]); // Only re-run if count changes

  return <button onClick={() => setCount(count + 1)}>Click me</button>;
}
```

Think of useEffect as combining componentDidMount, componentDidUpdate, and componentWillUnmount from class components.

The dependency array is crucial:

- Empty array `[]`: Run once after initial render (like componentDidMount)
- No array: Run after every render
- Array with values `[a, b]`: Run when any dependency changes

### useContext

useContext provides a way to share data that can be considered "global" for a tree of React components:

```jsx
// Create a context
const ThemeContext = React.createContext("light");

// Provider in parent
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

// Consumer in child using hook
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}
```

This is much cleaner than the Context.Consumer approach.

### useReducer

For more complex state logic, useReducer is often preferable to useState:

```jsx
import { useReducer } from "react";

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

This is similar to how Redux works, but built into React.

## Additional Hooks

### useRef

useRef returns a mutable ref object whose `.current` property is initialized to the passed argument:

```jsx
function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

Unlike state, changing a ref doesn't trigger a re-render. Refs are perfect for:

- Accessing DOM elements
- Keeping mutable values that don't affect rendering

### useMemo and useCallback

These hooks help with performance optimization:

```jsx
// useMemo - Memoizes a computed value
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback - Memoizes a function
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- useMemo prevents expensive calculations on every render
- useCallback prevents unnecessary re-rendering of child components that rely on callback stability

## Custom Hooks

You can create your own hooks to extract component logic into reusable functions:

```jsx
// Custom hook
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

// Using the custom hook
function MyComponent() {
  const width = useWindowWidth();
  return <div>Window width: {width}</div>;
}
```

Custom hooks should start with "use" and can call other hooks. They're the primary way to share stateful logic between components.
