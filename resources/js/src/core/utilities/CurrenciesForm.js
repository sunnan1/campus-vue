import Errors from './Errors'

class CurrenciesForm
{
    constructor ($store) {
        this.store = $store
        this.errors = new Errors()
    }

    post (obj)
    {
        return this.store.dispatch('settingData/processCurrencies', obj)
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

export default CurrenciesForm
