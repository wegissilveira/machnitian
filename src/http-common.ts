import axios from "axios"

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