export interface RecipeMacros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface RecipeInspiredBy {
  name: string;
  source: string;
  url?: string;
}

export interface RecipeMatrixRow {
  ingredient: string;
  // Index into RecipeMatrix.columns where this row's line starts and runs
  // rightward to the final cell; -1 = joins only at the final cell.
  joinAt: number;
}

export interface RecipeMatrix {
  columns: string[];
  rows: RecipeMatrixRow[];
  final: {
    label: string;
    detail: string;
  };
}

export interface Recipe {
  title: string;
  description: string;
  inspiredBy?: RecipeInspiredBy;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  notes?: string;
  macros: RecipeMacros;
  matrix?: RecipeMatrix;
}
