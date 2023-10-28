import React from 'react';
import '../App.css'
import {Button} from "antd";
import icon from '../icons/vegetarian.png'
import ReactStars from "react-rating-stars-component/dist/react-stars";
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
    return (
        <div className="catalog-item" onClick={onClick}>
            <div className={'dishesImage'}>
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
            <div className="description-item" style={{margin: "1vh 1vw 1vh 1vw"}}>
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
                <Button size={'small'} style={{backgroundColor: "#4573D5", color: "white"}}>В корзину</Button>
            </div>
        </div>
    );
};

export default MenuCard;