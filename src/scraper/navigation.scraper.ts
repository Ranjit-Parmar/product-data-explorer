import { PlaywrightCrawler } from 'crawlee';

export async function scrapeNavigation() {
  const results: { title: string; slug: string }[] = [];

  const crawler = new PlaywrightCrawler({
    maxRequestsPerMinute: 30,

    async requestHandler({ page }) {
      await page.goto('https://www.worldofbooks.com');

      // Example selector – adjust after inspecting site
      const navItems = await page.$$('[data-testid="navigation-item"]');

      for (const item of navItems) {
        const title = await item.innerText();
        const href = await item.getAttribute('href');

        if (href) {
          results.push({
            title: title.trim(),
            slug: href.split('/').pop()!,
          });
        }
      }
    },
  });

  await crawler.run([{ url: 'https://www.worldofbooks.com' }]);

  return results;
}
