import React, {useEffect} from 'react';
import ReactStars from "react-rating-stars-component/dist/react-stars";
import axios from "axios";
import {Rate} from "antd";

const Ratings = (props) => {

    async function onChange(newValue){
        let id = window.location.href.substring(27)
        console.log(id)
        console.log({
            id: id,
            ratingScore: newValue
        })
        axios.post('https://food-delivery.kreosoft.ru/api/dish/' + id + '/rating', {
            id: id,
            ratingScore: newValue
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }}).then(response => {
            console.log(response);
        }).catch(err => {
            console.error(err);
        })
    }

    if(!props.editeble){
        return (
            <div>
                <Rate allowHalf={true} count={10} defaultValue={props.data.rating} disabled={true}/>
            </div>
        );
    } else {
        return (
            <div>
                <Rate allowHalf={true} count={10} defaultValue={props.data.rating} onChange={onChange}/>
            </div>
        );
    }

};

export default Ratings;