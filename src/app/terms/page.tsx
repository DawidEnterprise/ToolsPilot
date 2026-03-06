import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated: March 2026</p>

      <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using {siteConfig.name} (&quot;the Service&quot;), you agree to be bound by these
          Terms of Service. If you do not agree, please do not use the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          {siteConfig.name} provides free, browser-based utility tools including image converters,
          text formatters, developer tools, and more. All tools run locally in your browser —
          no data is uploaded to our servers unless explicitly stated.
        </p>

        <h2>3. Use of the Service</h2>
        <p>You agree to use the Service only for lawful purposes. You may not:</p>
        <ul>
          <li>Use the Service to process illegal, harmful, or infringing content</li>
          <li>Attempt to bypass, disable, or interfere with the Service&apos;s security features</li>
          <li>Use automated systems (bots, scrapers) to access the Service at scale</li>
          <li>Redistribute or resell access to the Service</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          The Service, including its design, code, and content, is owned by {siteConfig.name} and protected
          by copyright and other intellectual property laws. You retain all rights to any content you process
          using our tools.
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
          either express or implied. We do not guarantee the accuracy, completeness, or reliability of any
          tool output. Always verify results for critical use cases.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, {siteConfig.name} shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages arising from your use of the Service.
        </p>

        <h2>7. Advertising</h2>
        <p>
          The Service is supported by advertising. By using the Service, you acknowledge that ads will be
          displayed. We use third-party advertising networks including Google AdSense.
        </p>

        <h2>8. Privacy</h2>
        <p>
          Your use of the Service is also governed by our{" "}
          <a href="/privacy">Privacy Policy</a>, which is incorporated by reference.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Continued use of the Service after
          changes constitutes acceptance of the updated Terms.
        </p>

        <h2>10. Contact</h2>
        <p>
          If you have questions about these Terms, contact us at{" "}
          <strong>legal@{siteConfig.url.replace("https://", "")}</strong>.
        </p>
      </div>
    </div>
  );
}
