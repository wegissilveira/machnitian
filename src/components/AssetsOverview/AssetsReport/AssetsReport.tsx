import classes from "./AssetsReport.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import TAssetsReport from "models/AssetsReportModel"


type Props = {
   assetsReport: TAssetsReport
}

const AssetsReport = (props: Props) => {
   const { assetsReport } = props
   const { 
      totalAssets, 
      assetsInOperation, 
      assetsInAlert, 
      assetsInDowntime 
   } = assetsReport

   return (
      <div className={classes["assetsReport-container"]}>
         <p>
            <span>Total:</span> {totalAssets} assets
         </p>
         <p>
            <FontAwesomeIcon icon={["fas", "check-circle"]} color="#2563eb" />{" "}
            <span> Funcionando:</span> {assetsInOperation}{" "}
            assets
         </p>
         <p>
            <FontAwesomeIcon
               icon={["fas", "exclamation-triangle"]}
               color="#ffad00"
            />{" "}
            <span> Em alerta:</span> {assetsInAlert} assets
         </p>
         <p>
            <FontAwesomeIcon icon={["fas", "minus-square"]} color="#ff2e3b" />{" "}
            <span> Paradas:</span> {assetsInDowntime} assets
         </p>
      </div>
   )
}

export default AssetsReport
