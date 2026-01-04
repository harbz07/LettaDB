type Env = {
  lettaApiKey: string;
  lettaAgentId?: string;
  lettaBaseUrl?: string;
};

const requireEnv = (name: string, value?: string) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const env: Env = {
  lettaApiKey: requireEnv("LETTA_API_KEY", process.env.LETTA_API_KEY),
  lettaAgentId: process.env.LETTA_AGENT_ID,
  lettaBaseUrl: process.env.LETTA_BASE_URL,
};
