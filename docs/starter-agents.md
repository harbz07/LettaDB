# Starter Agent Templates for Database Building & Memory Management

This document provides ready-to-use agent templates for building databases and managing agent memory with Letta.

---

## 1. Database Architect Agent

**Purpose:** Helps design database schemas, recommend best practices, and plan data models.

### Python Implementation

```python
from letta_client import Letta
import os

client = Letta(api_key=os.getenv("LETTA_API_KEY"))

db_architect = client.agents.create(
    name="Database Architect",
    memory_blocks=[
        {
            "label": "human",
            "value": "The user is building a database system and needs expert guidance on schema design, normalization, and best practices."
        },
        {
            "label": "persona",
            "value": "I am an expert database architect with 15+ years of experience. I specialize in PostgreSQL, SQLite, and distributed databases. I provide clear, practical advice on schema design, indexing strategies, and performance optimization. I ask clarifying questions to understand requirements before making recommendations."
        },
        {
            "label": "project_context",
            "value": "No active project yet. Awaiting user's database requirements.",
            "description": "Tracks the current database project, including schema decisions, table structures, and architectural choices made during conversations."
        },
        {
            "label": "design_patterns",
            "value": "Common patterns: star schema for analytics, normalized forms for OLTP, event sourcing for audit trails.",
            "description": "Stores database design patterns and best practices relevant to the current project for quick reference."
        }
    ],
    tools=["web_search", "run_code"],
    model="openai/gpt-4.1",
    embedding="openai/text-embedding-3-small"
)

print(f"Database Architect Agent created: {db_architect.id}")

# Example usage
response = client.agents.messages.create(
    agent_id=db_architect.id,
    messages=[{
        "role": "user", 
        "content": "I need to build a database for tracking user conversations with AI agents. What schema would you recommend?"
    }]
)

for msg in response.messages:
    if msg.message_type == "assistant_message":
        print(msg.content)
```

### TypeScript Implementation

```typescript
import Letta from "@letta-ai/letta-client";

const client = new Letta({ apiKey: process.env.LETTA_API_KEY });

const dbArchitect = await client.agents.create({
  name: "Database Architect",
  memory_blocks: [
    {
      label: "human",
      value: "The user is building a database system and needs expert guidance on schema design, normalization, and best practices."
    },
    {
      label: "persona",
      value: "I am an expert database architect with 15+ years of experience. I specialize in PostgreSQL, SQLite, and distributed databases. I provide clear, practical advice on schema design, indexing strategies, and performance optimization. I ask clarifying questions to understand requirements before making recommendations."
    },
    {
      label: "project_context",
      value: "No active project yet. Awaiting user's database requirements.",
      description: "Tracks the current database project, including schema decisions, table structures, and architectural choices made during conversations."
    },
    {
      label: "design_patterns",
      value: "Common patterns: star schema for analytics, normalized forms for OLTP, event sourcing for audit trails.",
      description: "Stores database design patterns and best practices relevant to the current project for quick reference."
    }
  ],
  tools: ["web_search", "run_code"],
  model: "openai/gpt-4.1",
  embedding: "openai/text-embedding-3-small"
});

console.log(`Database Architect Agent created: ${dbArchitect.id}`);

// Example usage
const response = await client.agents.messages.create(dbArchitect.id, {
  messages: [{
    role: "user",
    content: "I need to build a database for tracking user conversations with AI agents. What schema would you recommend?"
  }]
});

for (const msg of response.messages) {
  if (msg.message_type === "assistant_message") {
    console.log(msg.content);
  }
}
```

---

## 2. Memory Custodian Agent

**Purpose:** Manages, organizes, and optimizes memory blocks across agents. Helps maintain clean, relevant context.

### Python Implementation

```python
from letta_client import Letta
import os

client = Letta(api_key=os.getenv("LETTA_API_KEY"))

memory_custodian = client.agents.create(
    name="Memory Custodian",
    memory_blocks=[
        {
            "label": "human",
            "value": "The user manages multiple AI agents and needs help organizing, pruning, and optimizing their memory blocks for better performance."
        },
        {
            "label": "persona",
            "value": "I am a meticulous memory custodian and information architect. I specialize in organizing agent memory blocks, identifying redundant information, and ensuring each agent has clean, relevant context. I recommend memory structures that balance detail with conciseness. I'm proactive about suggesting when to archive old information or consolidate related memories."
        },
        {
            "label": "agent_inventory",
            "value": "No agents tracked yet. Will maintain a list of agents and their memory structures.",
            "description": "Keeps track of all agents being managed, their memory blocks, and the relationships between them."
        },
        {
            "label": "optimization_log",
            "value": "Memory optimization history will be tracked here.",
            "description": "Records all memory optimization actions taken, including pruning, consolidation, and restructuring decisions."
        }
    ],
    tools=["web_search"],
    model="openai/gpt-4.1",
    embedding="openai/text-embedding-3-small"
)

print(f"Memory Custodian Agent created: {memory_custodian.id}")

# Example usage
response = client.agents.messages.create(
    agent_id=memory_custodian.id,
    messages=[{
        "role": "user",
        "content": "I have 5 agents and their memory blocks are getting cluttered. Can you help me design a cleanup strategy?"
    }]
)

for msg in response.messages:
    if msg.message_type == "assistant_message":
        print(msg.content)
```

### TypeScript Implementation

```typescript
import Letta from "@letta-ai/letta-client";

const client = new Letta({ apiKey: process.env.LETTA_API_KEY });

const memoryCustodian = await client.agents.create({
  name: "Memory Custodian",
  memory_blocks: [
    {
      label: "human",
      value: "The user manages multiple AI agents and needs help organizing, pruning, and optimizing their memory blocks for better performance."
    },
    {
      label: "persona",
      value: "I am a meticulous memory custodian and information architect. I specialize in organizing agent memory blocks, identifying redundant information, and ensuring each agent has clean, relevant context. I recommend memory structures that balance detail with conciseness. I'm proactive about suggesting when to archive old information or consolidate related memories."
    },
    {
      label: "agent_inventory",
      value: "No agents tracked yet. Will maintain a list of agents and their memory structures.",
      description: "Keeps track of all agents being managed, their memory blocks, and the relationships between them."
    },
    {
      label: "optimization_log",
      value: "Memory optimization history will be tracked here.",
      description: "Records all memory optimization actions taken, including pruning, consolidation, and restructuring decisions."
    }
  ],
  tools: ["web_search"],
  model: "openai/gpt-4.1",
  embedding: "openai/text-embedding-3-small"
});

console.log(`Memory Custodian Agent created: ${memoryCustodian.id}`);

// Example usage
const response = await client.agents.messages.create(memoryCustodian.id, {
  messages: [{
    role: "user",
    content: "I have 5 agents and their memory blocks are getting cluttered. Can you help me design a cleanup strategy?"
  }]
});

for (const msg of response.messages) {
  if (msg.message_type === "assistant_message") {
    console.log(msg.content);
  }
}
```

---

## 3. Data Integration Specialist Agent

**Purpose:** Helps load, transform, and integrate data into your database. Handles data sources and ETL processes.

### Python Implementation

```python
from letta_client import Letta
import os

client = Letta(api_key=os.getenv("LETTA_API_KEY"))

data_integration = client.agents.create(
    name="Data Integration Specialist",
    memory_blocks=[
        {
            "label": "human",
            "value": "The user needs to load and integrate data from various sources into their database system."
        },
        {
            "label": "persona",
            "value": "I am a data integration specialist with expertise in ETL pipelines, data transformation, and working with diverse data sources (APIs, files, databases). I help design efficient data loading strategies, handle data validation, and ensure data quality. I can write code to parse, transform, and load data using Python or SQL."
        },
        {
            "label": "integration_plan",
            "value": "No active data integration project. Awaiting source and target details.",
            "description": "Tracks current data integration projects, including data sources, transformation rules, and loading schedules."
        },
        {
            "label": "data_quality_rules",
            "value": "Standard validations: null checks, type validation, referential integrity.",
            "description": "Stores data quality rules and validation logic specific to the user's database."
        }
    ],
    tools=["web_search", "run_code"],
    model="openai/gpt-4.1",
    embedding="openai/text-embedding-3-small"
)

print(f"Data Integration Specialist Agent created: {data_integration.id}")

# Example usage
response = client.agents.messages.create(
    agent_id=data_integration.id,
    messages=[{
        "role": "user",
        "content": "I need to load JSON files containing user conversations into PostgreSQL. Can you help me design the ETL process?"
    }]
)

for msg in response.messages:
    if msg.message_type == "assistant_message":
        print(msg.content)
```

### TypeScript Implementation

```typescript
import Letta from "@letta-ai/letta-client";

const client = new Letta({ apiKey: process.env.LETTA_API_KEY });

const dataIntegration = await client.agents.create({
  name: "Data Integration Specialist",
  memory_blocks: [
    {
      label: "human",
      value: "The user needs to load and integrate data from various sources into their database system."
    },
    {
      label: "persona",
      value: "I am a data integration specialist with expertise in ETL pipelines, data transformation, and working with diverse data sources (APIs, files, databases). I help design efficient data loading strategies, handle data validation, and ensure data quality. I can write code to parse, transform, and load data using Python or SQL."
    },
    {
      label: "integration_plan",
      value: "No active data integration project. Awaiting source and target details.",
      description: "Tracks current data integration projects, including data sources, transformation rules, and loading schedules."
    },
    {
      label: "data_quality_rules",
      value: "Standard validations: null checks, type validation, referential integrity.",
      description: "Stores data quality rules and validation logic specific to the user's database."
    }
  ],
  tools: ["web_search", "run_code"],
  model: "openai/gpt-4.1",
  embedding: "openai/text-embedding-3-small"
});

console.log(`Data Integration Specialist Agent created: ${dataIntegration.id}`);

// Example usage
const response = await client.agents.messages.create(dataIntegration.id, {
  messages: [{
    role: "user",
    content: "I need to load JSON files containing user conversations into PostgreSQL. Can you help me design the ETL process?"
  }]
});

for (const msg of response.messages) {
  if (msg.message_type === "assistant_message") {
    console.log(msg.content);
  }
}
```

---

## 4. Query Optimization Expert Agent

**Purpose:** Helps write efficient queries, optimize performance, and troubleshoot slow database operations.

### Python Implementation

```python
from letta_client import Letta
import os

client = Letta(api_key=os.getenv("LETTA_API_KEY"))

query_optimizer = client.agents.create(
    name="Query Optimization Expert",
    memory_blocks=[
        {
            "label": "human",
            "value": "The user writes database queries and needs help optimizing them for better performance."
        },
        {
            "label": "persona",
            "value": "I am a database performance expert specializing in query optimization. I analyze SQL queries, explain execution plans, and recommend indexes and query rewrites. I understand PostgreSQL, MySQL, and SQLite internals. I provide specific, actionable advice with benchmarks when possible."
        },
        {
            "label": "database_schema",
            "value": "No schema information loaded yet. Will track table structures, indexes, and relationships.",
            "description": "Stores the current database schema including tables, columns, indexes, and constraints for accurate optimization recommendations."
        },
        {
            "label": "optimization_history",
            "value": "Query optimization recommendations will be tracked here.",
            "description": "Records past optimization work, including problematic queries, solutions applied, and performance improvements achieved."
        }
    ],
    tools=["web_search", "run_code"],
    model="openai/gpt-4.1",
    embedding="openai/text-embedding-3-small"
)

print(f"Query Optimization Expert Agent created: {query_optimizer.id}")

# Example usage
response = client.agents.messages.create(
    agent_id=query_optimizer.id,
    messages=[{
        "role": "user",
        "content": "This query is taking 5 seconds: SELECT * FROM messages WHERE user_id IN (SELECT id FROM users WHERE created_at > '2024-01-01'). How can I optimize it?"
    }]
)

for msg in response.messages:
    if msg.message_type == "assistant_message":
        print(msg.content)
```

### TypeScript Implementation

```typescript
import Letta from "@letta-ai/letta-client";

const client = new Letta({ apiKey: process.env.LETTA_API_KEY });

const queryOptimizer = await client.agents.create({
  name: "Query Optimization Expert",
  memory_blocks: [
    {
      label: "human",
      value: "The user writes database queries and needs help optimizing them for better performance."
    },
    {
      label: "persona",
      value: "I am a database performance expert specializing in query optimization. I analyze SQL queries, explain execution plans, and recommend indexes and query rewrites. I understand PostgreSQL, MySQL, and SQLite internals. I provide specific, actionable advice with benchmarks when possible."
    },
    {
      label: "database_schema",
      value: "No schema information loaded yet. Will track table structures, indexes, and relationships.",
      description: "Stores the current database schema including tables, columns, indexes, and constraints for accurate optimization recommendations."
    },
    {
      label: "optimization_history",
      value: "Query optimization recommendations will be tracked here.",
      description: "Records past optimization work, including problematic queries, solutions applied, and performance improvements achieved."
    }
  ],
  tools: ["web_search", "run_code"],
  model: "openai/gpt-4.1",
  embedding: "openai/text-embedding-3-small"
});

console.log(`Query Optimization Expert Agent created: ${queryOptimizer.id}`);

// Example usage
const response = await client.agents.messages.create(queryOptimizer.id, {
  messages: [{
    role: "user",
    content: "This query is taking 5 seconds: SELECT * FROM messages WHERE user_id IN (SELECT id FROM users WHERE created_at > '2024-01-01'). How can I optimize it?"
  }]
});

for (const msg of response.messages) {
  if (msg.message_type === "assistant_message") {
    console.log(msg.content);
  }
}
```

---

## 5. Multi-Agent Coordinator

**Purpose:** Orchestrates multiple specialized agents working together on complex database projects.

### Python Implementation

```python
from letta_client import Letta
import os

client = Letta(api_key=os.getenv("LETTA_API_KEY"))

coordinator = client.agents.create(
    name="Database Project Coordinator",
    memory_blocks=[
        {
            "label": "human",
            "value": "The user is managing a complex database project that requires coordination between multiple specialized agents."
        },
        {
            "label": "persona",
            "value": "I am a project coordinator who manages specialized database agents. I break down complex requests, delegate to appropriate specialists (architect, optimizer, integration expert), and synthesize their recommendations into coherent action plans. I track project progress and ensure all agents have the context they need."
        },
        {
            "label": "active_agents",
            "value": "Available specialists: Database Architect, Query Optimizer, Data Integration Specialist, Memory Custodian.",
            "description": "Tracks which specialized agents are available and their current workload or status."
        },
        {
            "label": "project_status",
            "value": "No active project. Awaiting user's requirements.",
            "description": "Maintains the overall project state, including milestones, blockers, and integration points between different agent workstreams."
        }
    ],
    tools=["web_search"],
    model="openai/gpt-4.1",
    embedding="openai/text-embedding-3-small"
)

print(f"Database Project Coordinator Agent created: {coordinator.id}")

# Example usage
response = client.agents.messages.create(
    agent_id=coordinator.id,
    messages=[{
        "role": "user",
        "content": "I need to build a complete database system for storing AI agent conversations with optimized queries and efficient data loading. Where should we start?"
    }]
)

for msg in response.messages:
    if msg.message_type == "assistant_message":
        print(msg.content)
```

### TypeScript Implementation

```typescript
import Letta from "@letta-ai/letta-client";

const client = new Letta({ apiKey: process.env.LETTA_API_KEY });

const coordinator = await client.agents.create({
  name: "Database Project Coordinator",
  memory_blocks: [
    {
      label: "human",
      value: "The user is managing a complex database project that requires coordination between multiple specialized agents."
    },
    {
      label: "persona",
      value: "I am a project coordinator who manages specialized database agents. I break down complex requests, delegate to appropriate specialists (architect, optimizer, integration expert), and synthesize their recommendations into coherent action plans. I track project progress and ensure all agents have the context they need."
    },
    {
      label: "active_agents",
      value: "Available specialists: Database Architect, Query Optimizer, Data Integration Specialist, Memory Custodian.",
      description: "Tracks which specialized agents are available and their current workload or status."
    },
    {
      label: "project_status",
      value: "No active project. Awaiting user's requirements.",
      description: "Maintains the overall project state, including milestones, blockers, and integration points between different agent workstreams."
    }
  ],
  tools: ["web_search"],
  model: "openai/gpt-4.1",
  embedding: "openai/text-embedding-3-small"
});

console.log(`Database Project Coordinator Agent created: ${coordinator.id}`);

// Example usage
const response = await client.agents.messages.create(coordinator.id, {
  messages: [{
    role: "user",
    content: "I need to build a complete database system for storing AI agent conversations with optimized queries and efficient data loading. Where should we start?"
  }]
});

for (const msg of response.messages) {
  if (msg.message_type === "assistant_message") {
    console.log(msg.content);
  }
}
```

---

## Usage Tips

1. **Start with the Coordinator**: If you have a complex project, create the coordinator agent first to help you plan which other agents you need.

2. **Customize Memory Blocks**: These templates are starting points. Modify the memory blocks based on your specific project requirements.

3. **Agent IDs**: Save the agent IDs after creation so you can continue conversations with the same agent later.

4. **Shared Memory**: For collaborative workflows, consider creating shared memory blocks that multiple agents can access (see Letta documentation on shared memory blocks).

5. **Environment Variables**: Store your `LETTA_API_KEY` in environment variables for security.

6. **Tool Selection**: Adjust the tools array based on your needs. The `run_code` tool is particularly useful for database-related tasks where agents need to execute SQL or data transformation scripts.

---

## Next Steps

After creating these agents:

1. **Test Each Agent**: Send a few messages to understand how each agent responds and refines its memory
2. **Document Agent IDs**: Keep a record of created agent IDs in your project
3. **Build Workflows**: Use tool rules to create structured workflows between agents
4. **Monitor Memory**: Regularly check memory blocks to ensure agents maintain relevant context

For advanced features like multi-agent communication and tool rules, refer to the main [Letta documentation](https://docs.letta.com/).
