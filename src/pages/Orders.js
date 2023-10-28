import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import {Button} from "antd";
const Orders = () => {
    const [cartCount, setCartCount] = useState();


    useEffect(() =>{
        axios.get('https://food-delivery.kreosoft.ru/api/basket', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            setCartCount(response.data.length);
            console.log(response);
        }).catch(err => {
            console.error(err);
        })
    }, []);
    return (
        <div className={'background'}>
            <div className={'frame-box'} style={{width: "70vw"}}>
                <div className={'box-content'} style={{display: "flex", border: "solid 1px gray", margin: "20px"}}>
                    {cartCount &&
                        <h2 style={{padding: "25px"}}>В корзине есть блюда, вы можете оформить заказ</h2>
                    }
                    {cartCount &&
                        <Button style={{backgroundColor: '#42a214', color: "white"}}
                                onClick={()=> window.location = '/purchase'}>Оформить</Button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Orders;