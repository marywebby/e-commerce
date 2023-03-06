const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategoryData = await Category.findAll({
      // JOIN with travellers, using the Trip through table
      include: [{model: Product }]
    });

    if (!allCategoryData) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }

    res.status(200).json(allCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryIDData = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Product }]
    });

    if (!categoryIDData) {
      res.status(404).json({ message: 'No category ID found!' });
      return;
    }

    res.status(200).json(categoryIDData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const postACategory = await Category.create(req.body);
    res.status(200).json(postACategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const UpdateCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  
    if(!UpdateCategoryData) {
      return res.status(404).json({message: 'Could not update category.'})
    }
    res.status(200).json(UpdateCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;