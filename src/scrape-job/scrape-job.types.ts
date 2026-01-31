export enum ScrapeTargetType {
  NAVIGATION = 'NAVIGATION',
  CATEGORY = 'CATEGORY',
  PRODUCT = 'PRODUCT',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  REVIEW = 'REVIEW',
}

export enum ScrapeJobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  DONE = 'DONE',
  FAILED = 'FAILED',
}

export interface ScraperJob<T = ScraperJobMeta> {
  meta?: T;
  targetUrl: string;
  targetType: ScrapeTargetType;
}



// ✅ Meta types for each target type
export interface NavigationScrapeJobMeta {
  // any additional info if needed
}

export interface CategoryScrapeJobMeta {
  navigationId: number;
}

export interface ProductScrapeJobMeta {
  navigationId: number;
  categorySlug: string;
}

export interface ProductDetailScrapeJobMeta {
  productSlug: string;
}

export interface ReviewScrapeJobMeta {
  productSlug: string;
}

export type ScraperJobMeta =
  | NavigationScrapeJobMeta
  | CategoryScrapeJobMeta
  | ProductScrapeJobMeta
  | ProductDetailScrapeJobMeta
  | ReviewScrapeJobMeta;

