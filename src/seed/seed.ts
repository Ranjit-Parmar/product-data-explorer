import { Category } from '../category/category.entity';
import { Navigation } from '../navigation/navigation.entity';
import { DataSource } from 'typeorm';
import { Product } from '../product/product.entity';
import { ProductDetail } from '../product-detail/product-detail.entity';
import { Review } from '../review/review.entity';
import { ScrapeJob } from '../scrape-job/scrape-job.entity';
import { ViewHistory } from '../view-history/view-history.entity';

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

  // ✅ Check if Navigation already exists
  const existingNav = await navRepo.findOne({ where: { slug: 'books' } });
  if (existingNav) {
    console.log('Database already seeded, skipping.');
    process.exit(0);
  }

  // ---------------------------
  // 1️⃣ Navigation
  // ---------------------------
  const booksNav = navRepo.create({ title: 'Books', slug: 'books', lastScrapedAt: new Date(), });
  await navRepo.save(booksNav);

  // ---------------------------
  // 2️⃣ Categories
  // ---------------------------
  const childrenCat = catRepo.create({ title: 'Children', slug: 'children', navigation: { id: booksNav.id } });
  const fictionCat = catRepo.create({ title: 'Fiction', slug: 'fiction', navigation: { id: booksNav.id } });
  await catRepo.save([childrenCat, fictionCat]);

  // ---------------------------
  // 3️⃣ Products
  // ---------------------------
  const harryPotter = prodRepo.create({
    title: 'Harry Potter',
    sourceId: 'HP1',
    price: 5.99,
    currency: 'GBP',
    category: { id: childrenCat.id },
    imageUrl: 'https://via.placeholder.com/150',
    sourceUrl: 'https://www.worldofbooks.com/harry-potter',
    lastScrapedAt: new Date(),
  });

  const lotr = prodRepo.create({
    title: 'Lord of the Rings',
    sourceId: 'LOTR1',
    price: 7.99,
    currency: 'GBP',
    category: { id: fictionCat.id },
    imageUrl: 'https://via.placeholder.com/150',
    sourceUrl: 'https://www.worldofbooks.com/lotr',
    lastScrapedAt: new Date(),
  });

  await prodRepo.save([harryPotter, lotr]);

  // ---------------------------
  // 4️⃣ Product Details
  // ---------------------------
  const harryPotterDetail = detailRepo.create({
    product: { id: harryPotter.id },
    description: 'A magical adventure book for children.',
    specs: { ISBN: '1234567890', publisher: 'Bloomsbury' },
    ratingsAvg: 4.8,
    reviewsCount: 2,
  });

  const lotrDetail = detailRepo.create({
    product: { id: lotr.id },
    description: 'Epic fantasy adventure.',
    specs: { ISBN: '0987654321', publisher: 'Allen & Unwin' },
    ratingsAvg: 4.9,
    reviewsCount: 1,
  });

  await detailRepo.save([harryPotterDetail, lotrDetail]);

  // ---------------------------
  // 5️⃣ Reviews
  // ---------------------------
  const review1 = reviewRepo.create({ product: { id: harryPotter.id }, author: 'Alice', rating: 5, text: 'Amazing book!' });
  const review2 = reviewRepo.create({ product: { id: harryPotter.id }, author: 'Bob', rating: 4, text: 'Really enjoyed it.' });
  const review3 = reviewRepo.create({ product: { id: lotr.id }, author: 'Charlie', rating: 5, text: 'Masterpiece!' });

  await reviewRepo.save([review1, review2, review3]);

  console.log('✅ Seed completed successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
