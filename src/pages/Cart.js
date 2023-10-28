import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../App.css';
import MenuCard from "../components/MenuCard";
import ItemCart from "../components/ItemCart";

const Cart = () => {
    const [cartData, setCartData] = useState([]);


    async function onDataUpdate(){
        axios.get('https://food-delivery.kreosoft.ru/api/basket', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            setCartData(response.data);
            console.log(response);
        }).catch(err => {
            console.error(err);
        })
    }
    useEffect(() =>{
        axios.get('https://food-delivery.kreosoft.ru/api/basket', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            setCartData(response.data);
            console.log(response);
        }).catch(err => {
            console.error(err);
        })
    }, []);
    return (
        <div className={'background'} style={{height: "91vh"}}>
            <div className={'frame-box'} style={{width:"70vw", backgroundColor: "white"}}>
                <h1 style={{fontSize:"30px", padding: "25px"}}>Товары в корзине</h1>
                {cartData &&
                    <h2 style={{padding: "25px"}}>
                        У вас нет товаров в корзине
                    </h2>
                }
                <div className={'box-content'} style={{marginBottom: "5vh"}}>
                    {cartData && cartData.map((dish, index) =>
                        <ItemCart
                            data={dish}
                            key={index+1}
                            style={{marginRight: "20px"}}
                            place={index+1}
                            onUpdate={onDataUpdate}
                        />)}
                </div>
            </div>
        </div>
    );
};

export default Cart;