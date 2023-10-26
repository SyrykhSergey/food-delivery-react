import React, {useEffect, useRef, useState} from 'react';
import '../App.css'
import {Alert, AutoComplete, Button, Checkbox, DatePicker, Form, Input, Select} from "antd";
import axios from "axios";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";

const Registration = () => {
    const [region, setRegion] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [streetsData, setStreetsData] = useState([]);
    const [housesData, setHousesData] = useState([]);
    const [currentGAR, setCurrentGAR] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    async function chooseCity(value){
        let currentId = citiesData.find(item => item.text === value)?.objectId;//Нашли айди для запроса
        console.log(currentId)
        await axios.get('https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=' + currentId)
            .then((response) => {
                console.log(response)
                setStreetsData(response.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    async function chooseStreet(value){
        let currentId = streetsData.find(item => item.text === value)?.objectId;//Нашли айди для запроса
        console.log(currentId)
        await axios.get('https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=' + currentId)
            .then((response) => {
                console.log(response)
                setHousesData(response.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    async function postRegistration(data){
        await axios.post('https://food-delivery.kreosoft.ru/api/account/register', data)
            .then((response) => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                console.log(housesData)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Аккаунт успешно зарегестрирован',
                    showConfirmButton: false,
                    timer: 2000
                }).then (() => {
                        localStorage.setItem("email", data.email)
                        window.location = '/';
                    }
                )
            }).catch((error) => {
                console.log(error)
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Данные заполнены неверно',
                    showConfirmButton: false,
                    timer: 2000
                })
            });
    }


    function chooseHouse(value){
        setCurrentGAR(housesData.find(item => item.text === value)?.objectGuid);
    }

    const onChange = (date, dateString) => {
        console.log(date.valueOf(), dateString.valueOf());
    };

    function onChangeNumber(value){
        setPhoneNumber(value.target.value);
        console.log(phoneNumber)

    }
    function onFinish(event){
        let birthDate = event.birthdate.$d.toLocaleString().substring(0, 10).replaceAll('.', '-');
        birthDate = birthDate.split('-').reverse().join('-');
        birthDate += 'T10:28:58.404Z';
        console.log(event)
        let requestBody = {
            "fullName": event.username,
            "phoneNumber": phoneNumber,
            "password": event.password,
            "email": event.email,
            "addressId": currentGAR,
            "birthDate": birthDate,
            "gender": event.gender
        }
        postRegistration(requestBody).then (() => {
            })
        console.log(requestBody)
    };
    function onFinishFailed(event){
        console.log(event);
        Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Данные заполнены неверно',
            showConfirmButton: false,
            timer: 2000
        })

    };

    useEffect(() =>{

        axios.get('https://food-delivery.kreosoft.ru/api/address/search').then(response => {
            setRegion(response.data[0]);
            console.log(response.data[0]);
        }).catch(err => {
            console.error(err);
        })
    }, []);

    useEffect(() =>{
        if(!region) return;
        axios.get( 'https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=' + region.objectId).
        then(response =>{
            setCitiesData(response.data);
            console.log(response.data);
        }).catch(err =>{
            console.error(err);
        })
    }, [region])
    return (
        <div className={'background'}>
            <div className={'frame-box'} style={{backgroundColor: "white"}}>
                <div className={'box-content'} >
                    <h2>Регистрация</h2>
                    <Form
                        name="registration"
                        layout={'vertical'}
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 30,
                        }}
                        style={{

                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="ФИО"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите ФИО',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Пол"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Выберите пол',
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        value: 'Male',
                                        label: 'Мужчина',
                                    },
                                    {
                                        value: 'Female',
                                        label: 'Женищна',
                                    }
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Дата рождения"
                            name="birthdate"
                            rules={[
                                {
                                    required: true,
                                    message: 'Выберите дату рождения',
                                },
                            ]}
                        >
                            <DatePicker onChange={onChange} style={{width: "100%"}} />
                        </Form.Item>

                        <p>Телефон</p>
                        <InputMask mask="+7 (999) 999 99-99"
                                   alwaysShowMask={true}
                                   id={'phone'}
                                   onChange={onChangeNumber}
                                   class={'phone-input'}
                        />

                        <div className={'frame-box'} style={{width: "100%"}}>
                            <div className={'box-content'} style={{marginLeft: "2vw", paddingBottom: "5vh"}}>
                                <p style={{marginBottom: "5vh"}}>Адрес проживания</p>
                                <p style={{marginBottom: "1vh"}}>Субъект РФ</p>
                                <Input value={region.text}/>
                                <p style={{marginTop: "2vh", marginBottom: "1vh"}}>Город</p>
                                <AutoComplete
                                    style={{width: '100%'}}
                                    options={citiesData.map(obj =>{
                                        return{
                                            label:obj.text,
                                            value: obj.text
                                        }
                                    })}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    onSelect={value => chooseCity(value)}
                                />
                                <p style={{marginTop: "2vh", marginBottom: "1vh"}}>Элемент улично-дорожной сети</p>
                                <AutoComplete
                                    style={{width: '100%'}}
                                    options={streetsData.map(obj =>{
                                        return{
                                            label:obj.text,
                                            value: obj.text
                                        }
                                    })}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    onSelect={value => chooseStreet(value)}
                                />
                                <p style={{marginTop: "2vh"}}>Здание / сооружение</p>
                                <AutoComplete
                                    style={{width: '100%'}}
                                    options={housesData.map(obj =>{
                                        return{
                                            label:obj.text,
                                            value: obj.text
                                        }
                                    })}
                                    filterOption={(inputValue, option) =>
                                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                    onSelect={chooseHouse}
                                />
                            </div>
                        </div>

                        <Form.Item
                            label="Email"
                            style={{marginTop: "5vh"}}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите email',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите ваш пароль',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 8,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Зарегестрироваться
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Registration;