import React, {useEffect, useState} from 'react';
import '../App.css'
import {Button, Checkbox, Pagination, Select, Switch} from "antd";
import MenuCard from "../components/MenuCard";
import axios from "axios";
import {useSearchParams} from "react-router-dom";

const Menu = () => {
    const [dishesData, setDishesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    let [searchParams, setSearchParams] = useSearchParams();

    const optionsCategories = [
        {
            value: 'Wok',
            label: 'Wok'
        },
        {
            value: 'Soup',
            label: 'Супы'
        },
        {
            value: 'Pizza',
            label: 'Пицца'
        },
        {
            value: 'Dessert',
            label: 'Десерты'
        },
        {
            value: 'Drink',
            label: 'Напитки'
        }
    ]
    const optionsSorting = [
        {
            value: 'NameAsc',
            label: 'От А-Я'
        },
        {
            value: 'NameDesc',
            label: 'От Я-А'
        },
        {
            value: 'PriceAsc',
            label: 'По возрастанию цены'
        },
        {
            value: 'PriceDesc',
            label: 'По убыванию цены'
        },
        {
            value: 'RatingAsc',
            label: 'По возрастанию рейтинга'
        },
        {
            value: 'RatingDesc',
            label: 'По убыванию рейтинга'
        },
    ]

    const [choseCategories, setChoseCategories] = useState([]);
    const [choseFilters, setChoseFilters] = useState([]);
    const [choseVegetarian, setChoseVegetarian] = useState([]);


    function tagsChange(event){
        setChoseCategories(event)
    }
    function sortingChange(event){
        setChoseFilters(event)
    }
    function onChangeVegitarian(event){
        setChoseVegetarian(event)
    }

    function onClickButtuon(){
        //setSearchParams({'categories': choseCategories})
        let search = {};
        if (choseCategories) {
            search = {
                categories: choseCategories
            }
            if(choseFilters) {
                search.sorting = choseFilters
            }
            if(choseVegetarian){
                search.vegetarian = choseVegetarian
            }
        } else if(choseFilters) {
            search.sorting = choseFilters
            if(choseVegetarian){
                search.vegetarian = choseVegetarian
            }
        } else if(choseVegetarian){
            search.vegetarian = choseVegetarian
        }else {
            search = undefined;
        }
        setSearchParams(search)

        let href = window.location.href.substring(22)
        console.log("href: ", 'https://food-delivery.kreosoft.ru/api/dish' + href )
        axios.get('https://food-delivery.kreosoft.ru/api/dish' + href ).then(response => {
            setDishesData(response.data);
            console.log(response);
        }).catch(err => {
            console.error(err);
        })
    }

    function changePageNumber(event){
        let pageNum = event;
        setCurrentPage(pageNum)
        let search;
        if (pageNum) {
            search = {
                page: pageNum
            }
            if(choseCategories){
                search.categories = choseCategories
            }
        } else {
            search = undefined;
        }
        setSearchParams(search, { replace: false });

        let href = window.location.href.substring(22)
        console.log("search: " + searchParams.toString())
        axios.get('https://food-delivery.kreosoft.ru/api/dish' + href).then(response => {
            setDishesData(response.data);
            console.log(response);
        }).catch(err => {
            console.error(err);
        })
    }
    useEffect(() =>{
        let href = window.location.href.substring(22)
        setCurrentPage(searchParams.toString().indexOf('page') >= 0 ? Number(searchParams.toString().substring(5, 6)) : 1)
        console.log(searchParams.toString().length)
        axios.get('https://food-delivery.kreosoft.ru/api/dish' + href).then(response => {
            setDishesData(response.data);
            console.log(response);
        }).catch(err => {
            console.error(err);
        })
        console.log(searchParams.toString().substring(5, 6))
    }, []);
    if(!dishesData){
        return (
            <div>
                <p>Нет данных</p>
            </div>
        )
    }
    else {
        let pageCount = dishesData.pagination? dishesData.pagination.count * 10 : 50;
        return (
            <div className="menuContainer">
                <div style={{
                    border: "solid 1px gray",
                    padding: "10px",
                    margin: "10px",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Select
                        mode="tags"
                        style={{
                            width: '8vw',
                            marginRight: '5px'
                        }}
                        placeholder="Категории"
                        onChange={tagsChange}
                        options={optionsCategories}
                    />
                    <Select
                        style={{width: "15vw", marginRight: "5px"}}
                        options={optionsSorting}
                        onChange={sortingChange}
                    />
                    <Switch size="small" onChange={onChangeVegitarian} /> Показывать только вегитарианские блюда
                    <Button
                        size={'small'}
                        onClick={onClickButtuon}
                        style={{backgroundColor: "#4573D5",
                            color: "white",
                            marginLeft: "10px"}}
                    >Применить</Button>

                </div>
                <div className="menuBoard">
                    {dishesData.dishes && dishesData.dishes.map(dish =>
                        <MenuCard data={dish} style={{marginRight: "20px"}} />)}
                </div>
                <Pagination
                    total={pageCount}
                    defaultCurrent={1}
                    current={currentPage}
                    onChange={changePageNumber}
                />
            </div>
        );
    };
};

export default Menu;