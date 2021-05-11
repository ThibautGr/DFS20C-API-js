const Genre = require ('../models').Genre;
const Movie = require ('../models').Movie;

class GenreController{

    async getAll() {
        return Genre.findAll({include: [Movie]});
    }

    async getByName(name) {
        return Genre.findAll({
            where: {
                name: name
            }
        });

    }
}

module.exports = new GenreController();