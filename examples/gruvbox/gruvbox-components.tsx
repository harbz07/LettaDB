/**
 * Gruvbox-Inspired React UI Components for Letta Database Frontend
 * 
 * A complete UI component library with the warm, retro Gruvbox color palette.
 * All components are fully typed with TypeScript and built for modern React.
 */

import React, { useState, useEffect, ReactNode } from 'react';

// ============================================================================
// GRUVBOX COLOR PALETTE
// ============================================================================

export const gruvboxColors = {
  // Dark mode (primary)
  bg0_hard: '#1d2021',
  bg0: '#282828',
  bg1: '#3c3836',
  bg2: '#504945',
  bg3: '#665c54',
  bg4: '#7c6f64',
  
  // Light foreground
  fg0: '#fbf1c7',
  fg1: '#ebdbb2',
  fg2: '#d5c4a1',
  fg3: '#bdae93',
  fg4: '#a89984',
  
  // Colors
  red: '#fb4934',
  green: '#b8bb26',
  yellow: '#fabd2f',
  blue: '#83a598',
  purple: '#d3869b',
  aqua: '#8ec07c',
  orange: '#fe8019',
  
  // Muted variants
  redMuted: '#cc241d',
  greenMuted: '#98971a',
  yellowMuted: '#d79921',
  blueMuted: '#458588',
  purpleMuted: '#b16286',
  aquaMuted: '#689d6a',
  orangeMuted: '#d65d0e',
  
  // Neutral
  gray: '#928374',
  grayDark: '#504945',
};

// ============================================================================
// BASE STYLES
// ============================================================================

const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
  
  * {
    box-sizing: border-box;
  }
  
  .gruvbox-root {
    font-family: 'JetBrains Mono', monospace;
    background-color: ${gruvboxColors.bg0};
    color: ${gruvboxColors.fg1};
    min-height: 100vh;
  }
`;

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon,
  className = '',
}) => {
  const variantStyles = {
    primary: `bg-[${gruvboxColors.blue}] hover:bg-[${gruvboxColors.blueMuted}] text-[${gruvboxColors.bg0}]`,
    secondary: `bg-[${gruvboxColors.bg2}] hover:bg-[${gruvboxColors.bg3}] text-[${gruvboxColors.fg1}] border border-[${gruvboxColors.bg4}]`,
    success: `bg-[${gruvboxColors.green}] hover:bg-[${gruvboxColors.greenMuted}] text-[${gruvboxColors.bg0}]`,
    danger: `bg-[${gruvboxColors.red}] hover:bg-[${gruvboxColors.redMuted}] text-[${gruvboxColors.bg0}]`,
    warning: `bg-[${gruvboxColors.yellow}] hover:bg-[${gruvboxColors.yellowMuted}] text-[${gruvboxColors.bg0}]`,
    ghost: `bg-transparent hover:bg-[${gruvboxColors.bg1}] text-[${gruvboxColors.fg1}]`,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        font-medium rounded-md transition-all duration-200
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-[${gruvboxColors.aqua}] focus:ring-offset-2 focus:ring-offset-[${gruvboxColors.bg0}]
        ${className}
      `}
      style={{
        backgroundColor: variant === 'primary' ? gruvboxColors.blue :
                        variant === 'success' ? gruvboxColors.green :
                        variant === 'danger' ? gruvboxColors.red :
                        variant === 'warning' ? gruvboxColors.yellow :
                        variant === 'secondary' ? gruvboxColors.bg2 :
                        'transparent',
        color: variant === 'ghost' || variant === 'secondary' ? gruvboxColors.fg1 : gruvboxColors.bg0,
        borderColor: variant === 'secondary' ? gruvboxColors.bg4 : 'transparent',
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

// ============================================================================
// INPUT COMPONENT
// ============================================================================

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  disabled?: boolean;
  error?: string;
  label?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  error,
  label,
  icon,
  fullWidth = false,
  className = '',
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: gruvboxColors.fg2 }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            style={{ color: gruvboxColors.fg4 }}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-2 rounded-md
            ${icon ? 'pl-10' : ''}
            font-mono text-base
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          style={{
            backgroundColor: gruvboxColors.bg1,
            color: gruvboxColors.fg1,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: error ? gruvboxColors.red : gruvboxColors.bg3,
            outlineColor: gruvboxColors.aqua,
            ringColor: gruvboxColors.aqua,
            ringOffsetColor: gruvboxColors.bg0,
          }}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm" style={{ color: gruvboxColors.red }}>
          {error}
        </p>
      )}
    </div>
  );
};

// ============================================================================
// TEXTAREA COMPONENT
// ============================================================================

export interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  rows?: number;
  fullWidth?: boolean;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  label,
  rows = 4,
  fullWidth = false,
  className = '',
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: gruvboxColors.fg2 }}
        >
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className="w-full px-4 py-2 rounded-md font-mono text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
        style={{
          backgroundColor: gruvboxColors.bg1,
          color: gruvboxColors.fg1,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: error ? gruvboxColors.red : gruvboxColors.bg3,
          outlineColor: gruvboxColors.aqua,
        }}
      />
      {error && (
        <p className="mt-1 text-sm" style={{ color: gruvboxColors.red }}>
          {error}
        </p>
      )}
    </div>
  );
};

// ============================================================================
// CARD COMPONENT
// ============================================================================

export interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  actions,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };

  const variantStyles = {
    default: `bg-[${gruvboxColors.bg1}]`,
    elevated: `bg-[${gruvboxColors.bg1}] shadow-lg`,
    outlined: `bg-[${gruvboxColors.bg0}] border border-[${gruvboxColors.bg3}]`,
  };

  return (
    <div
      onClick={onClick}
      className={`
        rounded-lg transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-xl' : ''}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className}
      `}
      style={{
        backgroundColor: variant === 'outlined' ? gruvboxColors.bg0 : gruvboxColors.bg1,
        borderColor: variant === 'outlined' ? gruvboxColors.bg3 : 'transparent',
      }}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-lg font-bold" style={{ color: gruvboxColors.fg0 }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm mt-1" style={{ color: gruvboxColors.fg3 }}>
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

// ============================================================================
// BADGE COMPONENT
// ============================================================================

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    default: { bg: gruvboxColors.bg3, text: gruvboxColors.fg1 },
    success: { bg: gruvboxColors.greenMuted, text: gruvboxColors.bg0 },
    warning: { bg: gruvboxColors.yellowMuted, text: gruvboxColors.bg0 },
    danger: { bg: gruvboxColors.redMuted, text: gruvboxColors.bg0 },
    info: { bg: gruvboxColors.blueMuted, text: gruvboxColors.bg0 },
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${sizeStyles[size]}
        ${className}
      `}
      style={{
        backgroundColor: variantStyles[variant].bg,
        color: variantStyles[variant].text,
      }}
    >
      {children}
    </span>
  );
};

// ============================================================================
// MODAL COMPONENT
// ============================================================================

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(29, 32, 33, 0.85)' }}
      onClick={onClose}
    >
      <div
        className={`
          w-full ${sizeStyles[size]} rounded-lg p-6 shadow-2xl
          animate-fade-in ${className}
        `}
        style={{ backgroundColor: gruvboxColors.bg1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: `1px solid ${gruvboxColors.bg3}` }}>
            <h2 className="text-xl font-bold" style={{ color: gruvboxColors.fg0 }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-2xl leading-none hover:opacity-70 transition-opacity"
              style={{ color: gruvboxColors.fg3 }}
            >
              ×
            </button>
          </div>
        )}
        <div className="mb-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 pt-4" style={{ borderTop: `1px solid ${gruvboxColors.bg3}` }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// TABS COMPONENT
// ============================================================================

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={className}>
      <div className="flex gap-1 mb-4" style={{ borderBottom: `2px solid ${gruvboxColors.bg3}` }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 font-medium transition-all duration-200
              flex items-center gap-2 rounded-t-md
              ${activeTab === tab.id ? 'border-b-2' : ''}
            `}
            style={{
              color: activeTab === tab.id ? gruvboxColors.aqua : gruvboxColors.fg3,
              backgroundColor: activeTab === tab.id ? gruvboxColors.bg2 : 'transparent',
              borderBottomColor: activeTab === tab.id ? gruvboxColors.aqua : 'transparent',
            }}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

// ============================================================================
// TABLE COMPONENT
// ============================================================================

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  className = '',
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: `2px solid ${gruvboxColors.bg3}` }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-3 font-bold text-sm"
                style={{
                  color: gruvboxColors.fg2,
                  width: col.width,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(item)}
              className={`
                transition-all duration-200
                ${onRowClick ? 'cursor-pointer hover:bg-opacity-50' : ''}
              `}
              style={{
                borderBottom: `1px solid ${gruvboxColors.bg2}`,
                backgroundColor: onRowClick ? 'transparent' : undefined,
              }}
              onMouseEnter={(e) => {
                if (onRowClick) {
                  e.currentTarget.style.backgroundColor = gruvboxColors.bg2;
                }
              }}
              onMouseLeave={(e) => {
                if (onRowClick) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-sm"
                  style={{ color: gruvboxColors.fg1 }}
                >
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// ALERT COMPONENT
// ============================================================================

export interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  onClose?: () => void;
  icon?: ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  onClose,
  icon,
  className = '',
}) => {
  const variantStyles = {
    info: { bg: gruvboxColors.bg2, border: gruvboxColors.blue, text: gruvboxColors.blue },
    success: { bg: gruvboxColors.bg2, border: gruvboxColors.green, text: gruvboxColors.green },
    warning: { bg: gruvboxColors.bg2, border: gruvboxColors.yellow, text: gruvboxColors.yellow },
    danger: { bg: gruvboxColors.bg2, border: gruvboxColors.red, text: gruvboxColors.red },
  };

  return (
    <div
      className={`rounded-md p-4 ${className}`}
      style={{
        backgroundColor: variantStyles[variant].bg,
        borderLeft: `4px solid ${variantStyles[variant].border}`,
      }}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span style={{ color: variantStyles[variant].text }}>
            {icon}
          </span>
        )}
        <div className="flex-1">
          {title && (
            <h4
              className="font-bold mb-1"
              style={{ color: variantStyles[variant].text }}
            >
              {title}
            </h4>
          )}
          <div style={{ color: gruvboxColors.fg2 }}>{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xl leading-none hover:opacity-70 transition-opacity"
            style={{ color: gruvboxColors.fg3 }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// LOADING SPINNER COMPONENT
// ============================================================================

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = gruvboxColors.aqua,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={`
        ${sizeStyles[size]} rounded-full animate-spin
        ${className}
      `}
      style={{
        borderColor: `${color}33`,
        borderTopColor: color,
      }}
    />
  );
};

// ============================================================================
// AGENT CARD (LETTA-SPECIFIC)
// ============================================================================

export interface AgentCardProps {
  name: string;
  id: string;
  model: string;
  status: 'active' | 'idle' | 'error';
  lastActive?: string;
  memoryBlocks?: number;
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  name,
  id,
  model,
  status,
  lastActive,
  memoryBlocks = 0,
  onClick,
  onDelete,
  className = '',
}) => {
  const statusColors = {
    active: gruvboxColors.green,
    idle: gruvboxColors.yellow,
    error: gruvboxColors.red,
  };

  return (
    <Card
      onClick={onClick}
      className={className}
      variant="elevated"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: statusColors[status] }}
          />
          <div>
            <h3 className="font-bold text-lg" style={{ color: gruvboxColors.fg0 }}>
              {name}
            </h3>
            <p className="text-xs font-mono" style={{ color: gruvboxColors.fg4 }}>
              {id}
            </p>
          </div>
        </div>
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              onDelete();
            }}
          >
            🗑️
          </Button>
        )}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span style={{ color: gruvboxColors.fg3 }}>Model:</span>
          <span style={{ color: gruvboxColors.aqua }}>{model}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: gruvboxColors.fg3 }}>Memory Blocks:</span>
          <span style={{ color: gruvboxColors.purple }}>{memoryBlocks}</span>
        </div>
        {lastActive && (
          <div className="flex justify-between">
            <span style={{ color: gruvboxColors.fg3 }}>Last Active:</span>
            <span style={{ color: gruvboxColors.fg2 }}>{lastActive}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

// ============================================================================
// MEMORY BLOCK COMPONENT (LETTA-SPECIFIC)
// ============================================================================

export interface MemoryBlockProps {
  label: string;
  value: string;
  description?: string;
  onEdit?: (newValue: string) => void;
  onDelete?: () => void;
  className?: string;
}

export const MemoryBlock: React.FC<MemoryBlockProps> = ({
  label,
  value,
  description,
  onEdit,
  onDelete,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onEdit?.(editValue);
    setIsEditing(false);
  };

  return (
    <Card variant="outlined" padding="sm" className={className}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <Badge variant="info" size="sm">{label}</Badge>
          {description && (
            <p className="text-xs mt-1" style={{ color: gruvboxColors.fg4 }}>
              {description}
            </p>
          )}
        </div>
        <div className="flex gap-1">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              ✏️
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
            >
              🗑️
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editValue}
            onChange={setEditValue}
            rows={3}
            fullWidth
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setEditValue(value);
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p
          className="text-sm font-mono whitespace-pre-wrap"
          style={{ color: gruvboxColors.fg2 }}
        >
          {value}
        </p>
      )}
    </Card>
  );
};

// ============================================================================
// CHAT MESSAGE COMPONENT (LETTA-SPECIFIC)
// ============================================================================

export interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp?: string;
  toolName?: string;
  className?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  timestamp,
  toolName,
  className = '',
}) => {
  const roleStyles = {
    user: { bg: gruvboxColors.bg2, text: gruvboxColors.fg0, align: 'flex-end' },
    assistant: { bg: gruvboxColors.blueMuted, text: gruvboxColors.fg0, align: 'flex-start' },
    system: { bg: gruvboxColors.bg3, text: gruvboxColors.fg3, align: 'flex-start' },
    tool: { bg: gruvboxColors.purpleMuted, text: gruvboxColors.fg0, align: 'flex-start' },
  };

  return (
    <div className={`flex ${roleStyles[role].align} mb-3 ${className}`}>
      <div className="max-w-[80%]">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={role === 'user' ? 'default' : 'info'} size="sm">
            {role === 'tool' && toolName ? `🔧 ${toolName}` : role}
          </Badge>
          {timestamp && (
            <span className="text-xs" style={{ color: gruvboxColors.fg4 }}>
              {timestamp}
            </span>
          )}
        </div>
        <div
          className="rounded-lg p-3 font-mono text-sm whitespace-pre-wrap"
          style={{
            backgroundColor: roleStyles[role].bg,
            color: roleStyles[role].text,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  gruvboxColors,
  Button,
  Input,
  Textarea,
  Card,
  Badge,
  Modal,
  Tabs,
  Table,
  Alert,
  Spinner,
  AgentCard,
  MemoryBlock,
  ChatMessage,
};
