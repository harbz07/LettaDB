import { useMemo, useState } from "react";

type PartitionPlan = {
  strategy: "time" | "hash" | "range";
  key: string;
  intervalDays?: number;
  shards?: number;
  note?: string;
};

type AgentSummary = {
  id: string;
  name: string;
  role: string;
  tags: string[];
  status: "online" | "degraded" | "offline";
  lastMessage: string;
  latencyMs: number;
};

type EventLog = {
  id: string;
  agentId: string;
  type: "message" | "tool" | "warning" | "memory";
  summary: string;
  ts: string;
};

const mockAgents: AgentSummary[] = [
  {
    id: "agt-architect",
    name: "Database Architect",
    role: "Schema design & partitioning",
    tags: ["partitioning", "postgres"],
    status: "online",
    lastMessage: "Proposed monthly partitions on events table.",
    latencyMs: 620,
  },
  {
    id: "agt-observer",
    name: "Observability Scout",
    role: "Telemetry & dashboards",
    tags: ["observability", "alerts"],
    status: "online",
    lastMessage: "Captured 42 tool calls in the last hour.",
    latencyMs: 410,
  },
  {
    id: "agt-organizer",
    name: "Memory Custodian",
    role: "Context hygiene",
    tags: ["memory", "cleanup"],
    status: "degraded",
    lastMessage: "Needs reindex on long-term memory blocks.",
    latencyMs: 980,
  },
];

const mockEvents: EventLog[] = [
  {
    id: "evt-1",
    agentId: "agt-architect",
    type: "tool",
    summary: "Generated partition DDL for conversations table",
    ts: "2026-01-04T02:00:00Z",
  },
  {
    id: "evt-2",
    agentId: "agt-observer",
    type: "message",
    summary: "Health check OK (p99=1.1s, success=99.2%)",
    ts: "2026-01-04T02:05:00Z",
  },
  {
    id: "evt-3",
    agentId: "agt-organizer",
    type: "warning",
    summary: "Memory block 'project' exceeds 32KB budget",
    ts: "2026-01-04T02:09:00Z",
  },
  {
    id: "evt-4",
    agentId: "agt-observer",
    type: "memory",
    summary: "Archived 12 tool returns to cold storage",
    ts: "2026-01-04T02:15:00Z",
  },
];

const statusColor: Record<AgentSummary["status"], string> = {
  online: "#57f29a",
  degraded: "#f2d357",
  offline: "#f26767",
};

function PartitionCard({
  plan,
  onChange,
}: {
  plan: PartitionPlan;
  onChange: (patch: Partial<PartitionPlan>) => void;
}) {
  return (
    <div className="card stack">
      <div className="section-title">
        <h3>Partition Strategy</h3>
        <span className="pill positive">Live Planner</span>
      </div>
      <div className="stack">
        <label className="stack">
          <span className="muted">Strategy</span>
          <select
            className="select"
            value={plan.strategy}
            onChange={(e) =>
              onChange({
                strategy: e.target.value as PartitionPlan["strategy"],
                intervalDays:
                  e.target.value === "time" ? plan.intervalDays ?? 30 : undefined,
                shards: e.target.value === "hash" ? plan.shards ?? 8 : undefined,
              })
            }
          >
            <option value="time">Time-based (rolling)</option>
            <option value="hash">Hash (consistent)</option>
            <option value="range">Range (bounded)</option>
          </select>
        </label>
        <label className="stack">
          <span className="muted">Partition key</span>
          <input
            className="input"
            placeholder="e.g. created_at, user_id, org_id"
            value={plan.key}
            onChange={(e) => onChange({ key: e.target.value })}
          />
        </label>
        {plan.strategy === "time" && (
          <label className="stack">
            <span className="muted">Interval (days)</span>
            <input
              className="input"
              type="number"
              min={1}
              value={plan.intervalDays ?? 30}
              onChange={(e) =>
                onChange({ intervalDays: Number(e.target.value) || 1 })
              }
            />
          </label>
        )}
        {plan.strategy === "hash" && (
          <label className="stack">
            <span className="muted">Shards</span>
            <input
              className="input"
              type="number"
              min={1}
              value={plan.shards ?? 8}
              onChange={(e) => onChange({ shards: Number(e.target.value) || 1 })}
            />
          </label>
        )}
        <label className="stack">
          <span className="muted">Notes</span>
          <textarea
            className="textarea"
            rows={3}
            placeholder="Retention, cold storage rules, rebalancing triggers..."
            value={plan.note ?? ""}
            onChange={(e) => onChange({ note: e.target.value })}
          />
        </label>
        <button className="btn">Generate DDL Plan</button>
      </div>
    </div>
  );
}

function ObservabilityCard({ events }: { events: EventLog[] }) {
  return (
    <div className="card stack">
      <div className="section-title">
        <h3>Agent Observability</h3>
        <span className="pill">Telemetry</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <Metric label="Active agents" value="3" hint="live" />
        <Metric label="p95 latency" value="0.98s" hint="last 15m" />
        <Metric label="Tool success" value="98.6%" hint="24h" />
        <Metric label="Memory writes" value="142" hint="last hour" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Agent</th>
            <th>Type</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {events.map((evt) => (
            <tr key={evt.id}>
              <td>{new Date(evt.ts).toLocaleTimeString()}</td>
              <td>{evt.agentId}</td>
              <td>
                <span className="badge">{evt.type}</span>
              </td>
              <td>{evt.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="card stack" style={{ padding: 12 }}>
      <div className="muted">{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
      <div className="muted">{hint}</div>
    </div>
  );
}

function AgentDirectory({ agents }: { agents: AgentSummary[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | "">("");

  const tags = useMemo(
    () => Array.from(new Set(agents.flatMap((a) => a.tags))).sort(),
    [agents]
  );

  const filtered = agents.filter((a) => {
    const matchesQuery =
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.role.toLowerCase().includes(query.toLowerCase());
    const matchesTag = !tag || a.tags.includes(tag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="card stack">
      <div className="section-title">
        <h3>Agent Organization</h3>
        <span className="pill">Roster</span>
      </div>
      <div className="flex" style={{ flexWrap: "wrap" }}>
        <input
          className="input"
          style={{ maxWidth: 220 }}
          placeholder="Search agents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="select"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          style={{ maxWidth: 180 }}
        >
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button className="btn">Add Agent</button>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {filtered.map((agent) => (
          <div className="card stack" key={agent.id} style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <div className="section-title">
              <strong>{agent.name}</strong>
              <span className="pill" style={{ color: statusColor[agent.status] }}>
                {agent.status}
              </span>
            </div>
            <div className="muted">{agent.role}</div>
            <div className="flex" style={{ flexWrap: "wrap" }}>
              {agent.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="muted">Last: {agent.lastMessage}</div>
            <div className="muted">p50 latency: {agent.latencyMs} ms</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [plan, setPlan] = useState<PartitionPlan>({
    strategy: "time",
    key: "created_at",
    intervalDays: 30,
    note: "Roll partitions monthly; archive >180d to cold storage.",
  });

  return (
    <div className="app-shell stack">
      <header className="flex" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <div className="stack">
          <h1 style={{ margin: 0 }}>LettaDB Control Center</h1>
          <div className="muted">
            Partition planning, agent observability, and organization in one place.
          </div>
        </div>
        <div className="flex">
          <button className="btn">Run Health Sweep</button>
        </div>
      </header>

      <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        <PartitionCard plan={plan} onChange={(patch) => setPlan({ ...plan, ...patch })} />
        <ObservabilityCard events={mockEvents} />
      </div>

      <AgentDirectory agents={mockAgents} />
    </div>
  );
}
