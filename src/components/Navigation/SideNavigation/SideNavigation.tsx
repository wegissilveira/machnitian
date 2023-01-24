import classes from "./SideNavigation.module.scss"
import { Link } from "react-router-dom"


const SideNavigation = () => {
   // CRIAR LÓGICA PARA ATIVAÇÃO SOMENTE DO ITEM DA PÁGINA ATUAL
   return (
      <div className={classes["SideNavigation--wrapper"]}>
         <ul className={classes["SideNavigation--navigation-items"]}>
            <h1>LOGO</h1>
            <li><Link to={`${process.env.PUBLIC_URL}/`}>Overview</Link></li>
            <li><Link to={`${process.env.PUBLIC_URL}/assets-list`}>Ativos</Link></li>
            <li><Link to={`${process.env.PUBLIC_URL}/users-list`}>Usuários</Link></li>
            <li><Link to={`${process.env.PUBLIC_URL}/units-list`}>Unidades</Link></li>
         </ul>
      </div>
   )
}

export default SideNavigation
