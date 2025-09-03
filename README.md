# Fintrak

This project uses [Vite](https://vitejs.dev/) and React.

## Testing

Vitest is configured for unit testing.

After installing dependencies, run:

```bash
npm test
```

## Styling guidelines

The `Sidebar` and `Progress` components rely on CSS variables defined in
`src/styles/sidebar.css` and in component classes. To customize widths or
progress animations, override these variables in your own stylesheet or extend
Tailwind's theme. For example, modify `--sidebar-width` to change sidebar size
or `--progress-translate` to tweak progress indicator movement. Keeping these
values in CSS discourages inline styles and makes theming easier.

