import React from 'react';
import '../App.css'
import {Button} from "antd";
import axios from "axios";
const ItemsOrders = (props) => {

    async function accessDeliver(){
        axios.post('https://food-delivery.kreosoft.ru/api/order/' + props.data.id + '/status', {},{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((response) =>{
            props.onUpdate()
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return (
        <div style={{outline: "solid 1px gray",}}>
            <div style={{display: "flex", padding: "5px", justifyContent: "space-between"}}>
                <div>
                    <h4>Заказ от {props.data.orderTime.toString().substring(0, 10)}</h4>
                    {props.data.status == 'InProcess' &&
                        <p>Статус заказа - в обработке</p>
                    }
                    {props.data.status == 'Delivered' &&
                        <p>Статус заказа - доставлен</p>
                    }
                    {props.data.status == 'InProcess' &&
                        <p>Доставка ожидается - {props.data.deliveryTime.toString().replace('T', ' ')}</p>
                    }
                    {props.data.status == 'Delivered' &&
                        <p>Доставлен - {props.data.deliveryTime.toString().replace('T', ' ')}</p>
                    }
                </div>
                <div>
                    {props.data.status == 'InProcess' &&
                        <Button
                            onClick={accessDeliver}
                            style={{backgroundColor: '#42a214', color: "white"}}>Подтвердить доставку</Button>
                    }

                    <p style={{marginTop:"5px"}}>Стоимость заказа: {props.data.price}руб</p>
                </div>
            </div>
        </div>
    );
};

export default ItemsOrders;