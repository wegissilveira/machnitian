import axios from "axios"

export const http = axios.create({
   baseURL: "https://my-json-server.typicode.com/wegissilveira/machnitian-api",
   headers: {
      content: {
         "Content-type": "application/json",
      },
   },
})

export const httpAll = axios.all([
   axios.get("https://my-json-server.typicode.com/wegissilveira/machnitian-api/assets"),
   axios.get("https://my-json-server.typicode.com/wegissilveira/machnitian-api/users"),
   axios.get("https://my-json-server.typicode.com/wegissilveira/machnitian-api/units"),
   axios.get(
      "https://my-json-server.typicode.com/wegissilveira/machnitian-api/companies/1"
   ),
])