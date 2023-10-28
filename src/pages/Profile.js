import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import {AutoComplete, Button, DatePicker, Input} from "antd";
import dayjs from "dayjs";
import InputMask from "react-input-mask";
const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const [addressData, setAddressData] = useState();

    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState();
    const [phone, setPhone] = useState();

    const [region, setRegion] = useState();
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [building, setBuilding] = useState();

    const [citiesData, setCitiesData] = useState();
    const [streetsData, setStreetsData] = useState();
    const [housesData, setHousesData] = useState();

    const [currentGAR, setCurrentGAR] = useState();



    async function onClickButton(){
        let url = 'https://food-delivery.kreosoft.ru/api/account/profile'
        let request={
            "fullName": fullName,
            "birthDate": dayjs(birthDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
            "gender": gender,
            "addressId": currentGAR,
            "phoneNumber": phone
        }
        await axios.put(url, request, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        } ).then((response) =>{
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }
    async function updateRegion(){
        let currentId = addressData[0].objectId;//Нашли айди для запроса
        console.log(currentId)
        await axios.get('https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=' + currentId)
            .then((response) => {

                console.log(response)
                setCitiesData(response.data)
                setCity(undefined)
                setStreet(undefined)
                setBuilding(undefined)
            }).catch((error) => {
                console.log(error)
            });
    }

    async function updateChooseCity(){
        let currentId = addressData[1].objectId;//Нашли айди для запроса
        console.log(currentId)
        await axios.get('https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=' + currentId)
            .then((response) => {

                console.log(response)
                setStreetsData(response.data)
                setStreet(undefined)
                setBuilding(undefined)
            }).catch((error) => {
                console.log(error)
            });
    }
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
    async function updateChooseStreet(){
        let currentId = addressData[2].objectId
        console.log(currentId)
        await axios.get('https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=' + currentId)
            .then((response) => {
                console.log(response)
                setHousesData(response.data)
                setBuilding(undefined)
            }).catch((error) => {
                console.log(error)
            });
    }
    async function chooseStreet(value){
        let currentId = streetsData.find(item => item.text === value)?.objectId;
        console.log(currentId)
        await axios.get('https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=' + currentId)
            .then((response) => {
                console.log(response)
                setHousesData(response.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    function chooseHouse(value){
        setCurrentGAR(housesData.find(item => item.text === value)?.objectGuid);
    }


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
            axios.get('https://food-delivery.kreosoft.ru/api/address/chain?objectGuid=' + response.data.address)
                .then(response =>{
                    setAddressData(response.data)
                    setRegion(response.data[0].text)
                    setCity(response.data[1].text)
                    setStreet(response.data[2].text)
                    setBuilding(response.data[3].text)
                    console.log(response.data)
                })
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


                    <div className={'frame-box'} style={{width: "100%"}}>
                        <div className={'box-content'} style={{marginLeft: "2vw", paddingBottom: "5vh"}}>
                            <p style={{marginBottom: "5vh"}}>Адрес проживания</p>
                            <p style={{marginBottom: "1vh"}}>Субъект РФ</p>
                            <Input value={region}/>
                            <p style={{marginTop: "2vh", marginBottom: "1vh"}}>Город</p>
                            <AutoComplete
                                style={{width: '100%'}}
                                value={city}
                                onClick={updateRegion}
                                options={citiesData?citiesData.map(obj =>{
                                    return{
                                        label:obj.text,
                                        value: obj.text
                                    }
                                }): null}
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                onSelect={value => chooseCity(value)}
                            />
                            <p style={{marginTop: "2vh", marginBottom: "1vh"}}>Элемент улично-дорожной сети</p>
                            <AutoComplete
                                style={{width: '100%'}}
                                value={street}
                                onClick={updateChooseCity}
                                options={streetsData? streetsData.map(obj =>{
                                    return{
                                        label:obj.text,
                                        value: obj.text
                                    }
                                }): null}
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                onSelect={value => chooseStreet(value)}
                            />
                            <p style={{marginTop: "2vh"}}>Здание / сооружение</p>
                            <AutoComplete
                                style={{width: '100%'}}
                                value={building}
                                onClick={updateChooseStreet}
                                options={housesData ? housesData.map(obj =>{
                                    return{
                                        label:obj.text,
                                        value: obj.text
                                    }
                                }): null}
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                onSelect={chooseHouse}
                            />
                        </div>
                    </div>
                    <Button style={{marginTop: "2vh", marginBottom: "2vh"}} onClick={onClickButton}>Изменить</Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;