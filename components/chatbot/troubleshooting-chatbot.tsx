"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Bot, MessageSquareText, Wrench, X } from "lucide-react";

const OPEN_STORAGE_KEY = "bah_chat_open_v1";

const LazyTroubleshootingChatbotPanel = dynamic(
  () =>
    import("@/components/chatbot/troubleshooting-chatbot-panel").then(
      (module) => module.TroubleshootingChatbotPanel
    ),
  { ssr: false }
);

export function TroubleshootingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedOpenState = sessionStorage.getItem(OPEN_STORAGE_KEY);
    if (storedOpenState === "true") {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(OPEN_STORAGE_KEY, isOpen ? "true" : "false");
  }, [isOpen]);

  return (
    <div className="fixed bottom-20 right-4 z-50 sm:bottom-6 sm:right-6">
      {isOpen ? <LazyTroubleshootingChatbotPanel onClose={() => setIsOpen(false)} /> : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="cta-primary rounded-full px-4 py-3 shadow-soft"
        aria-label={isOpen ? "Close troubleshooting chatbot" : "Open troubleshooting chatbot"}
      >
        {isOpen ? (
          <X aria-hidden="true" className="mr-2 h-4 w-4" />
        ) : (
          <MessageSquareText aria-hidden="true" className="mr-2 h-4 w-4" />
        )}
        Troubleshooting Help
      </button>

      {!isOpen ? (
        <p className="mt-2 flex items-center justify-end gap-1 text-xs text-slate-600">
          <Bot aria-hidden="true" className="h-3.5 w-3.5" />
          AI assistant
          <Wrench aria-hidden="true" className="h-3.5 w-3.5" />
        </p>
      ) : null}
    </div>
  );
}
