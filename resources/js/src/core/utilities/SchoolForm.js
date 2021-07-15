import Errors from './Errors'

class SchoolForm {

    constructor ($store) {
        this.$store = $store
        this.errors = new Errors()
    }


    post(school_info , id)
    {
        return this.$store.dispatch('adminData/putSchool', {
            'obj' : school_info,
            'id' : id
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

export default SchoolForm
