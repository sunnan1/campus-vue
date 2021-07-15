import Errors from './Errors'

class DesignationForm
{
    constructor ($store) {
        this.store = $store
        this.errors = new Errors()
    }

    post (obj)
    {
        return this.store.dispatch('settingData/postDesignation', obj)
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

export default DesignationForm
