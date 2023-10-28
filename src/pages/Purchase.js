import React, {useEffect, useState} from 'react';
import '../App.css'
import axios from "axios";
import {AutoComplete, Button, DatePicker, Input, TimePicker} from "antd";
import dayjs from "dayjs";
import ItemCart from "../components/ItemCart";
import ItemOrder from "../components/ItemOrder";
const Purchase = () => {
    const [profileData, setProfileData] = useState({});
    const [cartData, setCartData] = useState();

    const [wrongDate, setWrongDate] = useState(0);
    const [wrongTime, setWrongTime] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [addressData, setAddressData] = useState();
    const [itemTime, setItemTime] = useState()

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
    const [totalPrice, setTotalPrice] = useState(0);


    function calculate(cartRespons){
        let total = 0
        cartRespons.map((dish) => total += dish.price * dish.amount)
        setTotalPrice(total)
    }
    async function onClickButton(){
        let url = 'https://food-delivery.kreosoft.ru/api/order'
        let timer = dayjs(time).format('HH:mm:ss')
        console.log(timer)
        let request={
            "deliveryTime": date+'T'+ timer+'.000Z',
            "addressId": currentGAR
        }
        console.log(request)
        await axios.post(url, request, {
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
            setCurrentGAR(response.data.address)
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
                    axios.get('https://food-delivery.kreosoft.ru/api/basket', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    }).then(response => {
                        setCartData(response.data);
                        console.log(response);
                        calculate(response.data)
                    }).catch(err => {
                        console.error(err);
                    })
                })
        }).catch(err => {
            console.error(err);
        })
    }, []);
    return (
        <div className={'background'}>
            <div className={'frame-box'} style={{width: "80vw", backgroundColor: "white"}}>
                <div className={'box-content'}>
                    <h1>Оформление заказа</h1>
                    <h2>Данные покупателя</h2>
                    <div style={{display: "flex"}}>
                        <div style={{
                            backgroundColor: "#dadada",
                            outline: "solid 1px gray",
                            borderRadius: "5px",
                            width: "37vw",
                            height: "max-content",
                            marginRight: "2vw"
                        }}>
                            <div style={{padding:"10px"}}>
                                <p>Номер телефона</p>
                                <p style={{fontSize:"20px"}}>{profileData.phoneNumber}</p>
                            </div>

                        </div>
                        <div style={{
                            backgroundColor: "#dadada",
                            outline: "solid 1px gray",
                            borderRadius: "5px",
                            width: "37vw",
                            height: "max-content"
                        }}>
                            <div style={{padding:"10px"}}>
                                <p>Email</p>
                                <p style={{fontSize: "20px"}}>{profileData.email}</p>
                            </div>

                        </div>
                    </div>
                    <h2>Данные доставки</h2>
                    <p>Время доставки</p>
                    <div style={{display: "flex"}}>
                        <DatePicker
                            value={date?dayjs(date): null}
                            onChange={event=> {
                                console.log(date)
                                const currentDate = new Date();
                                const currentDateString = currentDate.toLocaleDateString();
                                if (Date.parse(currentDate) > dayjs(event).format('DD.MM.YYYY').toString()) {
                                    setWrongDate(1)
                                    console.log(`current: ${currentDateString} and choice ${dayjs(event).format('DD.MM.YYYY').toString()}`)
                                    setDate(null)
                                } else if (currentDateString === dayjs(event).format('DD.MM.YYYY').toString()) {
                                    setWrongDate(2)
                                    console.log(2)
                                    setDate(dayjs(event).format('YYYY-MM-DD').toString())
                                } else {
                                    setWrongDate(0)
                                    console.log(0)
                                    setDate(dayjs(event).format('YYYY-MM-DD').toString())
                                }

                            }}
                            style={{width: "20vw"}}
                        />
                        <TimePicker showNow={false} value={time} onChange={event => {
                            //console.log(dayjs(event).format('HH-mm-ss'))
                            // Получаем текущее время
                            let now = new Date();

                            // Извлекаем часы, минуты и секунды
                            let hours = now.getHours();
                            let minutes = now.getMinutes();
                            let seconds = now.getSeconds();

                            // Формируем строку с временем
                            let time = `${hours}:${minutes}:${seconds}`;
                            time = time.split(':')

                            let chosedTime = dayjs(event).format('HH-mm-ss').split('-')

                            let currentTime = time[0] * 60 * 60 + time[1] * 60 + time[2]
                            let choiceTime = chosedTime[0] * 60 * 60 + chosedTime[1] * 60 + chosedTime[2]
                            // Выводим текущее время на экран
                            console.log(`wrongdate: ${wrongDate}`)
                            if(currentTime >= choiceTime && wrongDate === 2) {
                                setWrongTime(true)
                                setTime(null)
                            } else {
                                setWrongTime(false)
                                setItemTime(event)
                            }
                            console.log(time);
                        }}/>
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
                    <p>Список блюд:</p>
                    <div className={'box-content'} style={{margin: "0 0 5vh 0"}}>
                        {cartData && cartData.map((dish, index) =>
                            <ItemOrder
                                data={dish}
                                key={index+1}
                                style={{marginRight: "20px"}}
                                place={index+1}
                            />)}
                    </div>
                    <h5 style={{marginBottom:"2vh"}}>Полная стоимость: {totalPrice}руб.</h5>
                    <Button
                        style={{backgroundColor: '#42a214', color: "white", marginBottom:"2vh"}}
                        onClick={onClickButton}
                    >Оформить заказ</Button>
                </div>
            </div>
        </div>
    );
};

export default Purchase;