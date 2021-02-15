const Product = require("./models/Product");
const Category = require("./models/Category");
const faker = require("faker");

const categories = [
  {
    name: "Milk & Eggs"
  },
  {
    name: "Vegetables & Fruits"
  },
  {
    name: "Meat & Fish"
  },
  {
    name: "Wine & Drikns"
  }
];

async function seedDB() {
  // Remove all products
  await Product.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed Products!");
    }
  });
  // Remove all products
  await Category.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed Categories!");
    }
  });
  // add a few categories
  categories.forEach(async function(seed) {
    await Category.create(seed, async function(err, category) {
      if (err) {
        console.log(err);
      } else {
        console.log("added a category", category.name);

        for (let i = 0; i < 5; i++) {
            const product = {
              name: faker.commerce.productName(),
              categoryId: category._id,
              image: `http://lorempixel.com/30${i}/20${i}/food`,
              price: faker.commerce.price()
            };
          await Product.create(
            product,
            function(err, product) {
              if (err) {
                console.log(err);
              } else {
                console.log("Created new Product", product.name);
              }
            }
          );
        }
      }
    });
  });
}

module.exports = seedDB;
