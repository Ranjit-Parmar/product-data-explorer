import { DataSource } from 'typeorm';
import { Navigation } from './navigation/navigation.entity';
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { ProductDetail } from './product-detail/product-detail.entity';
import { Review } from './review/review.entity';
import { ScrapeJob } from './scrape-job/scrape-job.entity';
import { ViewHistory } from './view-history/view-history.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Navigation, Category, Product, ProductDetail, Review, ScrapeJob, ViewHistory],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('Connected to Postgres');

  const navRepo = AppDataSource.getRepository(Navigation);
  const catRepo = AppDataSource.getRepository(Category);
  const prodRepo = AppDataSource.getRepository(Product);
  const detailRepo = AppDataSource.getRepository(ProductDetail);
  const reviewRepo = AppDataSource.getRepository(Review);

  // Navigation
  const nav = navRepo.create({ title: 'Books', slug: 'books' });
  await navRepo.save(nav);

  // Category
  const cat = catRepo.create({ title: 'Children', slug: 'children', navigation: nav, navigationId: nav.id });
  await catRepo.save(cat);

  // Product
  const product = prodRepo.create({
  title: 'Harry Potter',
  sourceId: 'HP1',
  price: 5.99,
  currency: 'GBP',
  category: cat,
  categoryId: cat.id,
  imageUrl: 'https://via.placeholder.com/150',
  sourceUrl: 'https://www.worldofbooks.com/harry-potter',
  lastScrapedAt: new Date(),
});
await prodRepo.save(product);


  // Product Detail
  const detail = detailRepo.create({
    productId: product.id,
    description: 'A magical adventure book for children.',
    specs: { ISBN: '1234567890', publisher: 'Bloomsbury' },
    ratingsAvg: 4.8,
    reviewsCount: 2,
  });
  await detailRepo.save(detail);

  // Reviews
  const review1 = reviewRepo.create({ productId: product.id, author: 'Alice', rating: 5, text: 'Amazing book!' });
  const review2 = reviewRepo.create({ productId: product.id, author: 'Bob', rating: 4, text: 'Really enjoyed it.' });
  await reviewRepo.save([review1, review2]);

  console.log('Seed completed!');
  process.exit(0);
}

seed();
