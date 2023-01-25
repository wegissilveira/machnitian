import classes from './AssetsOverviewCircle.module.scss'

import { CircularProgressbarWithChildren, buildStyles   } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


type Props ={
   text: string
   color: string
   value: number
}

const AssetsOverviewCircle = (props: Props) => {
   const { text, color, value } = props


   return (
      <div className={classes['AssetsOverview-wrapper']}>
         <CircularProgressbarWithChildren 
            value={value} 
            circleRatio={1} 
            styles={buildStyles({pathColor: color, trailColor: '#fff'})}
            >
            <span className={classes["AssetsOverview-text"]} style={{color: color}}>{Math.floor(value)}%</span>
         </CircularProgressbarWithChildren>
         <p className={classes['AssetsOverview-status']}  style={{backgroundColor: color}}>{text}</p>
      </div>
   )
}

export default AssetsOverviewCircle