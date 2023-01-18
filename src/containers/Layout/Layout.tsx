import Classes from './Layout.module.scss'

import Navigation from "components/Navigation/Navigation"
import Footer from "components/Footer/Footer"

type Props = {
   children: React.ReactNode
}

const Layout = (props: Props) => {
   const {
      children
   } = props

   return (
      <div className={Classes['Main-wrapper']}>
         <Navigation />
         <main>{children}</main>
         <Footer />
      </div>
   )
}

export default Layout
