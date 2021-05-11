const Movie = require ('../models').Movie;
const Producer = require ('../models').Producer;
const Genre = require ('../models').Genre;

class MovieController {
    async getAll() {
        return Movie.findAll({include:[Producer, Genre]});
    }

    async getPageMovie(pageNumber){
      let decalage = -10;
        if (pageNumber != "last") {
            decalage += pageNumber * 10
        } else if (pageNumber == "last"){
            decalage += await Movie.count()
        }
        return Movie.findAll({include:[Producer, Genre], limit: 10, offset: decalage});
    }




    async getById(id) {
        return Movie.findByPk(id);
    }

    async add(data) {
        return Movie.create(data)
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