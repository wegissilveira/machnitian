import axios from "axios"

// import IAssetsData from "models/AssetsModel"
// import ICompanyData from "models/CompanyModel"
// import IUnitsData from "models/UnitsModel"
// import IUsersData from "models/UsersModel"

export const http = axios.create({
   baseURL: "https://my-json-server.typicode.com/tractian/fake-api",
   headers: {
      content: {
         "Content-type": "application/json",
      },
   },
})

export const httpAll = axios.all([
   axios.get("https://my-json-server.typicode.com/tractian/fake-api/assets"),
   axios.get("https://my-json-server.typicode.com/tractian/fake-api/users"),
   axios.get("https://my-json-server.typicode.com/tractian/fake-api/units"),
   axios.get(
      "https://my-json-server.typicode.com/tractian/fake-api/companies/1"
   ),
])

// const urlBase = "https://my-json-server.typicode.com/tractian/fake-api"

// const assetsApi = `${urlBase}/assets`
// const usersApi = `${urlBase}/users`
// const companyApi = `${urlBase}/companies/1`
// const unitsApi = `${urlBase}/units`

// async function getAssets(): Promise<IAssetsData[]> {
//    try {
//       const response = await axios.get<IAssetsData[]>(assetsApi)
//       return response.data
//    } catch (error) {
//       console.error(error)
//       throw error
//    }
// }

// async function getUsers(): Promise<IUsersData[]> {
//    try {
//       const response = await axios.get<IUsersData[]>(usersApi)
//       return response.data
//    } catch (error) {
//       console.error(error)
//       throw error
//    }
// }

// async function getCompanies(): Promise<ICompanyData> {
//    try {
//       const response = await axios.get<ICompanyData>(companyApi)
//       return response.data
//    } catch (error) {
//       console.error(error)
//       throw error
//    }
// }

// async function getUnits(): Promise<IUnitsData[]> {
//    try {
//       const response = await axios.get<IUnitsData[]>(unitsApi)
//       return response.data
//    } catch (error) {
//       console.error(error)
//       throw error
//    }
// }

// Talvez substituir axios.all por Promise.all após compreender o fluxo da aplicação
// VOu deixar as funções aqui, mas não a princípio não fazem sentido. 
// Caso eu use Promise.all, se não surgir nenhuma info nova substituir as funções pelas urls

// export const httpAllTeste = Promise.all([
//    getAssets(),
//    getUsers(),
//    getCompanies(),
//    getUnits(),
// ])

/* ******** */


