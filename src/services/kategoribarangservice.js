/**
 * @author: Artha Prihardana 
 * @Date: 2018-07-16 08:42:56 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-07-16 08:45:41
 */
import { KATEGORIBARNAG } from "../Constant";
import { getToken } from "./tokenService";

export const getKategoriBarang = async () => {
    try {
        let response = await getToken().then(async result => {
            if(result !== null) {
                let token = JSON.parse(result);
                let response = await fetch(`${KATEGORIBARNAG}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token.token
                    }
                });
                let responseJson = await response.json();
                return responseJson;
            }
        }).catch(err => {
            console.log('err ==>', err);
        })
        return response;
    } catch (error) {
        console.log('err ==>', err);
    }
} 