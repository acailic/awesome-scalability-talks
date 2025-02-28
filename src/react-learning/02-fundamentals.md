# React Fundamentals

## Components

Components are the building blocks of any React application. Think of them as custom, reusable HTML elements.

There are two types:

### Function Components (Preferred)

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Class Components

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Modern React prefers function components with hooks over class components. Think of function components as simpler, more concise, and easier to test.

## JSX

JSX is a syntax extension that looks like HTML but is actually JavaScript. It lets you describe what your UI should look like:

```jsx
const element = <h1>Hello, world!</h1>;
```

Behind the scenes, this gets transformed into:

```javascript
const element = React.createElement("h1", null, "Hello, world!");
```

JSX is optional, but it makes React code much more readable and intuitive. Remember these key points:

- JSX tags can contain children: `<div><p>Hello</p></div>`
- Always close tags: `<img src="..." />` or `<div></div>`
- You can embed JavaScript expressions inside JSX using curly braces: `{expression}`
- JSX is safe from injection attacks because React escapes values before rendering

## Props

Props (short for "properties") are how you pass data from parent components to child components:

```jsx
// Parent component
function App() {
  return <Welcome name="Sara" />;
}

// Child component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Key prop concepts:

- Props are read-only - never modify them in the receiving component
- Props can be any JavaScript value: strings, numbers, objects, functions, even other React components
- Props flow downward (one-way data flow)

## State

While props come from the outside, state is data managed within a component:

```jsx
function Counter() {
  // useState returns [current state, function to update it]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

State is:

- Local and private to the component
- Can be passed to children as props
- Should be considered immutable (never modify directly)
- Should contain the minimal amount of data needed

Remember: When state changes, React re-renders the component.

## Event Handling

In React, you handle events using camelCase and pass functions as event handlers:

```jsx
function Button() {
  function handleClick() {
    console.log("Button was clicked");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

Unlike HTML, you can't return `false` to prevent default behavior. You must call `preventDefault` explicitly:

```jsx
function Form() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted");
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Conditional Rendering

In React, you can conditionally render elements by using JavaScript operators:

```jsx
function Greeting({ isLoggedIn }) {
  return isLoggedIn ? <UserGreeting /> : <GuestGreeting />;
}
```

Or using logical && operator when you only need to render something or nothing:

```jsx
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}
```

This works because in JavaScript, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false` (and is skipped by React).
