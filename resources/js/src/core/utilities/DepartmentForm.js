import Errors from './Errors'

class DepartmentForm
{
    constructor ($store) {
        this.store = $store
        this.errors = new Errors()
    }

    post (obj , type)
    {
        return this.store.dispatch('adminData/postDepartment', {
            'OBJ' : obj,
            'type': type
        })
    }

    record (error) {

        if (error.response.status === 401 && (typeof error.response.data.message === 'string')) {
            this.errors.record({message : error.response.data.message})
        }
        if (error.response.status === 422 && (typeof error.response.data.message === 'object')) {
            this.errors.record(error.response.data.message)
        }

    }
}

export default DepartmentForm
