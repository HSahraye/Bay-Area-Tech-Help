"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, Send, X } from "lucide-react";
import type { ChatbotActionKey } from "@/lib/chatbot-prompt";
import { CONTACT_LINKS } from "@/lib/site-data";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  actions?: ChatbotActionKey[];
  shouldCollectLead?: boolean;
};

type AssistantResponse = {
  reply: string;
  suggestedActions: ChatbotActionKey[];
  shouldCollectLead: boolean;
};

type TroubleshootingChatbotPanelProps = {
  onClose: () => void;
};

const CHAT_STORAGE_KEY = "bah_chat_messages_v1";

const STARTER_PROMPTS = [
  "My Wi-Fi keeps disconnecting",
  "My printer says offline",
  "Chromecast won't connect",
  "What package should I book?",
  "My TV and receiver aren't working together"
] as const;

const INITIAL_ASSISTANT_MESSAGE: ChatMessage = {
  id: "welcome-message",
  role: "assistant",
  content:
    "Hi, I am the Bay Area Tech Help Assistant. I can guide basic troubleshooting and recommend the best package if hands-on help is needed."
};

const ACTION_BUTTONS: Record<ChatbotActionKey, { label: string; href: string; external?: boolean }> = {
  book_quick_fix: { label: "Book Quick Fix", href: "/book?service=quick-fix" },
  book_home_tech_setup: { label: "Book Home Tech Setup", href: "/book?service=home-tech-setup" },
  book_vip_home_tech_day: { label: "Book VIP Home Tech Day", href: "/book?service=vip-home-tech-day" },
  call_now: { label: "Call Now", href: CONTACT_LINKS.call, external: true },
  text_fast_reply: { label: "Text for Fast Reply", href: CONTACT_LINKS.text, external: true }
};

export function TroubleshootingChatbotPanel({ onClose }: TroubleshootingChatbotPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_ASSISTANT_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadIssueSummary, setLeadIssueSummary] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const shouldShowLeadForm = useMemo(
    () => messages.some((message) => message.shouldCollectLead) && !leadSubmitted,
    [leadSubmitted, messages]
  );

  useEffect(() => {
    const storedMessages = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (!storedMessages) {
      return;
    }

    try {
      const parsed = JSON.parse(storedMessages) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch {
      setMessages([INITIAL_ASSISTANT_MESSAGE]);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-20)));
  }, [messages]);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isSending]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function addUserMessage(content: string) {
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: "user",
        content
      }
    ]);
  }

  function addAssistantMessage(payload: AssistantResponse) {
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: payload.reply,
        actions: payload.suggestedActions,
        shouldCollectLead: payload.shouldCollectLead
      }
    ]);
  }

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isSending) {
      return;
    }

    setErrorMessage(null);
    addUserMessage(trimmed);
    setInput("");
    setIsSending(true);

    try {
      const conversationForApi = [...messages, { role: "user" as const, content: trimmed }]
        .slice(-12)
        .map((message) => ({
          role: message.role,
          content: message.content
        }));

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: conversationForApi
        })
      });

      if (!response.ok) {
        throw new Error("Chat API request failed");
      }

      const payload = (await response.json()) as AssistantResponse;
      addAssistantMessage(payload);
    } catch {
      setErrorMessage("Sorry, I could not reach the assistant right now. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!leadName.trim() || !leadContact.trim() || !leadIssueSummary.trim()) {
      return;
    }

    setLeadSubmitted(true);
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Thank you. We captured your details for follow-up. For fastest support, book online now or call/text us directly."
      }
    ]);
  }

  function renderActionButton(action: ChatbotActionKey) {
    const actionInfo = ACTION_BUTTONS[action];
    if (!actionInfo) {
      return null;
    }

    if (actionInfo.external) {
      return (
        <a key={action} className="cta-secondary px-3 py-2 text-xs" href={actionInfo.href}>
          {actionInfo.label}
        </a>
      );
    }

    return (
      <Link key={action} className="cta-secondary px-3 py-2 text-xs" href={actionInfo.href}>
        {actionInfo.label}
      </Link>
    );
  }

  return (
    <section
      aria-label="Troubleshooting Help Chat"
      className="mb-3 flex w-[min(92vw,390px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
    >
      <header className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
        <div>
          <p className="text-sm font-semibold">Bay Area Tech Help Assistant</p>
          <p className="text-xs text-slate-200">Troubleshooting Help</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close chat panel"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </header>

      <div ref={scrollRef} className="max-h-[420px] space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
        <p className="rounded-xl border border-brand-100 bg-brand-50 px-3 py-2 text-xs text-brand-900">
          We may still recommend a booked service for hands-on issues.
        </p>

        {messages.map((message) => (
          <article
            key={message.id}
            className={`max-w-[92%] rounded-xl px-3 py-2 text-sm leading-6 ${
              message.role === "assistant"
                ? "mr-auto border border-slate-200 bg-white text-slate-700"
                : "ml-auto bg-brand-600 text-white"
            }`}
          >
            <p>{message.content}</p>
            {message.role === "assistant" && message.actions?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">{message.actions.map((action) => renderActionButton(action))}</div>
            ) : null}
          </article>
        ))}

        {isSending ? (
          <div className="mr-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            Assistant is thinking...
          </div>
        ) : null}

        {errorMessage ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{errorMessage}</p>
        ) : null}

        {shouldShowLeadForm ? (
          <form onSubmit={handleLeadSubmit} className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-sm font-semibold text-slate-900">Prefer human follow-up?</p>
            <p className="mt-1 text-xs text-slate-600">Share your details and issue summary.</p>
            <div className="mt-3 space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Name
                <input
                  value={leadName}
                  onChange={(event) => setLeadName(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  required
                />
              </label>
              <label className="block text-xs font-medium text-slate-700">
                Email or phone
                <input
                  value={leadContact}
                  onChange={(event) => setLeadContact(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  required
                />
              </label>
              <label className="block text-xs font-medium text-slate-700">
                Brief issue summary
                <textarea
                  value={leadIssueSummary}
                  onChange={(event) => setLeadIssueSummary(event.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  rows={3}
                  required
                />
              </label>
            </div>
            <button type="submit" className="cta-primary mt-3 w-full py-2 text-xs">
              Save Details
            </button>
          </form>
        ) : null}
      </div>

      <div className="border-t border-slate-200 bg-white p-3">
        <div className="mb-2 flex flex-wrap gap-2">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void sendMessage(prompt)}
              className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              {prompt}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe your issue..."
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            aria-label="Message Bay Area Tech Help assistant"
          />
          <button type="submit" className="cta-primary px-3 py-2" aria-label="Send message to assistant">
            <Send aria-hidden="true" className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
