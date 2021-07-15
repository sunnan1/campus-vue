import http from "../../HTTPRequest";

export default  {

    fetch (state) {
        return http.get(`${state.url}departmenttype`)
    },

}
