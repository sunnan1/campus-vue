import http from "../../HTTPRequest";

export default  {

    fetch (state) {
        return http.get(`${state.url}relationships`)
    },

    post (state , obj) {
        if(obj.id == '' || obj.id == null)
        {
            return http.post(`${state.url}relationships` ,obj)
        }
        else
        {
            return http.put(`${state.url}relationships/${obj.id}` ,obj)
        }
    },
    remove (state , obj) {
        return http.delete(`${state.url}relationships/${obj.id}` ,obj)
    },
}
