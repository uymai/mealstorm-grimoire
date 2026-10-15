export interface RecipeMacros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface RecipePortionComponent {
  item: string;
  amount: string;
}

/** What one serving looks like, so the per-serving macros match what's on the plate. */
export interface RecipePortion {
  size: string;
  components?: RecipePortionComponent[];
}

export interface RecipeInspiredBy {
  name: string;
  source: string;
  url?: string;
}

export interface Recipe {
  title: string;
  description: string;
  inspiredBy?: RecipeInspiredBy;
  prepTime: string;
  cookTime: string;
  servings: number;
  portion?: RecipePortion;
  difficulty: string;
  dateAdded?: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  notes?: string;
  macros: RecipeMacros;
}
