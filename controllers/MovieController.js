const Movie = require ('../models').Movie;
const Producer = require ('../models').Producer;
const Genre = require ('../models').Genre;
const { Op } = require("sequelize");

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

    async getByGenre(genreId){
        return Movie.findAll({
            where: {
                genreId: genreId
            }
        });
    }
    async sortByYear(sort){
        // if (cdt = 'DESC'){
           return Movie.findAll({
               order:[ [sort,'DESC']]
            });
    }

///////Première tentative mais renvoyait une promise ????!!!
    // async getByGenre(genreName){
    //     // on récupère l'Id des genres qui contiennent le mot "genreName"
    //
    //    const genre =  Genre.findAll({
    //         where: {
    //             name: genreName
    //         }
    //     });
    //     // On récupère les films dont les genreId correspondent à la première requête
    //
    //     console.log(genre);
    //     // return Movie.findAll({include:[Genre, Producer], where: {
    //     // genreId : genre[0]}
    //     // });
    //
    // }


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