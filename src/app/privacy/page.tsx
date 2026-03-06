import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. Learn how we handle your data.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated: March 2026</p>

      <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
        <h2>Overview</h2>
        <p>
          {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy.
          All of our tools run entirely in your browser — we do not upload, store, or process your data on any server.
        </p>

        <h2>Data We Collect</h2>
        <h3>Data You Provide</h3>
        <p>
          When you use our tools, all input (text, images, files) is processed locally in your browser using
          JavaScript and Web APIs. <strong>None of this data is sent to our servers or any third party.</strong>
        </p>

        <h3>Automatically Collected Data</h3>
        <p>We may collect anonymous usage data through:</p>
        <ul>
          <li><strong>Google Analytics</strong> — page views, device type, browser, country (no personally identifiable information)</li>
          <li><strong>Azure Application Insights</strong> — performance metrics and error tracking</li>
        </ul>
        <p>This data helps us understand which tools are popular and improve the service.</p>

        <h2>Advertising</h2>
        <p>
          We display advertisements through <strong>Google AdSense</strong> and potentially other ad networks.
          These services may use cookies and similar technologies to serve ads based on your interests.
          You can opt out of personalized advertising at{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
        </p>

        <h2>Cookies</h2>
        <p>We use the following types of cookies:</p>
        <ul>
          <li><strong>Essential</strong> — theme preference (light/dark mode), stored in localStorage</li>
          <li><strong>Analytics</strong> — Google Analytics cookies to track anonymous usage</li>
          <li><strong>Advertising</strong> — Third-party cookies from Google AdSense for ad targeting</li>
        </ul>

        <h2>Third-Party Services</h2>
        <ul>
          <li>Google AdSense — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          <li>Google Analytics — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          <li>Microsoft Azure — <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Privacy Statement</a></li>
        </ul>

        <h2>Your Rights</h2>
        <p>
          Since we don&apos;t collect personal data through our tools, there is typically no personal data to access, modify, or delete.
          For analytics opt-out, use your browser&apos;s Do Not Track setting or install the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our service is not directed to children under 13. We do not knowingly collect personal information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <strong>privacy@{siteConfig.url.replace("https://", "")}</strong>.
        </p>
      </div>
    </div>
  );
}
