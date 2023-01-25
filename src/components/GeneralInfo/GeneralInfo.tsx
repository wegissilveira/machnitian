import classes from './GeneralInfo.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const GeneralInfo = () => {
   return (
      <div className={classes['GeneralInfo-wrapper']}>
         <h3 className={classes['GeneralInfo-header']}>Informações Gerais</h3>
         <div className={classes['GeneralInfo-container']}>
            <div className={classes['GeneralInfo-subContainer']}>
               <FontAwesomeIcon icon={["fas", "gears"]} size={'3x'} />
               <p className={classes['GeneralInfo-data']}>1.234</p>
               <p className={classes['GeneralInfo-item']}>Ativos</p>
            </div>
         </div>
      </div>
   )
}

export default GeneralInfo