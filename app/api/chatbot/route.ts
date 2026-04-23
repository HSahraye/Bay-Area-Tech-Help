import OpenAI from "openai";
import { NextResponse } from "next/server";
import { CHATBOT_ACTION_KEYS, CHATBOT_SYSTEM_PROMPT, type ChatbotActionKey } from "@/lib/chatbot-prompt";

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatbotResponsePayload = {
  reply: string;
  suggestedActions: ChatbotActionKey[];
  shouldCollectLead: boolean;
};

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  return openaiClient;
}

const DEFAULT_CHATBOT_RESPONSE: ChatbotResponsePayload = {
  reply:
    "I can still help. Please share what device you are using and the exact error message you see, and I will suggest the next best step.",
  suggestedActions: ["text_fast_reply"],
  shouldCollectLead: false
};

const SERVICE_FALLBACK_RESPONSE: ChatbotResponsePayload = {
  reply:
    "Our assistant is temporarily unavailable. For the fastest help, please book your service now or call/text us and we can guide next steps.",
  suggestedActions: ["book_quick_fix", "book_home_tech_setup", "call_now", "text_fast_reply"],
  shouldCollectLead: true
};

function sanitizeMessages(messages: unknown): ClientMessage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message): message is ClientMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const possibleRole = (message as ClientMessage).role;
      const possibleContent = (message as ClientMessage).content;

      return (
        (possibleRole === "user" || possibleRole === "assistant") &&
        typeof possibleContent === "string" &&
        possibleContent.trim().length > 0
      );
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 2000)
    }));
}

function parseModelResponse(content: string | null | undefined): ChatbotResponsePayload {
  if (!content) {
    return DEFAULT_CHATBOT_RESPONSE;
  }

  try {
    const parsed = JSON.parse(content) as Partial<ChatbotResponsePayload>;
    const suggestedActions = Array.isArray(parsed.suggestedActions)
      ? parsed.suggestedActions.filter((item): item is ChatbotActionKey =>
          CHATBOT_ACTION_KEYS.includes(item as ChatbotActionKey)
        )
      : [];

    return {
      reply:
        typeof parsed.reply === "string" && parsed.reply.trim().length > 0
          ? parsed.reply.trim()
          : DEFAULT_CHATBOT_RESPONSE.reply,
      suggestedActions,
      shouldCollectLead: Boolean(parsed.shouldCollectLead)
    };
  } catch {
    return {
      ...DEFAULT_CHATBOT_RESPONSE,
      reply: content
    };
  }
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(SERVICE_FALLBACK_RESPONSE);
  }

  try {
    const body = (await request.json()) as { messages?: unknown };
    const sanitizedMessages = sanitizeMessages(body.messages);

    if (!sanitizedMessages.length) {
      return NextResponse.json(
        {
          error: "At least one user message is required."
        },
        { status: 400 }
      );
    }

    const model = process.env.OPENAI_CHAT_MODEL ?? "gpt-4.1-mini";

    const completion = await getOpenAIClient().chat.completions.create({
      model,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: CHATBOT_SYSTEM_PROMPT
        },
        ...sanitizedMessages
      ]
    });

    const assistantContent = completion.choices[0]?.message?.content;
    const parsedPayload = parseModelResponse(assistantContent);

    return NextResponse.json(parsedPayload);
  } catch (error) {
    console.error("Chatbot route error", error);
    return NextResponse.json(SERVICE_FALLBACK_RESPONSE);
  }
}
