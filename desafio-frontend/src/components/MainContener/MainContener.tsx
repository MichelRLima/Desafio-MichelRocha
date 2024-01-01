import React from 'react'
import styles from './MainContener.module.css'
import BimestreComponent from '../BimestreComponent/BimestreComponent'

const MainContener = () => {




    const primeiroBimestre: string = "PRIMEIRO";
    const segundoBimestre: string = "SEGUNDO";
    const terceiroBimestre: string = "TERCEIRO";
    const quartoBimestre: string = "QUARTO";



    return (
        <div className={styles.MainContent}>
            <BimestreComponent bimestre={primeiroBimestre} ></BimestreComponent>
            <BimestreComponent bimestre={segundoBimestre}></BimestreComponent>
            <BimestreComponent bimestre={terceiroBimestre}></BimestreComponent>
            <BimestreComponent bimestre={quartoBimestre}></BimestreComponent>





        </div>


    )

}

export default MainContener