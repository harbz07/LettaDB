import "dotenv/config";
import Letta from "@letta-ai/letta-client";
import { env } from "../env";

async function main() {
  const client = new Letta({
    apiKey: env.lettaApiKey,
    baseURL: env.lettaBaseUrl,
  });

  const agent = await client.agents.create({
    name: "LettaDB Quickstart Agent",
    memory_blocks: [
      {
        label: "human",
        value: "The user is testing the Letta quickstart for database-focused agents.",
      },
      {
        label: "persona",
        value:
          "I am a pragmatic database-savvy copilot. I suggest safe steps, summarize clearly, and avoid risky mutations without confirmation.",
      },
      {
        label: "project",
        value: "Explore partitioning and observability for agent conversation data.",
        description:
          "Tracks the database project scope so the agent can reference current goals.",
      },
    ],
    tools: ["web_search"],
    model: "openai/gpt-4.1",
    embedding: "openai/text-embedding-3-small",
  });

  console.log(`Agent created: ${agent.id}`);

  const response = await client.agents.messages.create(agent.id, {
    messages: [
      {
        role: "user",
        content: "Give me a 2-step plan to start partitioning a conversations table.",
      },
    ],
  });

  const assistantReply = response.messages.find(
    (msg) => msg.message_type === "assistant_message"
  );

  console.log("Assistant response:");
  console.log(assistantReply?.content ?? "(no assistant content)");
}

main().catch((err) => {
  console.error("Quickstart failed:", err);
  process.exitCode = 1;
});
