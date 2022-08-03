import http from "../http-common"; // "http://85.159.71.66:8080/api"

class FilmDataService {

    getAllFilms()
    {
        return http.get("/movies"); //"http://85.159.71.66:8080/api"
    }

    findByMovieName(movieName){
        return http.get(`/movies?name=${movieName}`); //"http://85.159.71.66:8080/api/movies?name=Movie1"
    }

    filmiKaydet(data)
    {
        console.log(data);
        return http.post("/movies",data); //"http://85.159.71.66:8080/api" --- {"genre" : "Drama", "name": "ibr film"}
    }

    idyeGoreFilmDetayGetir(id)
    {
        return http.get(`/movies/${id}`); //"http://85.159.71.66:8080/api/2" --- {"genre" : "Drama", "name": "ibr film"}
    }

    idyeGoreFilmSil(id)
    {
        return http.delete(`/movies/${id}`);
    }

    movieGuncelle(id,data)
    {
        return http.put(`/movies/${id}`,data);
    }

}

export default new FilmDataService();