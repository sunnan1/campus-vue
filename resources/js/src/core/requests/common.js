import http from '../../HTTPRequest'
export default {

    countries (state) {
        return http.get(`${state.url}countries`)
    },
    currencies (state) {
        return http.get(`${state.url}currencies`)
    },
    timezone (state) {
        return http.get(`${state.url}timezone`)
    },
    dateformates (state) {
        return http.get(`${state.url}dateformates`)
    },
    timeformates (state) {
        return http.get(`${state.url}timeformates`)
    },
    designations (state) {
        return http.get(`${state.url}designations`)
    },
    updatecampus (state , campus) {
        return http.post(`${state.url}campuses/${campus}/current`, {})
    },
    refreshtoken (state) {
        return http.post(`${state.url}auth/refresh`, {})
    },
    fetch (state , module ,obj = null)
    {
        if(obj.OBJ) {
            return http.get(`${state.url}${module}?page=${obj.OBJ.page}`)
        }
        else if(obj.id){
            return http.get(`${state.url}${module}/${obj.id}`)
        }
        else if(obj.pagination){
            return http.get(`${state.url}${module}?pagination=no`)
        }
        else {
            return http.get(`${state.url}${module}`)
        }
    },
    post (state , obj , module)
    {
        if(obj.id == '' || obj.id == null)
        {
            return http.post(`${state.url}${module}` ,obj)
        }
        else
        {
            return http.put(`${state.url}${module}/${obj.id}` ,obj)
        }
    },
    delete (state , obj , module)
    {
        return http.delete(`${state.url}${module}/${obj}` ,obj)
    },

    execute (state, module , obj) {
        if(obj.type == state.get) {
            return this.fetch(state , module , obj)
        }
        else if(obj.type == state.post) {
            return this.post(state , obj.OBJ , module)
        }
        else if(obj.type == state.delete) {
            return this.delete(state , obj.id , module)
        }
    },
    executeClassSection (state, module, obj) {
        if (obj.OBJ.pagination) {
            return http.get(`${state.url}classes/${obj.OBJ.classid}/${module}?pagination=no`)
        }
        else {
            return http.get(`${state.url}classes/${obj.OBJ.classid}/${module}`)
        }
    },
    getSectionSubjects (state, module, obj) {
        return http.get(`${state.url}sections/${obj.OBJ.sectionid}/${module}`)
    },
    saveSectionSubjects (state, module, obj) {
        return http.post(`${state.url}sections/${obj.id}/${module}` , obj.OBJ)
    },
}
