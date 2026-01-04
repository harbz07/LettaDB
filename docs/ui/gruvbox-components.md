# Gruvbox UI Components for Letta Database

A complete, production-ready React component library with the warm, retro **Gruvbox** color palette. Perfect for building database management interfaces, AI agent dashboards, and modern web applications.

## 🎨 Features

- **Complete Gruvbox Theme** - Authentic retro color palette with warm, earthy tones
- **TypeScript First** - Fully typed components with excellent IntelliSense support
- **React 18+ Ready** - Built with modern React patterns and hooks
- **Accessible** - Keyboard navigation, focus states, and ARIA attributes
- **Customizable** - All components accept custom className and style props
- **Letta-Specific Components** - Purpose-built components for agent management

## 📦 Components Included

### Core Components
- **Button** - Multiple variants (primary, secondary, success, danger, warning, ghost)
- **Input** - Text input with label, error states, and icon support
- **Textarea** - Multi-line text input with auto-resize
- **Card** - Flexible container with title, subtitle, and actions
- **Badge** - Status indicators and labels
- **Modal** - Accessible dialog with backdrop
- **Tabs** - Tabbed interface with icon support
- **Table** - Data table with custom renderers and row clicks
- **Alert** - Notifications and messages (info, success, warning, danger)
- **Spinner** - Loading indicators in multiple sizes

### Letta-Specific Components
- **AgentCard** - Display agent information with status indicators
- **MemoryBlock** - Edit and manage agent memory blocks
- **ChatMessage** - Render chat messages from users, assistants, and tools

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install react react-dom

# Copy component files to your project
cp gruvbox-components.tsx src/components/
```

### Basic Usage

```tsx
import React from 'react';
import { Button, Card, Input, gruvboxColors } from './gruvbox-components';

function App() {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ backgroundColor: gruvboxColors.bg0, minHeight: '100vh', padding: '2rem' }}>
      <Card title="Welcome to Gruvbox" subtitle="A retro-inspired UI">
        <Input
          label="Enter your name"
          value={value}
          onChange={setValue}
          placeholder="John Doe"
          fullWidth
        />
        <Button variant="primary" onClick={() => alert(`Hello, ${value}!`)}>
          Submit
        </Button>
      </Card>
    </div>
  );
}
```

## 🎯 Component Examples

### Button Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="ghost">Ghost</Button>
```

### Agent Card (Letta-Specific)

```tsx
<AgentCard
  name="Database Architect"
  id="agent-abc123"
  model="openai/gpt-4.1"
  status="active"
  lastActive="2 min ago"
  memoryBlocks={4}
  onClick={() => console.log('Agent clicked')}
  onDelete={() => console.log('Delete agent')}
/>
```

### Memory Block Management

```tsx
<MemoryBlock
  label="project_context"
  value="Working on PostgreSQL schema for AI conversations"
  description="Stores current project context"
  onEdit={(newValue) => console.log('Updated:', newValue)}
  onDelete={() => console.log('Deleted')}
/>
```

### Chat Interface

```tsx
<ChatMessage
  role="user"
  content="Help me design a database schema"
  timestamp="10:00 AM"
/>
<ChatMessage
  role="assistant"
  content="I can help you with that! Let's start with..."
  timestamp="10:01 AM"
/>
<ChatMessage
  role="tool"
  content="Searching for best practices..."
  timestamp="10:01 AM"
  toolName="web_search"
/>
```

### Data Tables

```tsx
<Table
  data={[
    { id: 1, name: 'conversations', rows: 1234, size: '2.4 MB' },
    { id: 2, name: 'messages', rows: 15678, size: '12.8 MB' },
  ]}
  columns={[
    { key: 'name', header: 'Table Name' },
    { key: 'rows', header: 'Rows' },
    { key: 'size', header: 'Size' },
  ]}
  onRowClick={(item) => console.log('Clicked:', item.name)}
/>
```

### Modal Dialogs

```tsx
const [isOpen, setIsOpen] = React.useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Create Agent"
  size="md"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleCreate}>
        Create
      </Button>
    </>
  }
>
  <Input label="Agent Name" value={name} onChange={setName} fullWidth />
</Modal>
```

## 🎨 Color Palette

```tsx
import { gruvboxColors } from './gruvbox-components';

// Dark backgrounds
gruvboxColors.bg0_hard  // #1d2021
gruvboxColors.bg0       // #282828
gruvboxColors.bg1       // #3c3836
gruvboxColors.bg2       // #504945
gruvboxColors.bg3       // #665c54

// Light foregrounds
gruvboxColors.fg0       // #fbf1c7
gruvboxColors.fg1       // #ebdbb2
gruvboxColors.fg2       // #d5c4a1

// Accent colors
gruvboxColors.red       // #fb4934
gruvboxColors.green     // #b8bb26
gruvboxColors.yellow    // #fabd2f
gruvboxColors.blue      // #83a598
gruvboxColors.purple    // #d3869b
gruvboxColors.aqua      // #8ec07c
gruvboxColors.orange    // #fe8019
```

## 🛠️ Customization

All components accept `className` and can be styled with CSS:

```tsx
<Button
  className="my-custom-class"
  style={{ borderRadius: '20px' }}
>
  Custom Button
</Button>
```

## 📱 Responsive Design

Components are mobile-friendly by default. Use Tailwind utility classes for responsive layouts:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <AgentCard {...agent1} />
  <AgentCard {...agent2} />
  <AgentCard {...agent3} />
</div>
```

## 🔧 Setup with Tailwind CSS (Optional)

While components use inline styles by default, you can enhance them with Tailwind:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'gruvbox-bg': '#282828',
        'gruvbox-fg': '#ebdbb2',
        // Add more as needed
      },
    },
  },
}
```

## 💡 Tips

1. **Start with the root element**: Wrap your app in a div with `gruvbox-root` class
2. **Use JetBrains Mono**: The components look best with the JetBrains Mono font (loaded automatically)
3. **Combine components**: Build complex UIs by composing simple components
4. **Check the examples**: See `gruvbox-example-app.tsx` for complete working examples

## 📚 Example Applications

The `gruvbox-example-app.tsx` file includes complete examples:

- **AgentDashboard** - Grid of agent cards with actions
- **MemoryManager** - Memory block CRUD interface
- **ChatInterface** - Real-time chat UI
- **DatabaseTable** - Sortable data table
- **TabbedInterface** - Complete app with navigation

## 🤝 Integration with Letta

These components are designed to work seamlessly with the Letta SDK:

```tsx
import Letta from "@letta-ai/letta-client";
import { AgentCard, Button } from './gruvbox-components';

const client = new Letta({ apiKey: process.env.LETTA_API_KEY });

function AgentList() {
  const [agents, setAgents] = React.useState([]);

  React.useEffect(() => {
    client.agents.list().then(setAgents);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {agents.map(agent => (
        <AgentCard
          key={agent.id}
          name={agent.name}
          id={agent.id}
          model={agent.model}
          status="active"
          memoryBlocks={agent.memory_blocks?.length || 0}
        />
      ))}
    </div>
  );
}
```

## 🎓 Best Practices

1. **Component Composition**: Build complex UIs from simple components
2. **State Management**: Use React hooks or your preferred state management
3. **Type Safety**: Leverage TypeScript for better developer experience
4. **Accessibility**: Test keyboard navigation and screen readers
5. **Performance**: Use React.memo for expensive components

## 📄 License

These components are provided as-is for your Letta database project. Feel free to modify and extend them as needed.

## 🔗 Resources

- [Letta Documentation](https://docs.letta.com/)
- [Gruvbox Theme](https://github.com/morhetz/gruvbox)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy Building!** 🚀
