const Category = require("../../models/category");

module.exports.getCategories = async function (req, res) {
  //here we get the whole collection and sort by order
  let categories = await Category.find({}).exec();
  res.render("admin/categories", {
    categories: categories,
    message: res.locals.message,
    color: res.locals.color
  });
}


module.exports.editCategory = function (req, res) {
  Category.findById(req.params.id, function (err, category) {
    res.render("admin/editCategory", {
      category: category,
      message: res.locals.message,
      color: res.locals.color
    });
  });
}
module.exports.createCategory = function (req, res) {
  var category = new Category(); // create a new instance of the category model
  category.name = req.body.name; // set the categories name (comes from the request)

  // save the category and check for errors
  category.save(function (err) {
    if (err) res.send(err);
    console.log("Category created:", category);
    res.redirect("/admin/categories?alert=created");
  });
}

module.exports.deleteCategory = function (req, res) {
  Category.remove(
    {
      _id: req.params.id
    },
    function (err, category) {
      if (err) res.send(err);

      console.log("Category deleted");
      res.redirect("/admin/categories?alert=deleted");
    }
  );
}
module.exports.updateCategory = function (req, res) {
  // use our category model to find the category we want
  Category.findById(req.params.id, function (err, category) {
    if (err) res.send(err);

    category.name = req.body.name; // update the categories info

    // save the category
    category.save(function (err) {
      if (err) res.send(err);

      console.log("Category updated:", category);
      res.redirect("/admin/categories/edit/" + category._id + "?alert=deleted");
    });
  });
}
