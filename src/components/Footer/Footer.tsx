import classes from "./Footer.module.scss"

const Footer = () => {
   return (
      <div className={classes["Footer-container"]}>
         <p>
            Desenvolvido por{" "}
            <a href="https://www.wegis.com.br">Wegis Silveira</a>
         </p>
      </div>
   )
}

export default Footer
