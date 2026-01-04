/**
 * Gruvbox-Inspired React UI Components for Letta Database Frontend
 */

import React, { useState, useEffect, ReactNode } from "react";
import "./gruvbox-components.css";

export const gruvboxColors = {
  bg0_hard: "#1d2021",
  bg0: "#282828",
  bg1: "#3c3836",
  bg2: "#504945",
  bg3: "#665c54",
  bg4: "#7c6f64",
  fg0: "#fbf1c7",
  fg1: "#ebdbb2",
  fg2: "#d5c4a1",
  fg3: "#bdae93",
  fg4: "#a89984",
  red: "#fb4934",
  green: "#b8bb26",
  yellow: "#fabd2f",
  blue: "#83a598",
  purple: "#d3869b",
  aqua: "#8ec07c",
  orange: "#fe8019",
};

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  icon,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "gb-btn",
        variant,
        size,
        fullWidth ? "full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
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
  type?: "text" | "password" | "email" | "number";
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
  type = "text",
  disabled = false,
  error,
  label,
  icon,
  fullWidth = false,
  className = "",
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {label && <label className="gb-label">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 gb-text-muted">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`gb-input ${icon ? "pl-10" : ""} ${error ? "error" : ""}`}
        />
      </div>
      {error && (
        <p className="gb-text-sm" style={{ color: gruvboxColors.red }}>
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
  className = "",
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {label && <label className="gb-label">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`gb-textarea resize-vertical ${error ? "error" : ""}`}
      />
      {error && (
        <p className="gb-text-sm" style={{ color: gruvboxColors.red }}>
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
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  actions,
  variant = "default",
  padding = "md",
  className = "",
  onClick,
}) => {
  const paddingStyles = {
    none: "pad-none",
    sm: "pad-sm",
    md: "pad-md",
    lg: "pad-lg",
  };

  return (
    <div
      onClick={onClick}
      className={[
        "gb-card",
        variant,
        paddingStyles[padding],
        onClick ? "cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
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
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  return (
    <span
      className={[
        "gb-badge",
        size,
        variant,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
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
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className = "",
}) => {
  const sizeStyles = {
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="gb-modal-overlay" onClick={onClose}>
      <div
        className={["gb-modal", sizeStyles[size], className].filter(Boolean).join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="gb-modal-header">
            <h2 className="text-xl font-bold" style={{ color: gruvboxColors.fg0 }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-2xl leading-none hover:opacity-70 transition-opacity"
              style={{ color: gruvboxColors.fg3 }}
            >
              x
            </button>
          </div>
        )}
        <div className="mb-4">{children}</div>
        {footer && <div className="gb-modal-footer">{footer}</div>}
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
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={className}>
      <div className="gb-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={["gb-tab", activeTab === tab.id ? "active" : ""].filter(Boolean).join(" ")}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
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
  className = "",
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="gb-table">
        <thead>
          <tr style={{ borderBottom: `2px solid ${gruvboxColors.bg3}` }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left font-bold text-sm"
                style={{
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
              className={onRowClick ? "cursor-pointer" : ""}
              onMouseEnter={(e) => {
                if (onRowClick) {
                  e.currentTarget.style.backgroundColor = gruvboxColors.bg2;
                }
              }}
              onMouseLeave={(e) => {
                if (onRowClick) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {columns.map((col) => (
                <td key={col.key}>
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
  variant?: "info" | "success" | "warning" | "danger";
  title?: string;
  onClose?: () => void;
  icon?: ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = "info",
  title,
  onClose,
  icon,
  className = "",
}) => {
  const variantColor =
    variant === "info"
      ? gruvboxColors.blue
      : variant === "success"
      ? gruvboxColors.green
      : variant === "warning"
      ? gruvboxColors.yellow
      : gruvboxColors.red;

  return (
    <div className={["gb-alert", variant, className].filter(Boolean).join(" ")}>
      <div className="flex items-start gap-3">
        {icon && <span style={{ color: variantColor }}>{icon}</span>}
        <div className="flex-1">
          {title && (
            <h4 className="font-bold mb-1" style={{ color: variantColor }}>
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
            x
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
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = gruvboxColors.aqua,
  className = "",
}) => {
  return (
    <div
      className={["gb-spinner", size, className].filter(Boolean).join(" ")}
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
  status: "active" | "idle" | "error";
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
  className = "",
}) => {
  const statusColors = {
    active: gruvboxColors.green,
    idle: gruvboxColors.yellow,
    error: gruvboxColors.red,
  };

  return (
    <Card onClick={onClick} className={className} variant="elevated">
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
            ✕
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
  className = "",
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
          <Badge variant="info" size="sm">
            {label}
          </Badge>
          {description && (
            <p className="text-xs mt-1" style={{ color: gruvboxColors.fg4 }}>
              {description}
            </p>
          )}
        </div>
        <div className="flex gap-1">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
              ✎
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="sm" onClick={onDelete}>
              ✕
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Textarea value={editValue} onChange={setEditValue} rows={3} fullWidth />
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
        <p className="text-sm font-mono whitespace-pre-wrap" style={{ color: gruvboxColors.fg2 }}>
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
  role: "user" | "assistant" | "system" | "tool";
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
  className = "",
}) => {
  return (
    <div className={`gb-chat ${role} ${className}`}>
      <div className="max-w-[80%]">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={role === "user" ? "default" : "info"} size="sm">
            {role === "tool" && toolName ? `🛠 ${toolName}` : role}
          </Badge>
          {timestamp && (
            <span className="text-xs" style={{ color: gruvboxColors.fg4 }}>
              {timestamp}
            </span>
          )}
        </div>
        <div className="bubble">{content}</div>
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
