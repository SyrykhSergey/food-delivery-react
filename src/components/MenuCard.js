import React from 'react';
import '../App.css'
import {Button} from "antd";
const MenuCard = (props) => {
    return (
        <div className="catalog-item">
            <img className="dishesImage" src={props.data.image} />
            <div className="description-item" style={{margin: "1vh 1vw 1vh 1vw"}}>
                <p style={{fontSize: "20px",}}>{props.data.name}<br/></p>
                <p style={{fontSize: "13px"}}>Категория блюда - {props.data.category}<br/></p>
                <div style={{border: "solid 1px gray"}}>
                    <h3>{props.data.ratings}</h3>
                </div>
                <p>{props.data.description}</p>
            </div>


            <div className="buying">
                <p>Цена - {props.data.price}р</p>
                <Button size={'small'} style={{backgroundColor: "#4573D5", color: "white"}}>В корзину</Button>
            </div>
        </div>
    );
};

export default MenuCard;