import React from 'react';
import '../App.css'
import {Button} from "antd";
import icon from '../icons/vegetarian.png'
import ReactStars from "react-rating-stars-component/dist/react-stars";
import axios from "axios";
import Swal from "sweetalert2";
const MenuCard = (props) => {
    const firstExample = {
        size: 16,
        count: 10,
        value: props.data.rating,
        isHalf: true,
        edit: false
    };
    function onClick(){
        window.location = '/item/' + props.data.id;
    }
    async function onAddBasket(){
        let id = props.data.id;
        await axios.post('https://food-delivery.kreosoft.ru/api/basket/dish/' + id, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }})
            .then((response) => {
                console.log(response)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Вы добавили товар в корзину',
                    showConfirmButton: false,
                    timer: 1000
                }).then (() => {
                    }
                )
            }).catch((error) => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Заказ не добавлен',
                    showConfirmButton: false,
                    timer: 2000
                })
                console.log(error)
            });
    }
    return (
        <div className="catalog-item" >
            <div className={'dishesImage'} onClick={onClick}>
                <img src={props.data.image} style={{height: "100%", width: "100%"}} />
                {props.data.vegetarian &&
                    <img
                        src={icon}
                        style={{
                            width:"2vw",
                            height: "4vh",
                            position: "relative",
                            bottom: "5vh",
                            left: "5px"
                        }}
                    />
                }
            </div>
            <div className="description-item" style={{margin: "1vh 1vw 1vh 1vw"}} onClick={onClick}>
                <p style={{fontSize: "18px",}}>{props.data.name}<br/></p>
                <p style={{fontSize: "13px"}}>Категория блюда - {props.data.category}<br/></p>
                <div style={{
                    border: "solid 1px gray",
                    marginTop: "10px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent:"center"
                }}>
                    <ReactStars {...firstExample} />
                </div>
                <p>{props.data.description}</p>
            </div>


            <div className="buying">
                <p>Цена - {props.data.price}р</p>
                {localStorage.getItem('token').length > 0 &&
                    <Button size={'small'} style={{backgroundColor: "#4573D5", color: "white"}} onClick={onAddBasket}>В корзину</Button>
                }

            </div>
        </div>
    );
};

export default MenuCard;