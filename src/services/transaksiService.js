/**
 * @author: Artha Prihardana 
 * @Date: 2018-07-15 14:40:55 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-07-15 14:42:31
 */
import { TRANSAKSI } from "../Constant";
import { getMulti } from "./tokenService";

export const postTransaksi = async (body) => {
    try {
        let response = await getMulti().then(async result => {
            let user = JSON.parse(result[0][1]);
            let token = JSON.parse(result[1][1]);
            body.namaAgen = user._id;
            let response = await fetch(`${TRANSAKSI}`, {
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