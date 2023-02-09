import classes from "./SideNavigation.module.scss"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LogoIcon from "components/ui/Logo"


const SideNavigation = () => {
   return (
      <div className={classes["SideNavigation--wrapper"]}>
         <ul className={classes["SideNavigation--navigation-items"]}>
            <LogoIcon />
            <li><Link href={`${process.env.PUBLIC_URL}/`}>Overview</Link></li>
            <li><Link href={`${process.env.PUBLIC_URL}/assets-list` } >Ativos</Link></li>
            <li><Link href={`${process.env.PUBLIC_URL}/users-list`}>Usuários</Link></li>
            <li><Link href={`${process.env.PUBLIC_URL}/units-list`}>Unidades</Link></li>
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
