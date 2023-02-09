import classes from "./ItemsList.module.scss"
import Link from "next/link"


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

const ItemsList = <T extends itemsBaseType>(props: Props<T>) => {
   const { 
      itemsListDetails
   } = props

   if (!Object.keys(itemsListDetails).length) {
      return null;
   }

   return (
      <div className={classes["AssetsList-container"]}>
         <h1>{itemsListDetails.title}</h1>
         <table>
            <thead>
               <tr>
                  {itemsListDetails.header.map((item, index) => {
                     return <th key={`${item}-${index}`} scope="col">{item}</th>
                  })}
               </tr>
            </thead>
            <tbody>
            {itemsListDetails.values.map((item) => (
               <tr key={item.id}>
               {
                  Object.keys(item).map((key) => {
                     const k = key as keyof T                                         
                     return (
                        key !== 'link' &&
                           <td key={key} >
                              {(item).hasOwnProperty('link') ? <Link href={`${process.env.PUBLIC_URL}/assets-list/asset/${item.id}`} >{item[k]}</Link> : item[k] }
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