import { http, httpAll } from '../http-common'

const getAll = () => {
    return httpAll
}

const getAllAssets = () => {
    return http.get('/assets')
}

const getAsset = (id: string) => {
    return http.get('/assets/'+id)
}

const getAllUsers = () => {
    return http.get('/users')
}

const getUser = (id: string) => {
    return http.get('/users/'+id)
}

const getAllUnits = () => {
    return http.get('/units')
}

const getUnity = (id: string) => {
    return http.get('/units/'+id)
}

const getCompany = (id: string) => {
    return http.get('/companies'+id)
}

const AssetsService = {
    getAllAssets,
    getAsset,
    getAllUsers,
    getUser,
    getAllUnits,
    getUnity,
    getCompany,
    getAll
}

export default AssetsService