# CSS Structure Documentation

The CSS for this project has been split into modular files for better organization and maintainability.

## File Structure

### 1. `base.css`
**Purpose**: Core styles, CSS variables, and fundamental page elements
- CSS custom properties (variables)
- HTML and body base styles
- Graph canvas background
- Main style container
- Link default colors

### 2. `sidebar.css`
**Purpose**: Sidebar and menu navigation styles
- Menu container
- Sidebar background and positioning
- Repository tabs separator
- Repository tabs container

### 3. `buttons.css`
**Purpose**: All button styles and interactions
- Primary button styles (.button)
- Button hover effects
- Repository-specific buttons (.repo-button)
- Button transitions and animations

### 4. `layout.css`
**Purpose**: Main layout and content area
- Flexbox layout (.flex)
- Content area container
- Info text styling
- General positioning

### 5. `tabs.css`
**Purpose**: Tab content visibility and transitions
- Tab visibility states (.hidden, .showed)
- Tab content containers
- Tab heading styles

### 6. `repositories.css`
**Purpose**: Repository cards and detailed views
- Repository grid container
- Repository card styles
- Card hover effects
- Repository metadata (name, description, size, etc.)
- Repository detail sections
- Statistics grids
- Language detail bars

### 7. `languages.css`
**Purpose**: Programming language statistics
- Language container
- Language summary section
- Language bars and items
- Language percentages
- Bar animations and gradients

### 8. `readme.css`
**Purpose**: README content rendering
- README container styles
- GitHub markdown overrides
- Code block styling
- Table styling
- Image and horizontal rule styles
- Fallback plain text styling

### 9. `responsive.css`
**Purpose**: Mobile and responsive design
- Tablet breakpoint (max-width: 768px)
- Mobile breakpoint (max-width: 480px)
- Responsive adjustments for all components
- Mobile menu layouts
- Flexible grid adjustments

## Load Order

The CSS files are loaded in the following order in `index.html`:

1. `base.css` - Foundation styles and variables
2. `sidebar.css` - Navigation structure
3. `buttons.css` - Interactive elements
4. `layout.css` - Page layout
5. `tabs.css` - Tab system
6. `repositories.css` - Repository content
7. `languages.css` - Language statistics
8. `readme.css` - README rendering
9. `responsive.css` - Media queries (last to override when needed)

## Benefits of This Structure

- **Maintainability**: Easy to find and modify specific styles
- **Scalability**: Simple to add new features without cluttering
- **Debugging**: Faster to locate styling issues
- **Collaboration**: Multiple developers can work on different files
- **Performance**: Browser can cache individual files
- **Organization**: Logical separation of concerns

## Editing Guidelines

When making changes:
1. Identify which file contains the relevant styles
2. Make changes only to that specific file
3. Test responsive behavior if modifying layout
4. Ensure changes don't conflict with other modules
