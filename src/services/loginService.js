/**
 * @author: Artha Prihardana 
 * @Date: 2018-07-10 20:19:24 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-07-10 20:57:58
 */
import {LOGIN} from '../Constant';

export const loginService = (username, password) => {
    return new Promise((resolve, reject) => {
        fetch(`${LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                role: "agen"
            })
        })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
    })
}