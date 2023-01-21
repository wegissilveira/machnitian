import { http, httpAll } from 'http-common'

const getAll = () => {
    return httpAll
}

// const getAllTeste = () => {
//     return httpAllTeste
// }

const getAllAssets = () => {
    return http.get('/assets')
}

const getAsset = (id: string | number) => {
    return http.get('/assets/'+id)
}

const getAllUsers = () => {
    return http.get('/users')
}

const getUser = (id: string | number) => {
    return http.get('/users/'+id)
}

const getAllUnits = () => {
    return http.get('/units')
}

const getUnity = (id: string | number) => {
    return http.get('/units/'+id)
}

const getCompany = (id: string | number) => {
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
    // getAllTeste
}

export default AssetsService