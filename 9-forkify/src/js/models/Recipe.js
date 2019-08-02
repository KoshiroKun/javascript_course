import axios from 'axios';
import { getKey, cors_proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const result = await axios(`${cors_proxy}https://www.food2fork.com/api/get?key=${getKey()}&rId=${this.id}`);
            //console.log(result);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
        }
    }

    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(element => {
            // Uniform units
            let ingredient = element.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => units.includes(el));
            const objIng = {count: 0, unit: '', ingredients: []};

            if (unitIndex > -1) {
                // There is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                objIng.count = arrCount.length === 1 ? eval(arrIng[0].replace('-', '+')) : eval(arrIng.slice(0, unitIndex).join('+'));
                objIng.unit = arrIng[unitIndex];
                objIng.ingredients = arrIng.slice(unitIndex + 1).join(' ');
            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng.count = parseInt(arrIng[0], 10);
                objIng.unit = '',
                objIng.ingredients = arrIng.slice(1).join(' ');
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng.count = 1;
                objIng.unit = '';
                objIng.ingredients = ingredient;
            }

            return objIng;
        });

        this.ingredients = newIngredients;
    }

    updateServings(type) {
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}