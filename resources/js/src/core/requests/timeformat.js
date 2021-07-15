import axios from 'axios'
import http from "../../HTTPRequest";

export default  {

    fetch (state , obj) {
        if (obj.OBJ) {
            return http.get(`${state.url}timeformates?page=${obj.OBJ.page}`)
        }
        else {
            return http.get(`${state.url}timeformates`)
        }
    },

    post (state , obj) {
        if(obj.id == '' || obj.id == null)
        {
            return http.post(`${state.url}timeformates` ,obj)
        }
        else
        {
            return http.put(`${state.url}timeformates/${obj.id}` ,obj)
        }
    },

    remove (state , obj) {
        return http.delete(`${state.url}timeformates/${obj.id}`)
    }
}
