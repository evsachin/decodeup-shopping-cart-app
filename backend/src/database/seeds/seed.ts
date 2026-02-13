import "dotenv/config";
import { DataSource } from "typeorm";
import { Product } from "../../products/product.entity";
import { CartItem } from "../../cart/cart-item.entity";

const seedProducts = async () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Product, CartItem],
    synchronize: true,
  });

  try {
    await dataSource.initialize();
    console.log("Data Source has been initialized!");

    const productRepository = dataSource.getRepository(Product);
    const cartItemRepository = dataSource.getRepository(CartItem);

    // ✅ Use DELETE instead of TRUNCATE
    await cartItemRepository.createQueryBuilder().delete().execute();
    await productRepository.createQueryBuilder().delete().execute();

    const products = [
      {
        name: "Wireless Headphones",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      },
      {
        name: "Smart Watch",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      },
      {
        name: "Laptop Backpack",
        price: 49.99,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      },
      {
        name: "Mechanical Keyboard",
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
      },
      {
        name: "Wireless Mouse",
        price: 39.99,
        image:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
      },
      {
        name: "USB-C Hub",
        price: 59.99,
        image:
          "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500",
      },
      {
        name: "Phone Stand",
        price: 24.99,
        image:
          "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500",
      },
      {
        name: "Desk Lamp",
        price: 44.99,
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
      },
    ];

    await productRepository.save(products);

    console.log("✅ Successfully seeded products!");
    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    await dataSource.destroy();
    process.exit(1);
  }
};

seedProducts();
