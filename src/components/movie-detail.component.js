import React,{ Component } from "react";
import FilmDataService from "../services/film-service";

export default class MovieDetail extends Component {

    constructor(props)
    {
        super(props) //turedigimiz class in constructrina gore propslar ile calisacagimizi soyluyoruz

        this.getMovie = this.getMovie.bind(this);
        this.filmiSil = this.filmiSil.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.filmiGuncelle = this.filmiGuncelle.bind(this);

        this.state = {
            guncellenecekFilm : {
                id : null,
                name : '',
                genre : '',
                releaseDate : '',
                image : ''
            }
        }
    }

    // bu component talep edildiginde ilk calisan fonksiyondur
    componentDidMount()
    {
        console.log("bir onceki sayfadan gelen filmin id si : " + this.props.match.params.id);
        this.getMovie(this.props.match.params.id);
    }

    getMovie(id)
    {
        //"http://85.159.71.66:8080/api/257"
        FilmDataService.idyeGoreFilmDetayGetir(id)
        .then(gelenFilmDetay =>{
            this.setState({
                guncellenecekFilm : gelenFilmDetay.data
            })
            
        })
        .catch(error =>{
            console.log(error);
        })
    }

    filmiSil()
    {
        FilmDataService.idyeGoreFilmSil(this.state.guncellenecekFilm.id)
        .then(silinenFilm =>{
            window.location.href = "/movies";
        })
        .catch(error =>{
            console.log(error);
        })
    }

    onChangeName(e)
    {
        const detayName = e.target.value;
        this.setState(function(prevState) {
            return {
                guncellenecekFilm : {
                    ...prevState.guncellenecekFilm,
                    name : detayName
                }
            }
        })
    }

    onChangeGenre(e)
    {
        const detayGenre = e.target.value;
        this.setState(function(prevState) {
            return {
                guncellenecekFilm : {
                    ...prevState.guncellenecekFilm,
                    genre : detayGenre
                }
            }
        })
    }

    filmiGuncelle()
    {
        console.log(this.state.guncellenecekFilm.name);
        console.log(this.state.guncellenecekFilm.genre);
        FilmDataService.movieGuncelle(this.state.guncellenecekFilm.id , this.state.guncellenecekFilm)
        .then(guncellenmisFilm =>{
            console.log(guncellenmisFilm.data);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    render()
    {
        //state icindeki guncellenecekFilmi kullanmak istiyorum
        const {guncellenecekFilm} = this.state;
        return(
            <div>
                <h4>Film Detay Sayfasi</h4>
                <div className="form-group">
                    <label htmlFor="name">Film Adi</label>
                    <input type="text" className="form-control" onChange={this.onChangeName} value={guncellenecekFilm.name} />                    
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="genre">Film Konusu</label>
                    <input type="text" className="form-control" onChange={this.onChangeGenre} value={guncellenecekFilm.genre} />                    
                </div>
                <br />
                <button className="btn btn-success" onClick={this.filmiGuncelle}>Guncelle</button>
                <button className="btn btn-danger" onClick={this.filmiSil}>Delete</button>
            </div>
        )
    }
}