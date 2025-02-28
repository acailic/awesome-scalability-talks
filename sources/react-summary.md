# React Best Practices Summary

- **Extract Hardcoded Values**
  Place constants (numbers, strings) in a separate file or at the top of your component to avoid “magic numbers” and to centralize changes.

- **Organize Folder Structure**
  Keep a consistent, logical folder structure (e.g., components, contexts/stores, helpers/utilities) to make the codebase easier to navigate.

- **Use Proper Component Splitting**
  Break down large components into smaller ones for readability, reusability, and maintainability.

- **Extract Reusable Logic into Hooks**
  Move shared or repetitive stateful logic into custom hooks.

- **Use TypeScript**
  Benefit from static typing to catch errors early and enforce consistent data shapes.

- **Manage State Wisely**
  Use React’s Context API or a dedicated state management library (e.g., Redux) for complex, shared state.

- **Centralize Config and Initial Data**
  Place initial states or config objects in a dedicated file to keep components clean and avoid unwanted re-renders.

- **Ensure Consistency**
  Consistent naming, styling, and folder structures help new team members understand the project quickly.
