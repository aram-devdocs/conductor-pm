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

## Core UI Component Dictionary  (Last updated Febuary 4, 2025)

### Inputs
- `Autocomplete.tsx`: Combo box component that allows users to select a value from a list of suggestions.
- `Button.tsx`: Clickable button component with various styles and variants.
- `ButtonGroup.tsx`: Groups related buttons together on a single line.
- `Checkbox.tsx`: Allows users to select one or more options from a set.
- `FloatingActionButton.tsx`: Circular button that floats above content to promote a primary action.
- `RadioGroup.tsx`: Allows users to select one option from a set.
- `Rating.tsx`: Allows users to rate something by selecting stars or other icons.
- `Select.tsx`: Allows users to select a value from a list of options in a dropdown menu.
- `Slider.tsx`: Allows users to select a value from a range by dragging a thumb along a track.
- `Switch.tsx`: Allows users to toggle between on/off states.
- `TextField.tsx`: Allows users to enter and edit text.
- `ToggleButton.tsx`: Buttons that can be toggled on or off, often used in groups.
- `TransferList.tsx`: Displays a list of items that can be moved between two columns.

### Data Display  
- `Avatar.tsx`: Represents a user or entity with an icon, image, or initials.
- `Badge.tsx`: Displays a small badge on another component, often used to show status or notifications.
- `Chip.tsx`: Compact elements that represent an input, attribute, or action.
- `Divider.tsx`: Thin line used to separate content into clear groups.
- `Icons.tsx`: Reusable icon components using the Material Icons font.
- `List.tsx`: Continuous, vertical index of text or images, often used for navigation.
- `MaterialIcons.tsx`: Additional Material Icons components beyond the base set.
- `Table.tsx`: Displays data in rows and columns.
- `Tooltip.tsx`: Informative text that appears when a user hovers over, focuses on, or touches an element.
- `Typography.tsx`: Standardized typographic components and styles.

### MUI X
- `DataGrid.tsx`: Powerful data table component with sorting, filtering, grouping, and more.
- `DatePickers.tsx`: Date and time picker components.

### Feedback
- `Alert.tsx`: Displays a short, important message in a way that attracts the user's attention.
- `Backdrop.tsx`: Adds a dimmed layer over the app to emphasize a modal or loading state.
- `Dialog.tsx`: Informs users about a task and can contain critical information or require decisions.
- `Progress.tsx`: Indicators that express an unspecified wait time or display the length of a process.
- `Skeleton.tsx`: Provides a placeholder preview of content before the data gets loaded.
- `Snackbar.tsx`: Informs users of a process that an app has performed or will perform.

### Layout
- `Box.tsx`: Serves as a wrapper component for most of the CSS utility needs.
- `Container.tsx`: Centers content horizontally, with padding on the left and right.
- `Grid.tsx`: Responsive layout grid that adapts to screen size and orientation.
- `ImageList.tsx`: Displays a collection of images in an organized grid.
- `Stack.tsx`: Manages layout of immediate children along the vertical or horizontal axis.

### Navigation  
- `BottomNavigation.tsx`: Allows movement between primary destinations in an app.
- `Breadcrumbs.tsx`: Allows users to make selections from a range of values.
- `Drawer.tsx`: Sidebar that provides access to destinations and app functionality.
- `Link.tsx`: Allows users to navigate to another page or trigger an action.
- `Menu.tsx`: Temporarily displays a list of choices on a transient sheet of material.
- `Pagination.tsx`: Enables user to select a specific page from a range of pages.
- `SpeedDial.tsx`: Floating action button that expands into a menu of related actions.
- `Stepper.tsx`: Displays progress through a sequence of numbered steps.
- `Tabs.tsx`: Organize and allow navigation between groups of content.

### Surfaces
- `Accordion.tsx`: Contain creation flows and allow lightweight editing of an element.
- `AppBar.tsx`: Display information and actions relating to the current screen.
- `Card.tsx`: Contain content and actions about a single subject.
- `Paper.tsx`: Container with a drop shadow.

### Utils
- `CSSBaseline.tsx`: Provides a consistent baseline to build upon.
- `Modal.tsx`: Provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.
- `Popover.tsx`: Displays transient UI elements that appear above other content on click or hover.
- `Popper.tsx`: Positions an element relative to a reference element.
- `Transitions.tsx`: Helps make a UI expressive and easy to use with built-in transitions.
- `useMediaQuery.tsx`: CSS media query hook for React. 