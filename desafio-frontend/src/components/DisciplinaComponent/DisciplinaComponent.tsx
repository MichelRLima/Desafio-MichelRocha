import React from 'react'
import styles from './MateriaComponent.module.css'
import { Tooltip } from 'react-tooltip'



interface Props {
    disciplina: string,
    nota: number,
    criadoEm: Date,
    colorCard: string,
    disciplina_id: string


}

const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
});
const DisciplinaComponent = (props: Props) => {

    const getCorComBaseNaNota = (nota: number): string => {
        if (nota < 6) {
            return '#FF5964';
        } else if (nota < 8) {
            return '#FFFF99';
        } else {
            return '#05FF00';
        }
    };



    return (
        <div className={styles.MateriaComponent}>
            <div style={{ backgroundColor: `${props.colorCard}` }} className={styles.disciplina}>
                <p className={styles.TituloDisciplina}>{props.disciplina}</p>
                <p className={styles.Data}>{formatter.format(props.criadoEm)}</p>
                <div className={styles.NotaContent}>
                    <svg data-tooltip-id="my-tooltip" className={styles.Iconteste} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.98293 8.77692V14.355" stroke={getCorComBaseNaNota(props.nota)} stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.7303 6.10727V14.3555" stroke={getCorComBaseNaNota(props.nota)} stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14.416 11.7246V14.3553" stroke={getCorComBaseNaNota(props.nota)} stroke-linecap="round" stroke-linejoin="round" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.71771 10.2568C2.71771 4.17174 4.7213 2.14279 10.7303 2.14279C16.7393 2.14279 18.7429 4.17174 18.7429 10.2568C18.7429 16.3419 16.7393 18.3709 10.7303 18.3709C4.7213 18.3709 2.71771 16.3419 2.71771 10.2568Z" stroke={getCorComBaseNaNota(props.nota)} stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <p style={{ color: getCorComBaseNaNota(props.nota) }} className={styles.TituloNota}>
                        Nota: {props.nota}
                    </p>
                </div>

            </div>

            <Tooltip id="my-tooltip" />





        </div>


    )

}

export default DisciplinaComponent