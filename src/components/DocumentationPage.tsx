import React, { useState } from 'react';
import '../styles/DocumentationPage.css';

type DocSection = {
  id: string;
  title: string;
  content: JSX.Element;
};

const DocumentationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections: DocSection[] = [
    {
      id: 'intro',
      title: 'Introduction',
      content: (
        <div>
          <h2>Welcome to React & TypeScript Learning</h2>
          <p>
            This documentation serves as a reference guide for React and TypeScript concepts
            used in this project. Whether you're learning React for the first time or preparing
            for interviews, this resource will help you understand key concepts with practical examples.
          </p>
          <p>
            Navigate through the sections to explore different topics from basic to advanced React
            and TypeScript patterns.
          </p>
        </div>
      )
    },
    {
      id: 'components',
      title: 'Components & Props',
      content: (
        <div>
          <h2>React Components</h2>
          <p>
            Components are the building blocks of React applications. They encapsulate UI and behavior
            into reusable pieces. In this project, we use functional components with TypeScript.
          </p>

          <h3>Function Component Example</h3>
          <pre>
            <code>
{`import React from 'react';

// TypeScript interface for props
interface UserCardProps {
  name: string;
  email?: string; // Optional prop
  role: 'admin' | 'user' | 'guest'; // Union type
  onProfileClick: (userId: string) => void;
}

// Function component with typed props
const UserCard: React.FC<UserCardProps> = ({
  name,
  email = 'n/a', // Default value for optional prop
  role,
  onProfileClick
}) => {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
      <button onClick={() => onProfileClick(name)}>
        View Profile
      </button>
    </div>
  );
};

export default UserCard;`}
            </code>
          </pre>

          <h3>Key Concepts</h3>
          <ul>
            <li><strong>Props</strong>: Data passed to components</li>
            <li><strong>TypeScript interfaces</strong>: Define the shape of props</li>
            <li><strong>Optional props</strong>: Use the <code>?</code> symbol</li>
            <li><strong>Default values</strong>: Provide fallbacks for missing props</li>
            <li><strong>Event handlers</strong>: Pass functions as props</li>
          </ul>
        </div>
      )
    },
    {
      id: 'hooks',
      title: 'React Hooks',
      content: (
        <div>
          <h2>React Hooks</h2>
          <p>
            Hooks let you use state and other React features without writing classes.
            TypeScript provides type safety for hooks.
          </p>

          <h3>useState Example</h3>
          <pre>
            <code>
{`import React, { useState } from 'react';

// With type inference
const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// With explicit typing
interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const UserDisplay: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = () => {
    // Simulate API call
    setUser({
      id: 1,
      name: "Jane Doe",
      isActive: true
    });
  };

  return (
    <div>
      {user ? (
        <div>
          <h3>{user.name}</h3>
          <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
        </div>
      ) : (
        <button onClick={loadUser}>Load User</button>
      )}
    </div>
  );
};`}
            </code>
          </pre>

          <h3>useEffect Example</h3>
          <pre>
            <code>
{`import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Simulate API call
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();

    // Cleanup function
    return () => {
      console.log('Component unmounted');
    };
  }, []); // Empty dependency array = run once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};`}
            </code>
          </pre>

          <h3>Custom Hook Example</h3>
          <pre>
            <code>
{`import { useState, useEffect } from 'react';

// Generic custom hook with TypeScript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T) => {
    try {
      // Allow value to be a function
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}`}
            </code>
          </pre>
        </div>
      )
    },
    {
      id: 'context',
      title: 'Context API',
      content: (
        <div>
          <h2>Context API with TypeScript</h2>
          <p>
            Context provides a way to pass data through the component tree without having to
            pass props down manually at every level.
          </p>

          <h3>Creating a Theme Context</h3>
          <pre>
            <code>
{`// ThemeContext.tsx
import React, { createContext, useState, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the theme context to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
`}
            </code>
          </pre>

          <h3>Using the Theme Context</h3>
          <pre>
            <code>
{`// App.tsx
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemedButton from './ThemedButton';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <h1>Theme Context Example</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
};

// ThemedButton.tsx
import React from 'react';
import { useTheme } from './ThemeContext';

const ThemedButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '8px 16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    >
      Current theme: {theme}. Click to toggle!
    </button>
  );
};

export default ThemedButton;`}
            </code>
          </pre>
        </div>
      )
    },
    {
      id: 'routing',
      title: 'React Router',
      content: (
        <div>
          <h2>React Router with TypeScript</h2>
          <p>
            React Router enables navigation between views in a React application,
            allowing for a single-page application experience.
          </p>

          <h3>Basic Setup</h3>
          <pre>
            <code>
{`// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import UserProfile from './UserProfile';
import NotFound from './NotFound';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/user/1">User Profile</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};`}
            </code>
          </pre>

          <h3>Route Parameters</h3>
          <pre>
            <code>
{`// UserProfile.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface UserProfileParams {
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<keyof UserProfileParams>() as UserProfileParams;
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchUser = async () => {
      try {
        // In a real app, fetch from API
        // const response = await fetch(\`/api/users/\${userId}\`);
        // const data = await response.json();

        // Simulated data
        const mockUser = {
          id: userId,
          name: \`User \${userId}\`,
          email: \`user\${userId}@example.com\`
        };

        setUser(mockUser);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <button onClick={() => navigate('/')}>Go Home</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default UserProfile;`}
            </code>
          </pre>
        </div>
      )
    },
    {
      id: 'interview',
      title: 'Interview Questions',
      content: (
        <div>
          <h2>React & TypeScript Interview Questions</h2>

          <div className="question">
            <h3>Q1: What are the differences between functional and class components in React?</h3>
            <div className="answer">
              <p><strong>Answer:</strong></p>
              <ul>
                <li><strong
