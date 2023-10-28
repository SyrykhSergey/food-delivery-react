import React from 'react';
import axios from "axios";

const HeaderMenu = () => {
    let isLogged = localStorage.getItem('token'); //Заменить при появлении авторизации
    async function quiteAccount(){
        await axios.post('https://food-delivery.kreosoft.ru/api/account/logout',{} , {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((response) => {
            localStorage.setItem('email', '');
            localStorage.setItem('token', '');
            window.location = '/';
        }).catch((err) => {
            localStorage.setItem('email', '');
            localStorage.setItem('token', '');
            console.log(err)
            window.location = '/';
        })
    }
    if (isLogged){
        return(
            <div className="headerContainer">
                <h2> Delivery Кушац</h2>
                <a href={'/'}>Меню</a>
                <a href={'/orders'}>Заказы</a>
                <a href={'/cart'}>Корзина</a>
                <div className="headerRightSide">
                    <a href={'/profile'}>{localStorage.getItem('email')}</a>
                    <button style={{height: "40px",
                        marginLeft: "10px",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",}}
                            onClick={quiteAccount}>выйти</button>
                </div>

            </div>
        );
    }
    else{
        return (
            <div className="headerContainer">
                <h2> Delivery Кушац</h2>
                <a href={'/'}>Меню</a>
                <div style={{display:"flex", marginRight: "20px", marginLeft: "auto"}}>
                    <a href={'/authorization'}>Войти</a>
                    <a href={'/registration'}>Зарегестрироваться</a>
                </div>

            </div>
        );
    }
};

export default HeaderMenu;