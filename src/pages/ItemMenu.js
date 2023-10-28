import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import Ratings from "../components/ratings";
const ItemMenu = () => {
    const [dishData, setDishData] = useState({});
    const [vegetarian, setVegetarian] = useState('Не вегитерианское');
    const [ratingEdit, setRatingEdit] = useState(false);



    //https://food-delivery.kreosoft.ru/api/dish/

    useEffect(() =>{
        let id = window.location.href.substring(27)
        console.log(id)
        axios.get('https://food-delivery.kreosoft.ru/api/dish/' + id).then(response => {
            setDishData(response.data);
            console.log(response);
            if (response.data.vegetarian) setVegetarian('Вегетеринское');
            console.log(response.data.rating)
            //https://food-delivery.kreosoft.ru/api/dish/3fa85f64-5717-4562-b3fc-2c963f66afa6/rating/check
        }).catch(err => {
            console.error(err);
        })


        axios.get('https://food-delivery.kreosoft.ru/api/dish/' + id + '/rating/check', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }}).then(response => {
            //if (response.data) setRatingEdit(true);
            console.log(response);
            setRatingEdit(true)

        }).catch(err => {
            console.error(err);
        })
    }, []);
    return (
        <div className={'background'} style={{height: "95vh"}}>
            <div className={'frame-box'} style={{backgroundColor: "white", padding: "20px", width: "70vw"}}>
                <h1 style={{fontSize: "5vh"}}>{dishData.name}</h1>
                <div className={'frame-box'} style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px"
                }}>
                    <img src={dishData.image} style={{height: "35vh"}} />
                    <p style={{marginTop: "5px"}}>Категория блюда - {dishData.category}</p>
                    <p style={{marginTop: "5px"}}>{vegetarian}</p>
                    <p style={{marginTop: "3vh"}}>{dishData.description}</p>
                    <div style={{
                        border: "solid 1px gray",
                        marginTop: "3vh",
                        width: "max-content",
                        display: "flex",
                        justifyContent:"center"
                    }}>
                        {dishData.rating > 0 &&
                            <Ratings data={dishData} editeble={ratingEdit}/>
                        }

                    </div>
                    <p style={{marginTop: "5px"}}>Цена: {dishData.price} руб/шт</p>
                </div>
            </div>
        </div>
    );
};

export default ItemMenu;