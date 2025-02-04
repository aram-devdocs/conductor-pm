# Core UI System

The Core UI system is a collection of reusable UI components built on top of Material-UI (MUI) that provide a consistent and efficient way to build user interfaces in the Conductor PM application.

## Usage of MUI Components

The Core UI system leverages the power and flexibility of MUI components by wrapping them in custom components. This approach allows us to:

- Ensure consistent styling and behavior across the application
- Extend the functionality of MUI components as needed
- Provide a simplified and more focused API for our specific use cases

## Global Theme System

The Core UI system utilizes a global theme system built with Material UI's theming capabilities. The theme is defined in the `src/lib/ui/theme` directory and is applied to the entire application using a custom `ThemeProvider` component.

To customize the theme, modify the `createTheme.ts` file in the `theme` directory. You can change the palette, typography, spacing, and other theme options to match your desired design system.

The custom theme is then passed to the `ThemeProvider` component in `src/app.tsx`, ensuring that all components within the application have access to the theme variables and styles.

## Available Components

The Core UI system organizes components into the following categories:

1. **Inputs**: Components for user input, such as buttons, text fields, checkboxes, and more.
2. **Data Display**: Components for displaying data, including avatars, badges, chips, and tables.
3. **MUI X**: Advanced components from the MUI X library, such as data grid, date pickers, and tree view.
4. **Feedback**: Components for providing feedback to users, like alerts, dialogs, and progress indicators.
5. **Layout**: Components for structuring the application layout, including box, container, and grid.
6. **Navigation**: Components for navigation, such as menus, tabs, and steppers.
7. **Utils**: Utility components and hooks, like CSS baseline, modals, and media query hooks.
8. **Surfaces**: Components for creating surfaces, such as cards, paper, and accordion.

## Using Core UI Components

To use a component from the Core UI system, simply import it from the `src/lib/ui` directory. For example:

```typescript
import { Button } from 'src/lib/ui';
import { DataGrid } from 'src/lib/ui';
```

Each component is designed to be self-contained and easy to use, with a clear and concise API. Refer to the individual component files and their corresponding Storybook stories for more information on how to use each component.

## Customization and Extension

If you need to customize or extend a Core UI component, you can do so by modifying the component file directly or by creating a new component that wraps the existing one. When making changes, be sure to:

- Follow the existing coding style and conventions
- Update the corresponding Storybook story to reflect any changes
- Document any new props or behavior in the component's JSDoc comments

By leveraging the Core UI system and its global theme, developers can create consistent, high-quality user interfaces more efficiently, while also maintaining the flexibility to customize and extend components as needed. 