import { useState, useEffect } from "react"

import classes from "./Overview.module.scss"

import IAssetsData from "models/AssetsModel"
import IUsersData from "models/UsersModel"
import ICompanyData from "models/CompanyModel"
import IUnitsData from "models/UnitsModel"

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


type Props = {
	values: IUsersData[] | ICompanyData[] | IUnitsData[] | IAssetsData[]
	title: string
	link?: string
}

const Overview = (props: Props) => {
	const { values, title, link } = props

   const [header, setHeader] = useState<number | string | null>(0)
	

   useEffect(() => {
      if (title !== "Empresa") {
         setHeader(values.length)
      } else {
         let companyName: ""
         const value: any[] = Object.values(values)
         companyName = value[1]
         setHeader(companyName)
      }
   }, [values, title])

   return (
      <>
         {link && (
            <Link to={`${process.env.PUBLIC_URL}/${link}`}>
               <div className={classes["Overview-container"]}>
                  <p>
                     <span>{title}:</span> {header}
                  </p>
                  <FontAwesomeIcon icon={["fas", "eye"]} color="#1e3c8f" />
               </div>
            </Link>
         )}
         {!link && (
            <div className={classes["Overview-container"]}>
               <p>
                  <span>{title}:</span> {header}
               </p>
            </div>
         )}
      </>
   )
}

export default Overview
