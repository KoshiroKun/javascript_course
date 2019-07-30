import axios from 'axios';
import { getKey, cors_proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const result = await axios(`${cors_proxy}https://www.food2fork.com/api/search?key=${getKey()}&q=${this.query}`);
            this.recipes = result.data.recipes;
            //console.log(this.recipes);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
}