import http from "../../HTTPRequest";

export default  {

    fetch (state , obj) {
        if (obj.OBJ) {
            return http.get(`${state.url}designations?page=${obj.OBJ.page}`)
        }
        else {
            return http.get(`${state.url}designations`)
        }
    },

    post (state , obj) {
        if(obj.id == '' || obj.id == null)
        {
            return http.post(`${state.url}designations`, obj)
        }
        else
        {
            return http.put(`${state.url}designations/${obj.id}`, obj)
        }
    },
    remove (state , obj) {
        return http.delete(`${state.url}designations/${obj.id}`)
    },


}
