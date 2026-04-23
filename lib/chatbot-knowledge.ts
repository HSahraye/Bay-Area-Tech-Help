export type TroubleshootingTopic = {
  id: string;
  title: string;
  symptoms: string[];
  firstSteps: string[];
  escalationSignals: string[];
  recommendedPackage: "quick-fix" | "home-tech-setup" | "vip-home-tech-day";
};

export const TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = [
  {
    id: "wifi-disconnects",
    title: "Wi-Fi keeps disconnecting",
    symptoms: ["Intermittent drops", "Video calls freeze", "Smart devices go offline"],
    firstSteps: [
      "Restart modem and router; wait 2-3 minutes before retesting.",
      "Test one device close to the router to separate signal problems from account/device problems.",
      "Move router to an open, central location away from metal cabinets and microwaves.",
      "Split 2.4GHz and 5GHz SSIDs when possible and reconnect devices intentionally."
    ],
    escalationSignals: [
      "Drops continue on multiple devices after reboot and placement checks.",
      "Slow speeds or disconnects happen only in certain rooms.",
      "ISP modem/router logs show recurring connection resets."
    ],
    recommendedPackage: "home-tech-setup"
  },
  {
    id: "printer-offline",
    title: "Printer shows offline",
    symptoms: ["Printer appears offline in Windows/macOS", "Jobs stuck in queue"],
    firstSteps: [
      "Confirm printer and computer are on the same Wi-Fi network.",
      "Power-cycle printer and clear stuck print jobs.",
      "Remove and re-add the printer using the manufacturer driver/tool.",
      "Set the printer as default and disable 'Use Printer Offline' mode."
    ],
    escalationSignals: [
      "Printer drops offline repeatedly after reconnecting.",
      "Multiple users/devices cannot print reliably.",
      "Driver mismatch or firmware issues remain unresolved."
    ],
    recommendedPackage: "quick-fix"
  },
  {
    id: "tv-hdmi-input",
    title: "TV and receiver are not working together",
    symptoms: ["No signal", "Wrong input", "Audio with no video"],
    firstSteps: [
      "Verify TV input source and receiver input/output mapping.",
      "Reseat HDMI cables and test with a known-good cable/port.",
      "Power devices off fully for 60 seconds and restart in order: TV, receiver, source device.",
      "Disable/enable HDMI-CEC based on behavior conflicts."
    ],
    escalationSignals: [
      "Intermittent failures across multiple HDMI sources.",
      "Complex setup with soundbar, receiver, and multiple streaming devices.",
      "Needs full input remap and universal remote optimization."
    ],
    recommendedPackage: "home-tech-setup"
  },
  {
    id: "chromecast-setup",
    title: "Chromecast will not connect",
    symptoms: ["Device not found in Google Home", "Setup fails at Wi-Fi step"],
    firstSteps: [
      "Confirm phone and Chromecast are on the same network during setup.",
      "Reboot Chromecast and router, then retry setup in Google Home.",
      "Temporarily disable VPN/private relay and retry.",
      "Factory reset Chromecast if setup repeatedly fails."
    ],
    escalationSignals: [
      "Multiple TVs/devices fail to discover Chromecast.",
      "Network isolation or router settings block casting.",
      "Requires broader home network cleanup."
    ],
    recommendedPackage: "home-tech-setup"
  },
  {
    id: "google-home-nest",
    title: "Google Home/Nest devices keep reconnecting",
    symptoms: ["Speaker/doorbell offline", "Automations fail", "Frequent reconnect prompts"],
    firstSteps: [
      "Verify stable Wi-Fi signal at each device location.",
      "Update Google Home app and device firmware.",
      "Reboot affected device and router.",
      "Check that 2.4GHz support is available for older smart devices."
    ],
    escalationSignals: [
      "Multiple smart devices fail after router changes.",
      "Device groups/routines break after partial reconnect.",
      "Needs full smart-home network review."
    ],
    recommendedPackage: "home-tech-setup"
  },
  {
    id: "smart-speaker-doorbell",
    title: "Smart speaker/doorbell announcements are not working",
    symptoms: ["No chime announcements", "Delayed alerts", "Wrong room announcements"],
    firstSteps: [
      "Check app notification permissions and speaker volume settings.",
      "Confirm doorbell and speakers are in the same home/group in the app.",
      "Re-link service integrations and test with a single announcement rule.",
      "Restart doorbell hub/speaker devices."
    ],
    escalationSignals: [
      "Cross-room routing issues persist after regrouping.",
      "Multiple automations/routines conflict.",
      "Needs multi-device configuration and cleanup."
    ],
    recommendedPackage: "home-tech-setup"
  },
  {
    id: "slow-computer",
    title: "Computer is slow",
    symptoms: ["Long boot times", "Apps freeze", "Browser lag"],
    firstSteps: [
      "Restart and close unnecessary startup apps.",
      "Ensure at least 15-20% free disk space.",
      "Run OS updates and browser updates.",
      "Check browser extensions and disable suspicious or heavy add-ons."
    ],
    escalationSignals: [
      "Frequent crashing, overheating, or disk warnings.",
      "Slow performance remains after cleanup and updates.",
      "Needs deeper tuning, backups, and device organization."
    ],
    recommendedPackage: "quick-fix"
  },
  {
    id: "app-account-login",
    title: "App/account login issues",
    symptoms: ["Password accepted then rejected", "MFA loop", "Account lockouts"],
    firstSteps: [
      "Verify correct username/email and keyboard layout.",
      "Use official password reset and account recovery pages only.",
      "Check device time/date settings and browser cache/cookies.",
      "Try login in private mode or official app."
    ],
    escalationSignals: [
      "Account recovery requires provider identity verification.",
      "Multiple accounts/devices are affected.",
      "Need help securing account settings across devices."
    ],
    recommendedPackage: "quick-fix"
  },
  {
    id: "router-placement",
    title: "Router restart and placement basics",
    symptoms: ["Weak Wi-Fi in certain rooms", "Dead zones", "IoT devices unstable"],
    firstSteps: [
      "Place router elevated in an open central area.",
      "Keep router away from thick walls, metal objects, and microwaves.",
      "Reboot networking gear monthly or when performance drops.",
      "Consider mesh/AP expansion for larger or multi-floor homes."
    ],
    escalationSignals: [
      "Coverage gaps persist after placement and reboot.",
      "Large home with many smart devices needs design planning.",
      "Requires structured network optimization."
    ],
    recommendedPackage: "home-tech-setup"
  },
  {
    id: "escalation-guidance",
    title: "When to escalate to paid service",
    symptoms: ["Repeated unresolved failures", "Multi-device impact", "Urgent productivity loss"],
    firstSteps: [
      "Document what was already tried and what error messages appear.",
      "Identify whether this is one issue or multiple systems.",
      "Decide if remote guidance is enough or in-home support is needed."
    ],
    escalationSignals: [
      "Issue affects work/school reliability or multiple household members.",
      "Setup spans Wi-Fi, printers, TVs, and smart home devices.",
      "Needs hands-on diagnosis across several systems."
    ],
    recommendedPackage: "vip-home-tech-day"
  }
];

export function formatKnowledgeBaseForPrompt(): string {
  return TROUBLESHOOTING_TOPICS.map((topic) => {
    return [
      `Topic: ${topic.title}`,
      `Symptoms: ${topic.symptoms.join("; ")}`,
      `First steps: ${topic.firstSteps.join(" | ")}`,
      `Escalation signals: ${topic.escalationSignals.join(" | ")}`,
      `Default package: ${topic.recommendedPackage}`
    ].join("\n");
  }).join("\n\n");
}
