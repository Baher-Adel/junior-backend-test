db.products.find({ category: "Electronics" }).sort({ price: -1 }).limit(5);
