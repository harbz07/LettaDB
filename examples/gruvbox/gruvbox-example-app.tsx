/**
 * Example Application Using Gruvbox Components
 * 
 * This file demonstrates how to use the Gruvbox component library
 * to build a complete Letta database management interface.
 */

import React, { useState } from 'react';
import {
  Button,
  Input,
  Card,
  Modal,
  Tabs,
  Table,
  Alert,
  AgentCard,
  MemoryBlock,
  ChatMessage,
  gruvboxColors,
} from './gruvbox-components';

// ============================================================================
// EXAMPLE: AGENT MANAGEMENT DASHBOARD
// ============================================================================

export const AgentDashboard: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');

  const mockAgents = [
    {
      name: 'Database Architect',
      id: 'agent-abc123',
      model: 'openai/gpt-4.1',
      status: 'active' as const,
      lastActive: '2 min ago',
      memoryBlocks: 4,
    },
    {
      name: 'Memory Custodian',
      id: 'agent-def456',
      model: 'openai/gpt-4.1',
      status: 'idle' as const,
      lastActive: '1 hour ago',
      memoryBlocks: 3,
    },
    {
      name: 'Query Optimizer',
      id: 'agent-ghi789',
      model: 'openai/gpt-4.1',
      status: 'error' as const,
      lastActive: '5 hours ago',
      memoryBlocks: 5,
    },
  ];

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: gruvboxColors.bg0 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: gruvboxColors.fg0 }}
          >
            🗄️ Letta Database
          </h1>
          <p style={{ color: gruvboxColors.fg3 }}>
            Manage your AI agents and database operations
          </p>
        </div>

        {/* Alert */}
        <Alert
          variant="info"
          title="Welcome!"
          icon="ℹ️"
          className="mb-6"
        >
          You have 3 active agents. Click on any agent to view details.
        </Alert>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <Button
            variant="primary"
            icon="+"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Agent
          </Button>
          <Button variant="secondary" icon="🔄">
            Refresh
          </Button>
          <Button variant="ghost" icon="⚙️">
            Settings
          </Button>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {mockAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              {...agent}
              onClick={() => console.log(`Clicked ${agent.name}`)}
              onDelete={() => console.log(`Delete ${agent.name}`)}
            />
          ))}
        </div>

        {/* Create Agent Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Agent"
          size="md"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => {
                console.log('Creating agent:', newAgentName);
                setIsCreateModalOpen(false);
                setNewAgentName('');
              }}>
                Create Agent
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input
              label="Agent Name"
              value={newAgentName}
              onChange={setNewAgentName}
              placeholder="e.g., Database Architect"
              fullWidth
            />
            <Input
              label="Model"
              value="openai/gpt-4.1"
              onChange={() => {}}
              fullWidth
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE: MEMORY BLOCKS MANAGER
// ============================================================================

export const MemoryManager: React.FC = () => {
  const mockMemoryBlocks = [
    {
      label: 'human',
      value: 'The user is building a database system and needs expert guidance.',
      description: 'Stores key details about the person you are conversing with.',
    },
    {
      label: 'persona',
      value: 'I am an expert database architect with 15+ years of experience.',
      description: 'Stores details about your current persona.',
    },
    {
      label: 'project_context',
      value: 'Working on a PostgreSQL schema for AI conversation storage.',
      description: 'Tracks the current database project and decisions.',
    },
  ];

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: gruvboxColors.bg0 }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: gruvboxColors.fg0 }}
        >
          Memory Blocks
        </h2>

        <div className="space-y-4">
          {mockMemoryBlocks.map((block, idx) => (
            <MemoryBlock
              key={idx}
              {...block}
              onEdit={(newValue) => console.log('Edit:', block.label, newValue)}
              onDelete={() => console.log('Delete:', block.label)}
            />
          ))}
        </div>

        <Button
          variant="primary"
          icon="+"
          className="mt-6"
          onClick={() => console.log('Add memory block')}
        >
          Add Memory Block
        </Button>
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE: CHAT INTERFACE
// ============================================================================

export const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');

  const mockMessages = [
    {
      role: 'system' as const,
      content: 'Agent initialized with Database Architect persona.',
      timestamp: '10:00 AM',
    },
    {
      role: 'user' as const,
      content: 'Help me design a schema for storing AI conversations.',
      timestamp: '10:01 AM',
    },
    {
      role: 'tool' as const,
      content: 'Searching for best practices on conversation storage...',
      timestamp: '10:01 AM',
      toolName: 'web_search',
    },
    {
      role: 'assistant' as const,
      content: 'Based on best practices, I recommend a normalized schema with these tables:\n\n1. conversations\n2. messages\n3. agents\n4. memory_blocks\n\nLet me explain each table...',
      timestamp: '10:02 AM',
    },
  ];

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: gruvboxColors.bg0 }}
    >
      <div className="max-w-4xl mx-auto">
        <Card variant="elevated" padding="md">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: gruvboxColors.fg0 }}
          >
            💬 Chat with Database Architect
          </h2>

          {/* Messages */}
          <div
            className="h-96 overflow-y-auto mb-4 p-4 rounded"
            style={{ backgroundColor: gruvboxColors.bg0 }}
          >
            {mockMessages.map((msg, idx) => (
              <ChatMessage key={idx} {...msg} />
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={setMessage}
              placeholder="Type your message..."
              fullWidth
            />
            <Button
              variant="primary"
              onClick={() => {
                console.log('Send:', message);
                setMessage('');
              }}
            >
              Send
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE: DATA TABLE
// ============================================================================

export const DatabaseTable: React.FC = () => {
  const mockData = [
    { id: 1, name: 'conversations', rows: 1234, size: '2.4 MB', lastModified: '2 hours ago' },
    { id: 2, name: 'messages', rows: 15678, size: '12.8 MB', lastModified: '1 hour ago' },
    { id: 3, name: 'agents', rows: 8, size: '64 KB', lastModified: '3 days ago' },
    { id: 4, name: 'memory_blocks', rows: 42, size: '256 KB', lastModified: '5 hours ago' },
  ];

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: gruvboxColors.bg0 }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: gruvboxColors.fg0 }}
        >
          Database Tables
        </h2>

        <Card variant="elevated">
          <Table
            data={mockData}
            columns={[
              { key: 'name', header: 'Table Name', width: '30%' },
              { key: 'rows', header: 'Rows', width: '20%' },
              { key: 'size', header: 'Size', width: '20%' },
              { key: 'lastModified', header: 'Last Modified', width: '30%' },
            ]}
            onRowClick={(item) => console.log('Clicked:', item.name)}
          />
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE: TABBED INTERFACE
// ============================================================================

export const TabbedInterface: React.FC = () => {
  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: gruvboxColors.bg0 }}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-4xl font-bold mb-8"
          style={{ color: gruvboxColors.fg0 }}
        >
          Letta Database Manager
        </h1>

        <Tabs
          tabs={[
            {
              id: 'agents',
              label: 'Agents',
              icon: '🤖',
              content: <AgentDashboard />,
            },
            {
              id: 'memory',
              label: 'Memory',
              icon: '🧠',
              content: <MemoryManager />,
            },
            {
              id: 'chat',
              label: 'Chat',
              icon: '💬',
              content: <ChatInterface />,
            },
            {
              id: 'database',
              label: 'Database',
              icon: '🗄️',
              content: <DatabaseTable />,
            },
          ]}
        />
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP EXPORT
// ============================================================================

export default TabbedInterface;
