# Recipes Collection

This directory contains recipe files in JSON format. Each recipe file should follow the structure defined below.

## Recipe File Structure

Each recipe should be a JSON file with the following structure:

```json
{
  "title": "Recipe Name",
  "description": "Brief description of the recipe",
  "prepTime": "X minutes",
  "cookTime": "X minutes", 
  "servings": 4,
  "portion": {
    "size": "1 bowl (1/4 of each component)",
    "components": [
      { "item": "Cooked rice", "amount": "about 1 cup (from 1/4 cup dry)" },
      { "item": "Chicken", "amount": "170g raw / about 125g cooked" }
    ]
  },
  "difficulty": "Easy|Medium|Hard",
  "dateAdded": "YYYY-MM-DD",
  "tags": ["tag1", "tag2", "tag3"],
  "ingredients": [
    "ingredient 1",
    "ingredient 2"
  ],
  "instructions": [
    "Step 1",
    "Step 2"
  ],
  "macros": {
    "calories": 420,
    "protein": 32,
    "carbs": 28,
    "fat": 14
  },
  "notes": "Optional cooking notes or tips"
}
```

Macro values are numeric and represent one serving of the recipe. In this collection, some values are estimated from the listed ingredients when exact nutrition labels are not available.

`portion` says what one serving actually is, so the per-serving macros match what's on the plate. `size` is the whole serving in plain terms (a fraction of the batch plus a measurable amount: cups, grams, pieces). For dishes built from separate components (bowls, plates, tortas), list each one in `components` with its per-serving `amount`. Give meat as raw and approximate cooked weight, and grains as cooked volume with the dry amount. Say when a side the recipe suggests (rice, salad) isn't included in the macros. Every recipe in this collection has a portion, and the test suite checks for it.

`dateAdded` is optional and should be the date (`YYYY-MM-DD`) the recipe was added to the collection. It powers the "Newest First" sort on the recipes page; recipes without it sort to the end.

## Adding New Recipes

1. Create a new JSON file in this directory
2. Use lowercase dot-separated words for the filename (e.g., `chicken.parmesan.json`)
3. Follow the JSON structure above
4. Use descriptive tags for better searchability
5. Set `dateAdded` to today's date so the recipe sorts correctly under "Newest First"
6. Commit the file to the repository

## Tags

Common tags used in recipes:
- `quick` - Quick to prepare
- `easy` - Easy difficulty
- `vegetarian` - Vegetarian recipe
- `vegan` - Vegan recipe
- `gluten-free` - Gluten-free recipe
- `comfort-food` - Comfort food
- `healthy` - Healthy recipe
- `dessert` - Dessert recipe
- `breakfast` - Breakfast recipe
- `lunch` - Lunch recipe
- `dinner` - Dinner recipe
- `snack` - Snack recipe
- `italian` - Italian cuisine
- `asian` - Asian cuisine
- `mexican` - Mexican cuisine
- `baking` - Baking recipe
- `grilled` - Grilled recipe
- `make-ahead` - Can be prepared ahead of time
- `family-favorite` - Family favorite recipe
- `tandoori` - Tandoori-spiced (yogurt and spice marinade)
