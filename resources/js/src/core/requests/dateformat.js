import http from '../../HTTPRequest'

export default  {

    fetch (state , obj) {
        if (obj.OBJ) {
            return http.get(`${state.url}dateformates?page=${obj.OBJ.page}`)
        }
        else {
            return http.get(`${state.url}dateformates`)

        }
    },

    post (state , obj) {
        if(obj.id == '' || obj.id == null)
        {
            return http.post(`${state.url}dateformates` , obj)

        }
        else
        {
            return http.put(`${state.url}dateformates/${obj.id}` , obj)
        }
    },

    remove (state , obj) {
        return http.delete(`${state.url}dateformates/${obj.id}`)
    },

    execute (state , obj) {
      if(obj.type == state.get) {
          return this.fetch(state, obj)
      }
      else if(obj.type == state.post) {
          return this.post(state , obj)
      }
      else if(obj.type == state.delete) {
          return this.remove(state , obj)
      }
    }

}
