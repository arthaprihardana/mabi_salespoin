/**
 * @author: Artha Prihardana 
 * @Date: 2018-07-11 21:42:55 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-07-11 22:26:56
 */
import { LOKASI } from "../Constant";
import {getMulti, getToken} from './tokenService';

export const getLokasiByAgen = async (limit = 25, page = 1) => {
    try {
        let response = await getMulti().then(async result => {
            let user = JSON.parse(result[0][1]);
            let token = JSON.parse(result[1][1]);
            let response = await fetch(`${LOKASI}?agen=${user._id}&limit=${limit}&page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token.token
                },
            });
            let responseJson = await response.json();
            return responseJson;
        }).catch(err => {
            console.log('err ==>', err);
        })
        return response;
    } catch (error) {
        console.log('error ==>', error);
    }
}

export const postLokasi = async (body) => {
    try {
        let response = await getMulti().then(async result => {
            let user = JSON.parse(result[0][1]);
            let token = JSON.parse(result[1][1]);
            body.agen = user._id;
            console.log('body ==>', body)
            let response = await fetch(`${LOKASI}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token.token
                },
                body: JSON.stringify(body)
            });
            let responseJson = await response.json();
            return responseJson;
        }).catch(err => {
            console.log('err ==>', err);
        })
        return response;
    } catch (error) {
        console.log('error ==>', error);
    }
}