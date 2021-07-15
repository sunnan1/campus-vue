import http from "../../HTTPRequest";

export default  {

    fetch (state , payload) {
        if(payload.OBJ) {
            return http.get(`${state.url}departments?page=${payload.OBJ.page}`)
        }
        else {
            return http.get(`${state.url}departments`)
        }
    },

    post (state , obj) {
        if(obj.id == '' || obj.id == null)
        {
            return http.post(`${state.url}departments` , obj)
        }
        else
        {
            return http.put(`${state.url}departments/${obj.id}` ,obj)
        }
    },
    delete (state , obj) {
        return http.delete(`${state.url}departments/${obj}` ,obj)
    },

    execute (state , obj) {
        if(obj.type == state.get) {
            return this.fetch(state)
        }
        else if(obj.type == state.post) {
            return this.post(state , obj.OBJ)
        }
        else if(obj.type == state.delete) {
            return this.delete(state , obj.OBJ)
        }
    }
}
