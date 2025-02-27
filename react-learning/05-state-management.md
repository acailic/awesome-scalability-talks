# State Management in React

## Local Component State

For simpler applications, React's built-in state management is sufficient:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**When to use local state:**

- Data is only needed by one component or a small subtree
- State is simple (not deeply nested objects)
- Updates are straightforward

## Lifting State Up

When multiple components need the same state, lift it to their closest common ancestor:

```jsx
function Parent() {
  const [value, setValue] = useState("");

  return (
    <>
      <ChildInput value={value} onChange={setValue} />
      <ChildDisplay value={value} />
    </>
  );
}

function ChildInput({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

function ChildDisplay({ value }) {
  return <p>Current value: {value}</p>;
}
```

This pattern is simple and effective, but can lead to "prop drilling" when passing props through many layers.

## Context API

When state needs to be accessed by many components at different nesting levels, Context provides a way to share values without explicitly passing props:

```jsx
// 1. Create a context
const ThemeContext = React.createContext("light");

// 2. Provide context value
function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MainSection />
    </ThemeContext.Provider>
  );
}

// 3. Consume context anywhere in the tree
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      className={theme}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      Toggle Theme
    </button>
  );
}
```

**Best practices:**

- Don't overuse context - it makes component reusability harder
- Split different concerns into separate contexts
- Keep context values as shallow as possible for performance

## State Management Libraries

For complex applications, external state management libraries can help:

### Redux

Redux provides a predictable state container with a single store:

```jsx
// Action types
const INCREMENT = "INCREMENT";

// Action creator
function increment() {
  return { type: INCREMENT };
}

// Reducer
function counterReducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
}

// In component (using react-redux)
function Counter() {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}
```

**When to use Redux:**

- Complex state with many updates throughout the app
- Need for middleware (async operations, logging)
- Strong desire for predictable state management

### Zustand

A simpler alternative to Redux with a hook-based API:

```jsx
import create from "zustand";

// Create a store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Use the store
function Counter() {
  const { count, increment } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### Jotai

Atom-based state management:

```jsx
import { atom, useAtom } from "jotai";

// Create an atom
const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Server State Management

For data from APIs, specialized tools like React Query and SWR are recommended:

```jsx
// Using React Query
function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery(["user", userId], () =>
    fetchUser(userId)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Name: {data.name}</div>;
}
```

These libraries provide:

- Automatic caching
- Background refetching
- Pagination support
- Mutation handling
- Optimistic updates

## Choosing the Right Approach

Follow these guidelines when selecting a state management approach:

1. **Start with local state** until you have a clear reason to move beyond it
2. **Use Context** for theme, user authentication, or UI state shared across the app
3. **Consider libraries** when state logic becomes complex or you need specialized features
4. **Separate UI state from server state** - they have different requirements

Remember that the simplest solution that meets your needs is usually the best choice.
