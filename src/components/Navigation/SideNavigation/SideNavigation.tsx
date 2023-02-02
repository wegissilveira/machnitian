import classes from "./SideNavigation.module.scss"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LogoIcon from "components/ui/Logo"


const SideNavigation = () => {
   return (
      <div className={classes["SideNavigation--wrapper"]}>
         <ul className={classes["SideNavigation--navigation-items"]}>
            <LogoIcon />
            <li><NavLink to={`${process.env.PUBLIC_URL}/`} exact>Overview</NavLink></li>
            <li><NavLink to={`${process.env.PUBLIC_URL}/assets-list` } >Ativos</NavLink></li>
            <li><NavLink to={`${process.env.PUBLIC_URL}/users-list`} exact>Usuários</NavLink></li>
            <li><NavLink to={`${process.env.PUBLIC_URL}/units-list`} exact>Unidades</NavLink></li>
         </ul>
         <div className={classes['SideNavigation--bottom']}>
            <a href="https://www.wegis.com.br">Wegis Silveira
               <FontAwesomeIcon
                  className={classes["SideNavigation--dev"]}
                  icon={["fas", "computer"]}
               />
            </a>
         </div>
      </div>
   )
}

export default SideNavigation
