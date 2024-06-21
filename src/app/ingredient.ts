export interface IngredientInterface {
  name: string;
}

export class Ingredients {
  constructor(public name: string, public measure: string) {}
}
