import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — free, private, browser-based tools for developers, designers and marketers.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
          About {siteConfig.name}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Free, fast, and private tools that run entirely in your browser.
        </p>
      </div>

      {/* Values grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { icon: "🔒", title: "100% Private", desc: "Your data never leaves your browser. No uploads, no server processing, no tracking." },
          { icon: "⚡", title: "Instant & Free", desc: "Every tool loads instantly and costs nothing. No sign-ups, no paywalls, no limits." },
          { icon: "🌍", title: "Open to Everyone", desc: "Works on any device with a modern browser. Desktop, tablet, or mobile." },
        ].map((v) => (
          <div key={v.title} className="rounded-xl border border-gray-200/80 bg-white p-6 text-center shadow-sm dark:border-gray-700/60 dark:bg-gray-900">
            <div className="text-3xl">{v.icon}</div>
            <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">{v.title}</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
          </div>
        ))}
      </div>

      <AdSlot position="in-content" className="mt-8" />

      {/* Content */}
      <div className="prose prose-gray mx-auto mt-12 max-w-none dark:prose-invert">
        <h2>Our Mission</h2>
        <p>
          We believe essential utilities should be free, fast, and private. Whether you need
          to format JSON, convert an image, generate a password, or count words — {siteConfig.name} is
          the one-stop destination that respects your time and your data.
        </p>

        <h2>How It Works</h2>
        <p>
          Every tool on {siteConfig.name} processes your data client-side using modern browser APIs
          like the Canvas API, Web Crypto, and the File API. Nothing is uploaded to any server.
          Your files and text stay on your device at all times.
        </p>

        <h2>Built With</h2>
        <ul>
          <li><strong>Next.js</strong> — React framework for blazing-fast static pages</li>
          <li><strong>Tailwind CSS</strong> — Clean, responsive design that works everywhere</li>
          <li><strong>Azure Static Web Apps</strong> — Global CDN for instant load times</li>
          <li><strong>TypeScript</strong> — Type-safe code for reliability</li>
        </ul>

        <h2>Contact</h2>
        <p>
          Have feedback, a bug report, or a tool request? We&apos;d love to hear from you.
        </p>
        <p>
          Email us at{" "}
          <a href="mailto:hello@toolspilot.dev">hello@toolspilot.dev</a>
        </p>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link href="/tools" className="btn-primary text-base px-8 py-3">
          Browse All Tools
        </Link>
      </div>
    </div>
  );
}
