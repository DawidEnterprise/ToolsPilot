import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { CATEGORIES } from "@/lib/types";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-brand-600">
              <img src="/favicon-32.png" alt="" width={24} height={24} className="rounded" />
              {siteConfig.name}
            </Link>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Free online tools for developers, designers &amp; marketers.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Categories</h3>
            <ul className="mt-3 space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.id}`}
                    className="text-sm text-gray-500 hover:text-brand-600 transition-colors dark:text-gray-400 dark:hover:text-brand-400"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Popular Tools</h3>
            <ul className="mt-3 space-y-2">
              {["json-formatter", "png-to-jpg", "word-counter", "base64-encoder", "password-generator", "uuid-generator"].map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/tools/${slug}`}
                    className="text-sm text-gray-500 hover:text-brand-600 transition-colors capitalize dark:text-gray-400 dark:hover:text-brand-400"
                  >
                    {slug.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-brand-600 transition-colors dark:text-gray-400 dark:hover:text-brand-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-brand-600 transition-colors dark:text-gray-400 dark:hover:text-brand-400">Terms of Service</Link></li>
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-brand-600 transition-colors dark:text-gray-400 dark:hover:text-brand-400">About</Link></li>
              <li><Link href="/roadmap" className="text-sm text-gray-500 hover:text-brand-600 transition-colors dark:text-gray-400 dark:hover:text-brand-400">Roadmap</Link></li>
              <li><Link href="/tools-list" className="text-sm text-gray-500 hover:text-brand-600 transition-colors dark:text-gray-400 dark:hover:text-brand-400">All Tools</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400 dark:border-gray-700 dark:text-gray-500">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
