import http from '../../HTTPRequest'
export default {

    fetch (state) {
        return http.get(`${state.url}campuses`)
    },

    post (state , obj) {
        if(obj.id == '' || obj.id == null)
        {
            return http.post(`${state.url}campuses` ,obj)
        }
        else
        {
            return http.put(`${state.url}campuses/${obj.id}` ,obj)
        }
    },
    delete (state , obj) {
        return http.delete(`${state.url}campuses/${obj.id}` ,obj)
    },
}
