import axios from 'axios'
import http from "../../HTTPRequest";

export default  {

    fetch (state , obj) {
        if (obj.OBJ) {
            return http.get(`${state.url}leavetypes?page=${obj.OBJ.page}`)
        }
        else
        {
            return http.get(`${state.url}leavetypes`)
        }

    },

    post (state , obj) {
        if(obj.id == '' || obj.id == null)
        {
            return http.post(`${state.url}leavetypes` ,obj)
        }
        else
        {
            return http.put(`${state.url}leavetypes/${obj.id}` ,obj)
        }
    },
    remove (state , obj)
    {
        return http.delete(`${state.url}leavetypes/${obj}`)
    }
}
