import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import Swal from "sweetalert2";
import axios from "axios";

const Authorization = () => {
    const [response, setResponse] = useState('');


    async function postAuthorization(data){
        await axios.post('https://food-delivery.kreosoft.ru/api/account/login', data)
            .then((response) => {
                console.log(response)
                setResponse(response.code)
                localStorage.setItem('token', response.data.token)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Вы успешно вошли',
                    showConfirmButton: false,
                    timer: 2000
                }).then (() => {
                        localStorage.setItem('email', data.email)
                        window.location = '/';
                    }
                )
            }).catch((error) => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Данные заполнены неверно',
                    showConfirmButton: false,
                    timer: 2000
                })
                console.log(error)
            });
    }
    function onFinish(event){
        console.log(event)
        let requestBody = {
            "email": event.email,
            "password": event.password,
        }
        postAuthorization(requestBody).then (() => {
            console.log(response)
        })

        console.log(requestBody)
    }
    function onFinishFailed(event){
        console.log(event);
        Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Данные заполнены неверно',
            showConfirmButton: false,
            timer: 2000
        })
    }
    return (
        <div className={'background'} style={{height: "95vh"}}>
            <div className={'frame-box'} style={{backgroundColor: "white"}}>
                <div className={'box-content'}>
                    <h1>Авторизация</h1>
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
                            label="Email"
                            name="email"
                            style={{marginTop: "2vh"}}
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
                                Войти
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Authorization;