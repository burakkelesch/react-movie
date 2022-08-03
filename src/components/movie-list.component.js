import React,{ Component } from "react";
import FilmDataService from "../services/film-service";
import {Link} from "react-router-dom";

export default class MovieList extends Component {

    constructor(props){
        super(props); //turetilen class in constructor props ile calisacagim

        this.AramaYap = this.AramaYap.bind(this); //reactjs bu fonksiyonda biliniyor
        this.onChangeName = this.onChangeName.bind(this);
        this.SayfaYenileme = this.SayfaYenileme.bind(this);
        
        //component icindeki kullanmak istedigimiz degerlerini gormek istedigimiz degisken array ve nesnelerin durumlarini takip edebilmek icin bir alana ihtiyacimiz var

        this.state ={
            filmArray : [],
            searchName : ''
        }
    }

    //ilgili component talep edildiginde ilk devreye giren fonksiyondur
    componentDidMount()
    {
        console.log("Movie List Sayfasi Cagirildi :");
        this.tumFilmleriGetir();
    }
    
    tumFilmleriGetir()
    {
        FilmDataService.getAllFilms()
        .then(FilmListesiGeldi => {
            this.setState({
                filmArray : FilmListesiGeldi.data
            })
            console.log(FilmListesiGeldi.data);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    AramaYap()
    {
        console.log(this.state.searchName);
        FilmDataService.findByMovieName(this.state.searchName)
        .then(aramaSonucuGelenVeri => {
            console.log(aramaSonucuGelenVeri.data);
        })
    }
    onChangeName(e)
    {
        const filmName = e.target.value;
        this.setState({
            searchName : filmName
        })
    }

    SayfaYenileme()
    {
        console.log("sayfa yenilendi");
        this.tumFilmleriGetir();
    }

    //html deki body taginin aynisi
    render()
    {
        //state icindeki film arrayi render da kullanmak istiyorum
        const {filmArray} = this.state;
        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                        className="form-control"
                        type="text"
                        value={this.state.searchName}
                        onChange={this.onChangeName}                        
                        placeholder="Film adina gore ara" />
                        <div className="input-group-append">
                            <button className="btn btn-success" onClick={this.AramaYap}>Ara</button>
                            <button className="btn btn-danger" onClick={this.SayfaYenileme}>Yenile</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                <h4>Film Listesi</h4>
                <ul className="list-group">
                    {filmArray.map((film,index)=> (
                        <Link to={"/movies/"+film.id} className="btn btn-primary">
                        <li className="list-group-item" key={index}>
                        <div className="card">
                            <img src={film.image} alt={film.name} />
                            <div className="card-body">
                                <h5 className="card-title">Film Adi : {film.name} </h5>
                                <p className="card-text">Konusu : {film.genre}</p>
                            </div>
                        </div>    
                        </li>
                        </Link>
                    ))}                    
                </ul>
                </div>
            </div>
        )
    }
}