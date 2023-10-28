import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import ItemCart from "../components/ItemCart";
import ItemDishOrder from "../components/ItemDishOrder";
import {Button} from "antd";
const Order = () => {
    const [orderData, setOrderData] = useState();
    const [addressData, setAddressData] = useState();


    async function accessDeliver(){
        axios.post('https://food-delivery.kreosoft.ru/api/order/' + orderData.id + '/status', {},{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((response) =>{
            let id = window.location.href.substring(27)
            console.log(id)
            axios.get('https://food-delivery.kreosoft.ru/api/order' + id,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(response => {
                setOrderData(response.data);
                console.log(response);
                axios.get('https://food-delivery.kreosoft.ru/api/address/chain?objectGuid=' + response.data.address)
                    .then((response) =>{
                        setAddressData(response.data)
                        console.log(response)
                    })
            }).catch(err => {
                console.error(err);
            })
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(() =>{
        let id = window.location.href.substring(27)
        console.log(id)
        axios.get('https://food-delivery.kreosoft.ru/api/order' + id,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            setOrderData(response.data);
            console.log(response);
            axios.get('https://food-delivery.kreosoft.ru/api/address/chain?objectGuid=' + response.data.address)
                .then((response) =>{
                    setAddressData(response.data)
                    console.log(response)
                })
        }).catch(err => {
            console.error(err);
        })
    }, []);

    /*

     */
    if(orderData && addressData) {
        return (
            <div className={'background'}>
                <div className={'frame-box'} style={{backgroundColor: "white"}}>
                    <div className={'box-content'} style={{border: "solid 1px gray"}}>
                        <div style={{backgroundColor: "#c7c7c7", padding: "10px"}}>
                            <h1>Заказ #{orderData.id.toString().substring(0, 4)}</h1>
                            {orderData.status == 'InProcess' &&
                                <Button
                                    onClick={accessDeliver}
                                    style={{backgroundColor: '#42a214', color: "white"}}>Подтвердить доставку</Button>
                            }
                        </div>
                        <div style={{padding: "15px"}}>
                            <div>
                                <p>Дата заказа: {orderData.orderTime.toString().substring(0, 10)}</p>
                            </div>
                            <div>
                                <p>Дата доставки: {orderData.deliveryTime.toString().substring(0, 10)}</p>
                            </div>
                            <div>
                                <p>Адресс доставки: {`${addressData[0].text} ${addressData[1].text} ${addressData[2].text} ${addressData[3].text}`}</p>
                            </div>
                            <div>
                                {orderData.status == 'InProcess' &&
                                    <p>Статус заказа: в обработке</p>
                                }
                                {orderData.status = 'Delivered' &&
                                    <p>Статус заказа: доставлен</p>
                                }
                            </div>
                            <p>Список блюд</p>
                            {orderData.dishes && orderData.dishes.map((dish, index) =>
                                <ItemDishOrder
                                    data={dish}
                                    style={{marginRight: "20px"}}
                                />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div>
                no data
            </div>
        )
    }
};

export default Order;