import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = 'da085575bc27f7a7aebd001681b159ac';
        const cors_proxy = 'http://cors-anywhere.herokuapp.com/';
        try {
            const result = await axios(`${cors_proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = result.data.recipes;
            //console.log(this.recipes);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
}