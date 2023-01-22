import classes from "./ItemsList.module.scss"
import { Link } from "react-router-dom"


type itemsBaseType = {
   id: number
   name: string
}

export type ItemsListType<T> = {
   title: string
   header: string[]
   values: T[]
}

type Props<T> = {
   itemsListDetails: ItemsListType<T>
}

const ItemsList = <T extends itemsBaseType >(props: Props<T>) => {
   const { 
      itemsListDetails
   } = props

   return (
      <div className={classes["AssetsList-container"]}>
         <h1>{itemsListDetails.title}</h1>
         <table>
            <thead>
               <tr>
                  {Object.keys(itemsListDetails).length > 0 && itemsListDetails.header.map((item, index) => {
                     return <th key={`${item}-${index}`} scope="col">{item}</th>
                  })}
               </tr>
            </thead>
            <tbody>
            {Object.keys(itemsListDetails).length > 0 && itemsListDetails.values.map((item, index) => (
               <tr key={index}>
               {
                  Object.keys(item).map((key, index) => {
                     const k = key as keyof T                                         
                     return (
                        key !== 'link' &&
                           <td key={key+'-'+index} >
                              {(item).hasOwnProperty('link') ? <Link to={`${process.env.PUBLIC_URL}/asset/${item.id}`}>{item[k]}</Link> : item[k] }
                           </td>
                     )
                  })
               }
               </tr>
            ))}
            </tbody>
         </table>
      </div>
   )
}

export default ItemsList
