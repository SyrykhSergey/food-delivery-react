import React, {useState} from 'react';
import {Button, InputNumber} from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const ItemCart = (props) => {
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
                <p style={{marginRight:"3vw", marginLeft: "1vw"}}>{props.place? props.place + '.' : ''}</p>
                <img src={props.data.image} style={{height:"10vh", width: "8vw", borderRadius: "20px"}}/>
                <div style={{marginLeft: "1vw", width: "14vw"}}>
                    <h3 style={{width: "max-content"}}>{props.data.name}</h3>
                    <p style={{marginTop:"2vh"}}>Цена/шт: {props.data.price} руб</p>
                </div>
                <InputNumber
                    addonAfter={buttonPlus}
                    addonBefore={buttonMinus}
                    value={itemValue}
                    style={{width: "10vw", marginTop: "1vh"}}
                    min={1}
                    onChange={event=> setItemValue(event)}
                />
                <Button
                    type={'primary'}
                    danger={true}
                    style={{marginRight: "10px", marginLeft: "auto", marginTop: "1vh"}}
                    onClick={onDelete}
                >Удалить</Button>
            </div>
        </div>
    );
};

export default ItemCart;