"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface FeedItem {
  title: string;
  link: string;
  date: Date;
  src: string;
}

/* ---------- RSS CONFIG ---------- */
const FEEDS = [
  "https://www.wiz.io/api/feed/cloud-threat-landscape/rss.xml",
  "https://feeds.feedburner.com/TheHackersNews",
  "https://www.bleepingcomputer.com/feed/",
];

// Cloudflare Worker proxy
const proxify = (url: string) =>
  `https://threatintelfeed.khush23.workers.dev/?url=${encodeURIComponent(url)}`;

export default function ThreatFeedTicker() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const tickerInnerRef = useRef<HTMLDivElement>(null);

  async function getItems(): Promise<FeedItem[]> {
    const parser = new DOMParser();
    const allItems: FeedItem[] = [];

    await Promise.all(
      FEEDS.map(async (feed) => {
        try {
          const xmlText = await fetch(proxify(feed)).then((r) => r.text());
          const xml = parser.parseFromString(xmlText, "text/xml");
          const feedItems = [...xml.querySelectorAll("item")].slice(0, 15);

          feedItems.forEach((it) => {
            const title = it.querySelector("title")?.textContent?.trim();
            if (title) {
              allItems.push({
                title: title,
                link: it.querySelector("link")?.textContent?.trim() || "#",
                date: new Date(it.querySelector("pubDate")?.textContent || Date.now()),
                src: new URL(feed).hostname.replace(/^www\./, ""),
              });
            }
          });
        } catch (e) {
          console.error("Feed error:", feed, e);
        }
      })
    );

    /* dedupe + newest first */
    const uniq: { [key: string]: FeedItem } = {};
    allItems.forEach((i) => (uniq[i.title] = i));
    return Object.values(uniq)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 50);
  }

  const renderTicker = async () => {
    setLoading(true);
    try {
      const fetchedItems = await getItems();
      setItems(fetchedItems);

      // Restart animation
      const inner = tickerInnerRef.current;
      if (inner) {
        inner.style.animation = "none";
        void inner.offsetWidth; // Trigger reflow
        inner.style.animation = "";
      }
    } catch (error) {
      console.error("Failed to render ticker:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    renderTicker();
    const interval = setInterval(renderTicker, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  const renderColumn = (items: FeedItem[]) =>
    items.map((item, index) => (
      <div
        key={index}
        className="py-3 px-4 border-b border-secondary/20 transition-colors hover:bg-primary/10"
      >
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block"
        >
          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
            {item.title}
          </p>
          <p className="text-xs text-muted-foreground group-hover:text-primary/80">
            {item.src} &middot; {item.date.toLocaleDateString()}
          </p>
        </a>
      </div>
    ));

  return (
    <div id="tickerBox" className="w-full max-w-4xl rounded-lg bg-card/50 border border-secondary shadow-lg backdrop-blur-sm">
      {loading && items.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground p-8">Loading threat intelligence feed...</p>
        </div>
      ) : (
        <div id="tickerInner" ref={tickerInnerRef}>
          {renderColumn(items)}
          {renderColumn(items)}
        </div>
      )}
    </div>
  );
}
