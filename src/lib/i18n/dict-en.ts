import type { TranslationDict } from "./types";

export const en: TranslationDict = {
  common: {
    language: "English",
    languageShort: "EN",
  },
  header: {
    nav: {
      problem: "Problem",
      solution: "Solution",
      howItWorks: "How",
      philosophy: "Philosophy",
    },
    cta: "Get started",
  },
  hero: {
    badge: "Schedules you can forget",
    title: "Forget your schedule.\nWe’ll remember it.",
    subtitle:
      "Stop wasting time staring at your calendar.\nForGetee pings you exactly when it matters.",
  },
  problem: {
    eyebrow: "Problem",
    titleDesktop: "Are you still opening\nthe calendar yourself?",
    titleMobile: "Adding events is easy.\nChecking them — not so much.",
    items: {
      a: {
        title: "You added it",
        body: "But you still forget — adding doesn’t mean remembering.",
      },
      b: {
        title: "The alert went off",
        body: "And you swiped it away. Another appointment missed.",
      },
      c: {
        title: "Just to check",
        body: "Open the app, find the date, scroll around… too much friction.",
      },
    },
  },
  solution: {
    eyebrow: "Solution",
    title: "ForGetee is different.",
    subtitle: "We notify you at the right moment — no checking required.",
    items: {
      a: {
        title: "Add in one sentence.",
        body: "Just type or speak. AI handles the rest —\ndate, time, and location, automatically.",
      },
      b: {
        title: "AI picks the timing.",
        body: "Event type, importance, travel time —\nall factored in for the perfect reminder.",
      },
      c: {
        title: "We can call you.",
        body: "For the events that really matter,\nForGetee calls so you can’t miss it.",
      },
    },
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "Three steps. That’s all.",
    steps: {
      one: {
        title: "Say it",
        body: "Natural language is enough. No forms.",
      },
      two: {
        title: "Forget it",
        body: "AI works out the timing. You don’t need to think about it.",
      },
      three: {
        title: "Get reminded",
        body: "At the right moment, in the right way.",
      },
    },
  },
  philosophy: {
    lineOne: "Memory to AI,",
    lineTwo: "space to you",
    taglineSub: "We take care of everything for you.",
  },
  cta: {
    title: "Hand off the schedule.\nKeep the moment.",
    subtitle: "Start a calmer day with ForGetee.",
  },
  footer: {
    tagline: "Memory to AI,\nspace to you.",
    sections: {
      service: "Service",
      help: "Help",
      contact: "Contact",
    },
    links: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      calendarSync: "Calendar Sync Guide",
    },
    copyright: "© 2026 ForGetee. All rights reserved.",
  },
  serviceModal: {
    title: "Coming soon",
    body: "The {platform} version of ForGetee\nis still being prepared.",
    subbody: "Thanks for your patience.",
    confirm: "OK",
    closeAria: "Close",
  },
  help: {
    title: "Help",
    subtitle: "Guides for getting the most out of ForGetee.",
    intro:
      "ForGetee shows your existing Google / Apple Calendar events alongside ForGetee schedules so you don’t need to switch between apps. External calendar sync is optional — you can use every ForGetee feature without enabling it.",
    google: {
      title: "Connect Google Calendar",
      step1: "Open the Settings screen in the ForGetee app.",
      step2: "Toggle on \"Google Calendar Sync.\"",
      step3: "Choose the Google account you want to use.",
      step4: "Tap \"Allow\" on the consent screen.",
      step5: "Your Google events now appear on the main calendar view.",
    },
    apple: {
      title: "Connect Apple Calendar",
      step1: "Open the Settings screen in the ForGetee app.",
      step2: "Toggle on \"Apple Calendar Sync.\"",
      step3: "Choose \"Allow Full Access\" in the iOS permission dialog.",
      step4:
        "Your iCloud / subscribed calendar events appear on the main calendar view.",
    },
    dataUsage: {
      title: "How we use your data",
      summary:
        "ForGetee uses read-only access to your external calendars. We never add, edit, or delete events in your calendar.",
      scopeLabel: "Google OAuth Scope",
      scopeValue: "calendar.readonly (read-only)",
      dataLabel: "Data we read",
      dataValue: "Event title · start/end time · location · description",
      purposeLabel: "Purpose",
      purposeValue:
        "Display your events on the ForGetee main calendar + use as context for smarter reminder timing",
      storageLabel: "Storage",
      storageValue:
        "Used on your device. The server caches only event IDs and metadata — never the event body",
      thirdLabel: "Third-party sharing",
      thirdValue: "None",
      retentionLabel: "Retention",
      retentionValue: "Until you disconnect calendar sync",
    },
    disconnect: {
      title: "Disconnect calendar sync",
      body: "Toggle the calendar sync off in Settings. The connection ends immediately and all cached event data is deleted.",
    },
    contact: {
      label: "More questions",
      body: "If you have additional questions about calendar sync or data usage, please reach out at contact@forget.app or kimkeonhwi991231@gmail.com.",
    },
    backToHome: "Back to home",
  },
};
