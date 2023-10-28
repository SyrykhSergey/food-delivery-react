import React, {useState} from 'react';
import '../App.css'
import axios from "axios";
import {Button, InputNumber} from "antd";
const ItemDishOrder = (props) => {
    const [itemValue, setItemValue] = useState(props.data.amount)


    const buttonPlus = (
        <p onClick={()=>{
            setItemValue(itemValue + 1)
            onAdd()
        }}
           style={{padding: "5px"}}>+</p>
    )
    const buttonMinus = (
        <p onClick={()=> {
            if (itemValue > 1) setItemValue(itemValue - 1);
            onDecrease()
        }}
           style={{padding: "5px"}}
        >-</p>
    )

    async function onAdd(){
        let id = props.data.id;
        await axios.post('https://food-delivery.kreosoft.ru/api/basket/dish/' + id, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }})
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            });
    }
    async function onDecrease(){
        let url = 'https://food-delivery.kreosoft.ru/api/basket/dish/' + props.data.id +'?increase=true'
        await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }}).then ((response) => {
            console.log(response)
            props.onUpdate()
        }).catch((error) =>{
            console.log(error)
        })
    }
    async function onDelete(){
        let url = 'https://food-delivery.kreosoft.ru/api/basket/dish/' + props.data.id +'?increase=false'
        await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }}).then ((response) => {
            console.log(response)
            props.onUpdate()
        }).catch((error) =>{
            console.log(error)
        })
    }


    return (
        <div style={{outline: "solid 1px gray",}}>
            <div style={{display: "flex", padding: "5px"}}>
                <img src={props.data.image} style={{height:"10vh", width: "8vw", borderRadius: "20px"}}/>
                <div style={{marginLeft: "1vw", width: "14vw"}}>
                    <h3 style={{width: "max-content"}}>{props.data.name}</h3>
                    <p style={{marginTop:"2vh"}}>Цена/шт: {props.data.price} руб</p>
                    <p style={{marginTop:"1vh"}}>Кол-во: {props.data.amount}</p>
                </div>
                <div>
                    <h5 style={{marginLeft:"12vw", marginTop: "8vh"}}>Стоимость: {props.data.price*props.data.amount}руб</h5>
                </div>
            </div>
        </div>
    );
};


export default ItemDishOrder;