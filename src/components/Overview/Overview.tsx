import { useState, useEffect } from "react"

import classes from "./Overview.module.scss"

import IAssetsData from "models/AssetsModel"
import IUsersData from "models/UsersModel"
import ICompanyData from "models/CompanyModel"
import IUnitsData from "models/UnitsModel"

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconName } from "@fortawesome/fontawesome-svg-core"


type Props = {
	values: IUsersData[] | ICompanyData[] | IUnitsData[] | IAssetsData[]
	title: string
	link?: string
   icon: IconName
   color: string
}

const Overview = (props: Props) => {
	const { 
      values, 
      title, 
      link,
      icon,
      color
   } = props

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
      <Link href={`${process.env.PUBLIC_URL}/${link}`}>
         <div className={classes["Overview-container"]}>
            <p>
               <span>{title}:</span> {header}
            </p>
            <FontAwesomeIcon icon={["fas", icon]} color={color} />
         </div>
      </Link>
   )
}

export default Overview
