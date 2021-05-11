const Movie = require ('../models').Movie;

class MovieController {
    async getAll() {
        return Movie.findAll();
    }

    async getById(id) {
        return Movie.findByPk(id);
    }

    async add(title, description, year) {
        return await Movie.create({
            title : title,
            description : description,
            year : year
        });
    }

    async update (id, payload) {
        return Movie.update(payload, {
            where: {
                id: id
            }
        });
    }

    async delete(id) {
        return Movie.destroy({
            where: {
                id:id
            }
        })
    }

}

module.exports = new MovieController();