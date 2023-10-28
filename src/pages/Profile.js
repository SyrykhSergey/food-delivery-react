import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import {Button, DatePicker, Input} from "antd";
import dayjs from "dayjs";
import InputMask from "react-input-mask";
const Profile = () => {
    const [profileData, setProfileData] = useState({});

    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState();
    const [phone, setPhone] = useState();

    useEffect(() =>{
        axios.get('https://food-delivery.kreosoft.ru/api/account/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            setProfileData(response.data);
            setFullName(response.data.fullName)
            setEmail(response.data.email)
            setBirthDate(response.data.birthDate.substring(0, 10))
            setGender(response.data.gender)
            setPhone(response.data.phoneNumber)
            console.log(response.data.birthDate.substring(0, 10))
            console.log(response);
        }).catch(err => {
            console.error(err);
        })
    }, []);
    return (
        <div className={'background'}>
            <div className={'frame-box'}>
                <div className={'box-content'}>
                    <h1>Профиль</h1>
                    <div style={{display: "flex", marginTop: "5vh"}}>
                        <p style={{width: "10vw"}}>ФИО</p>
                        <Input
                            defaultValue={profileData.fullName}
                            value={fullName}
                            onChange={event => setFullName(event.target.value)} style={{width: "20vw"}}/>
                    </div>

                    <div style={{display: "flex", marginTop: "5vh"}}>
                        <p style={{width: "10vw"}}>Email</p>
                        <p style={{width: "20vw"}}>{email}</p>
                    </div>

                    <div style={{display: "flex", marginTop: "5vh"}}>
                        <p style={{width: "10vw"}}>День рождения</p>
                        {birthDate &&
                            <DatePicker
                                value={dayjs(birthDate)}
                                onChange={event=> setBirthDate(dayjs(event).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))}
                                style={{width: "20vw"}}
                            />
                        }
                    </div>

                    <div style={{display: "flex", marginTop: "5vh"}}>
                        <p style={{width: "10vw"}}>Пол</p>
                        {gender === 'Female' &&
                            <p>Женщина</p>
                        }
                        {gender === 'Male' &&
                            <p>Мужчина</p>
                        }
                    </div>

                    <div style={{display: "flex", marginTop: "5vh"}}>
                        <p style={{width: "10vw"}}>Номер телефона</p>
                        <InputMask mask="+7 (999) 999 99-99"
                                   alwaysShowMask={true}
                                   id={'phone'}
                                   style={{width: "20vw"}}
                                   value={phone}
                                   onChange={event => setPhone(event.target.value)}
                                   class={'phone-input'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;