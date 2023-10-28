import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import {Button} from "antd";
import ItemCart from "../components/ItemCart";
import ItemsOrders from "../components/ItemsOrders";
const Orders = () => {
    const [cartCount, setCartCount] = useState();
    const [ordersData, setOrdersData] = useState();

    async function onDataUpdate(){
        axios.get('https://food-delivery.kreosoft.ru/api/order', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            setOrdersData(response.data);
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
            setCartCount(response.data.length);
            console.log(response);
            axios.get('https://food-delivery.kreosoft.ru/api/order', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(response => {
                setOrdersData(response.data);
                console.log(response);
            }).catch(err => {
                console.error(err);
            })
        }).catch(err => {
            console.error(err);
        })
    }, []);
    return (
        <div className={'background'}>
            <div className={'frame-box'} style={{width: "70vw"}}>
                <div className={'box-content'} style={{display: "flex", border: "solid 1px gray", margin: "20px", alignItems: "center", justifyContent:"space-between"}}>
                    {cartCount &&
                        <h2 style={{padding: "25px"}}>В корзине есть блюда, вы можете оформить заказ</h2>
                    }
                    {cartCount &&
                        <Button style={{backgroundColor: '#42a214', color: "white", marginRight:"10px"}}
                                onClick={()=> window.location = '/purchase'}>Оформить</Button>
                    }
                </div>
                <div className={'box-content'} style={{margin: "20px"}}>
                    <h1>Последние заказы</h1>
                    {ordersData && ordersData.map((dish, index) =>
                        <ItemsOrders
                            data={dish}
                            key={index+1}
                            style={{marginRight: "20px"}}
                            onUpdate={onDataUpdate}
                        />)}
                </div>


            </div>
        </div>
    );
};

export default Orders;