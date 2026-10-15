import fs from 'fs';
import path from 'path';

import type { Recipe } from '../app/types';

export function generateRecipeSlug(title: string): string {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function isValidPortion(value: unknown): boolean {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const portion = value as { size?: unknown; components?: unknown };

  return (
    typeof portion.size === 'string' &&
    (portion.components === undefined ||
      (Array.isArray(portion.components) &&
       portion.components.every((component) =>
         typeof component === 'object' &&
         component !== null &&
         typeof (component as { item?: unknown }).item === 'string' &&
         typeof (component as { amount?: unknown }).amount === 'string')))
  );
}

export function isValidRecipe(value: unknown): value is Recipe {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const recipe = value as Partial<Recipe> & { macros?: Partial<Recipe['macros']> };

  return (
    typeof recipe.title === 'string' &&
    typeof recipe.description === 'string' &&
    typeof recipe.prepTime === 'string' &&
    typeof recipe.cookTime === 'string' &&
    typeof recipe.servings === 'number' &&
    (recipe.portion === undefined || isValidPortion(recipe.portion)) &&
    typeof recipe.difficulty === 'string' &&
    (recipe.dateAdded === undefined || typeof recipe.dateAdded === 'string') &&
    Array.isArray(recipe.tags) &&
    recipe.tags.every((tag) => typeof tag === 'string') &&
    Array.isArray(recipe.ingredients) &&
    recipe.ingredients.length > 0 &&
    recipe.ingredients.every((ingredient) => typeof ingredient === 'string') &&
    Array.isArray(recipe.instructions) &&
    recipe.instructions.length > 0 &&
    recipe.instructions.every((instruction) => typeof instruction === 'string') &&
    (recipe.notes === undefined || typeof recipe.notes === 'string') &&
    (recipe.inspiredBy === undefined ||
      (typeof recipe.inspiredBy === 'object' &&
       recipe.inspiredBy !== null &&
       typeof (recipe.inspiredBy as { name?: unknown }).name === 'string' &&
       typeof (recipe.inspiredBy as { source?: unknown }).source === 'string' &&
       ((recipe.inspiredBy as { url?: unknown }).url === undefined ||
        typeof (recipe.inspiredBy as { url?: unknown }).url === 'string'))) &&
    recipe.macros !== undefined &&
    typeof recipe.macros.calories === 'number' &&
    typeof recipe.macros.protein === 'number' &&
    typeof recipe.macros.carbs === 'number' &&
    typeof recipe.macros.fat === 'number'
  );
}

export function loadRecipesFromDirectory(recipesDir: string): Recipe[] {
  if (!fs.existsSync(recipesDir)) {
    return [];
  }

  const files = fs.readdirSync(recipesDir).filter((file) => file.endsWith('.json') && file !== 'index.json');

  return files.map((file) => {
    const filePath = path.join(recipesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(fileContent) as unknown;

    if (!isValidRecipe(parsed)) {
      throw new Error(`Invalid recipe schema in ${file}`);
    }

    return parsed;
  });
}
