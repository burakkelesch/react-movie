import React,{ Component } from "react";
import FilmDataService from "../services/film-service"; //film-service bir nesne olusturdum

export default class AddMovie extends Component {

    constructor(props)
    {
        super(props);
        //degiskenleri, arrayleri nesnelerin durumlarini takip edicegim bir alan olusturduk
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.movieSave = this.movieSave.bind(this);

        this.state ={
            name : '',
            genre : ''
        }
    }

    componentDidMount()
    {
        console.log("Movie Ekleme Sayfasi Cagirildi :");
    }

    movieSave()
    {
        console.log("kaydete tiklandi");
        var kaydedilecekFilm = {
            name : this.state.name,
            genre : this.state.genre
        }
        console.log(kaydedilecekFilm);
        ////"http://85.159.71.66:8080/api" --- {"genre" : "Drama", "name": "ibr film"}
        FilmDataService.filmiKaydet(kaydedilecekFilm)
        .then(kaydedilmisGelenFilm =>{
            console.log(kaydedilmisGelenFilm.data);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    onChangeName(e)
    {
        this.setState({
            name : e.target.value
        })
    }

    onChangeGenre(e)
    {
        this.setState({
            genre : e.target.value
        })
    }


    render()
    {
        return(
            <div>
                <div className="container">
                    <div className="form-group">
                        <label htmlFor="name">Film Adi :</label>
                        <input 
                        className="form-control"
                        type="text"
                        id="name"
                        onChange={this.onChangeName}
                        required
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="genre">Film Konusu :</label>
                        <input 
                        className="form-control"
                        type="text"
                        id="genre"
                        onChange={this.onChangeGenre}
                        required
                        />
                    </div>
                    <br />
                    <button className="btn btn-success" onClick={this.movieSave}>Kaydet</button>
                </div>
            </div>
        )
    }

   

}