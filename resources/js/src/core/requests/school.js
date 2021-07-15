import axios from  'axios'
import http from "../../HTTPRequest";

export default {

    fetch (state) {
        return http.get(`${state.url}schoolinfo`)
    },

    put (state , obj) {
        return axios.post(`${state.url}schoolinfo/${obj.id}` ,obj.obj, {
            headers : {
                'Authorization' : `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
                'Content-type' : 'multipart/form-data'
            }
        })
    },
}
