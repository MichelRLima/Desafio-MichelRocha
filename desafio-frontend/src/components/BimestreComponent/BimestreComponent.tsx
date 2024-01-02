
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BimestreComponent.module.css'
import DisciplinaComponent from '../DisciplinaComponent/DisciplinaComponent'

import { GrClose } from "react-icons/gr";
import { Tooltip } from 'react-tooltip'
import { alertErro } from '../../Alerts/alertErro';
import { alertSucess } from '../../Alerts/alertSucess';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

interface Props {
    bimestre: string
}

interface modelDisciplina {
    id: string;
    bimestre: string;
    disciplina: string;
    nota: number;
    criadoEm: string;
}


const BimestreComponent = (props: Props) => {
    const [isCardVisible, setIsCardVisible] = useState<boolean>(false);
    const [disciplinas, setDisciplinas] = useState<modelDisciplina[]>([]);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<string>("")
    const [nota, setNota] = useState<number>()

    //ATUALIZAR DISCIPLINAS AO CARREGAR A PAGINA
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get('https://desafio-backend-fd7h.onrender.com/disciplina/list');
                const todasDisciplinas: modelDisciplina[] = response.data;
                const disciplinasBimestre: modelDisciplina[] = todasDisciplinas.filter((obj) => obj.bimestre === props.bimestre);
                setDisciplinas(disciplinasBimestre);

            } catch (error) {
                console.error("Erro ao listar disciplinas", error)

            }
        };


        fetchData();
    }, [props.bimestre]);

    //função necessaria para fazer escrever "1" em vez de "PRIMEIRO" no titulo do componente
    const getNumeroBimestre = () => {
        switch (props.bimestre) {
            case "PRIMEIRO":
                return "1";
            case "SEGUNDO":
                return "2";
            case "TERCEIRO":
                return "3";
            case "QUARTO":
                return "4";
            default:
                return "DESCONHECIDO";
        }
    }

    //função necessaria para alterar a cor do card de cada disciplina quando puxar da API
    const getColorCard = (disciplina: string): string => {
        switch (disciplina) {
            case 'Geografia':
                return '#c26719';
            case 'Biologia':
                return '#cc4090';
            case 'Sociologia':
                return '#9b19c2'
            case 'Artes':
                return '#05a2c2';
            default:
                return '#000000'; // Cor padrão ou outra cor de sua escolha
        }
    };

    //FUNÇÃO PARA ADICIONAR DISCIPLINAS
    const adicionarDisciplina = async () => {
        // Verifica se a disciplina já existe no bimestre
        const disciplinaExistente = disciplinas.find(
            (disciplina) =>
                disciplina.bimestre === props.bimestre &&
                disciplina.disciplina === disciplinaSelecionada
        );
        // Se a disciplina já existe, mostra um alert e não continua com a requisição POST
        if (disciplinaExistente) {

            alertErro('Disciplina já existe neste bimestre!');
            return;
        }
        //Se nao for informando nenhuma disciplina ou nota, mostrar alerta
        if (!nota || !disciplinaSelecionada) {
            alertErro('Por favor adicionar todos os dados');
            return;
        }

        // Se a nota nao corresponder as condições, apresentar alerta
        if (nota < 0 || nota > 10) {
            alertErro('A nota deve estar no intervalo de 0 a 10.');
            return;
        }

        // Se a disciplina não existe e a nota está no intervalo permitido, continua com a requisição POST
        try {
            const response = await fetch('https://desafio-backend-fd7h.onrender.com/disciplina', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bimestre: props.bimestre,
                    disciplina: disciplinaSelecionada,
                    nota: nota,
                }),
            });

            const data = await response.json();
            console.log(data);
            setDisciplinas([...disciplinas, data]);
            setIsCardVisible(!isCardVisible);
            alertSucess("Disciplina adicionada")
        } catch (error) {
            console.error('Erro ao fazer a solicitação POST:', error);
            alertErro("Erro ao fazer a solicitação POST")
        }
    };



    //FUNÇÃO PARA EXCLUIR DISCIPLINAS
    const excluirDisciplina = async (id: string) => {
        Swal.fire({
            title: "Deseja deletar a disciplina?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://desafio-backend-fd7h.onrender.com/disciplina/remove?disciplina_id=${id}`);
                    setDisciplinas((prevDisciplinas) => prevDisciplinas.filter((disciplina) => disciplina.id !== id));
                    console.log('Excluiu disciplina');

                    Swal.fire({
                        title: "Disciplina Deletada",
                        icon: "success"
                    });
                } catch (error) {
                    console.error('Erro ao excluir disciplina:', error);
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred while deleting the file.",
                        icon: "error"
                    });
                }
            }
        });
    };



    return (
        <div className={styles.BimestreContener}>
            <ToastContainer /> {/* LIB React-Toastify */}
            <div className={styles.TituloContener}>
                <h4 className={styles.TextBimestre}>Bimestre {getNumeroBimestre()}</h4>

                {/* Icone na versao da tela menor (mobile)*/}
                <svg clipRule="evenodd"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Adicionar"
                    data-tooltip-place="top" onClick={() => setIsCardVisible(!isCardVisible)} className={styles.IconMore} width="172" height="158" viewBox="0 0 172 158" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_2_1005)">
                        <rect x="60" y="40.7239" width="58" height="37" rx="12" fill="#E9FF1A" shape-rendering="crispEdges" />
                        <path d="M101 59.2239C101 59.4891 100.895 59.7434 100.707 59.931C100.52 60.1185 100.265 60.2239 100 60.2239H90V70.2239C90 70.4891 89.8946 70.7434 89.7071 70.931C89.5196 71.1185 89.2652 71.2239 89 71.2239C88.7348 71.2239 88.4804 71.1185 88.2929 70.931C88.1054 70.7434 88 70.4891 88 70.2239V60.2239H78C77.7348 60.2239 77.4804 60.1185 77.2929 59.931C77.1054 59.7434 77 59.4891 77 59.2239C77 58.9587 77.1054 58.7043 77.2929 58.5168C77.4804 58.3292 77.7348 58.2239 78 58.2239H88V48.2239C88 47.9587 88.1054 47.7043 88.2929 47.5168C88.4804 47.3292 88.7348 47.2239 89 47.2239C89.2652 47.2239 89.5196 47.3292 89.7071 47.5168C89.8946 47.7043 90 47.9587 90 48.2239V58.2239H100C100.265 58.2239 100.52 58.3292 100.707 58.5168C100.895 58.7043 101 58.9587 101 59.2239Z" fill="black" />
                    </g>
                    <defs>
                        <filter id="filter0_d_2_1005" x="0" y="0.723877" width="178" height="157" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="20" />
                            <feGaussianBlur stdDeviation="30" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_1005" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_1005" result="shape" />
                        </filter>
                    </defs>
                </svg>

                {/* Icone na versao da tela maior (Desktop)*/}
                <svg data-tooltip-id="my-tooltip"
                    data-tooltip-content="Adicionar"
                    data-tooltip-place="top" onClick={() => setIsCardVisible(!isCardVisible)} className={styles.IconMoreDesktop} width="303" height="157" viewBox="0 0 303 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_13_252)">
                        <rect x="60" y="40" width="183" height="37" rx="12" fill="#E9FF1A" shape-rendering="crispEdges" />
                        <path d="M82.8946 64.5V53.3H84.9746V62.74H90.8306V64.5H82.8946ZM97.5604 64.5V62.772L97.4484 62.404V59.38C97.4484 58.7933 97.2724 58.34 96.9204 58.02C96.5684 57.6893 96.035 57.524 95.3204 57.524C94.8404 57.524 94.3657 57.5987 93.8964 57.748C93.4377 57.8973 93.0484 58.1053 92.7284 58.372L91.9444 56.916C92.403 56.564 92.947 56.3027 93.5764 56.132C94.2164 55.9507 94.8777 55.86 95.5604 55.86C96.7977 55.86 97.7524 56.1587 98.4244 56.756C99.107 57.3427 99.4484 58.2547 99.4484 59.492V64.5H97.5604ZM94.8724 64.612C94.2324 64.612 93.6724 64.5053 93.1924 64.292C92.7124 64.068 92.339 63.764 92.0724 63.38C91.8164 62.9853 91.6884 62.5427 91.6884 62.052C91.6884 61.572 91.8004 61.14 92.0244 60.756C92.259 60.372 92.6377 60.068 93.1604 59.844C93.683 59.62 94.3764 59.508 95.2404 59.508H97.7204V60.836H95.3844C94.7017 60.836 94.243 60.948 94.0084 61.172C93.7737 61.3853 93.6564 61.652 93.6564 61.972C93.6564 62.3347 93.8004 62.6227 94.0884 62.836C94.3764 63.0493 94.7764 63.156 95.2884 63.156C95.779 63.156 96.2164 63.044 96.6004 62.82C96.995 62.596 97.2777 62.2653 97.4484 61.828L97.7844 63.028C97.5924 63.5293 97.2457 63.9187 96.7444 64.196C96.2537 64.4733 95.6297 64.612 94.8724 64.612ZM106.863 55.86C107.546 55.86 108.154 55.9933 108.687 56.26C109.231 56.5267 109.658 56.9373 109.967 57.492C110.276 58.036 110.431 58.74 110.431 59.604V64.5H108.431V59.86C108.431 59.1027 108.25 58.5373 107.887 58.164C107.535 57.7907 107.039 57.604 106.399 57.604C105.93 57.604 105.514 57.7 105.151 57.892C104.788 58.084 104.506 58.372 104.303 58.756C104.111 59.1293 104.015 59.604 104.015 60.18V64.5H102.015V55.956H103.919V58.26L103.583 57.556C103.882 57.012 104.314 56.596 104.879 56.308C105.455 56.0093 106.116 55.86 106.863 55.86ZM116.904 64.612C116.008 64.612 115.208 64.4253 114.504 64.052C113.811 63.668 113.267 63.1453 112.872 62.484C112.477 61.8227 112.28 61.0707 112.28 60.228C112.28 59.3747 112.477 58.6227 112.872 57.972C113.267 57.3107 113.811 56.7933 114.504 56.42C115.208 56.0467 116.008 55.86 116.904 55.86C117.736 55.86 118.467 56.0307 119.096 56.372C119.736 56.7027 120.221 57.1933 120.552 57.844L119.016 58.74C118.76 58.3347 118.445 58.036 118.072 57.844C117.709 57.652 117.315 57.556 116.888 57.556C116.397 57.556 115.955 57.6627 115.56 57.876C115.165 58.0893 114.856 58.3987 114.632 58.804C114.408 59.1987 114.296 59.6733 114.296 60.228C114.296 60.7827 114.408 61.2627 114.632 61.668C114.856 62.0627 115.165 62.3667 115.56 62.58C115.955 62.7933 116.397 62.9 116.888 62.9C117.315 62.9 117.709 62.804 118.072 62.612C118.445 62.42 118.76 62.1213 119.016 61.716L120.552 62.612C120.221 63.252 119.736 63.748 119.096 64.1C118.467 64.4413 117.736 64.612 116.904 64.612ZM116.072 68.148C115.784 68.148 115.517 68.116 115.272 68.052C115.027 67.9987 114.803 67.9187 114.6 67.812L114.968 66.868C115.139 66.9533 115.309 67.0173 115.48 67.06C115.661 67.1027 115.853 67.124 116.056 67.124C116.365 67.124 116.584 67.0707 116.712 66.964C116.84 66.8573 116.904 66.7187 116.904 66.548C116.904 66.388 116.835 66.26 116.696 66.164C116.568 66.068 116.355 66.02 116.056 66.02H115.56L115.992 64.388H117.08L116.856 65.284C117.325 65.3373 117.672 65.4867 117.896 65.732C118.131 65.988 118.248 66.2867 118.248 66.628C118.248 67.0973 118.051 67.4653 117.656 67.732C117.261 68.0093 116.733 68.148 116.072 68.148ZM127.545 64.5V62.772L127.433 62.404V59.38C127.433 58.7933 127.257 58.34 126.905 58.02C126.553 57.6893 126.019 57.524 125.305 57.524C124.825 57.524 124.35 57.5987 123.881 57.748C123.422 57.8973 123.033 58.1053 122.713 58.372L121.929 56.916C122.387 56.564 122.931 56.3027 123.561 56.132C124.201 55.9507 124.862 55.86 125.545 55.86C126.782 55.86 127.737 56.1587 128.409 56.756C129.091 57.3427 129.433 58.2547 129.433 59.492V64.5H127.545ZM124.857 64.612C124.217 64.612 123.657 64.5053 123.177 64.292C122.697 64.068 122.323 63.764 122.057 63.38C121.801 62.9853 121.673 62.5427 121.673 62.052C121.673 61.572 121.785 61.14 122.009 60.756C122.243 60.372 122.622 60.068 123.145 59.844C123.667 59.62 124.361 59.508 125.225 59.508H127.705V60.836H125.369C124.686 60.836 124.227 60.948 123.993 61.172C123.758 61.3853 123.641 61.652 123.641 61.972C123.641 62.3347 123.785 62.6227 124.073 62.836C124.361 63.0493 124.761 63.156 125.273 63.156C125.763 63.156 126.201 63.044 126.585 62.82C126.979 62.596 127.262 62.2653 127.433 61.828L127.769 63.028C127.577 63.5293 127.23 63.9187 126.729 64.196C126.238 64.4733 125.614 64.612 124.857 64.612ZM132 64.5V55.956H133.904V58.308L133.68 57.62C133.936 57.044 134.336 56.6067 134.88 56.308C135.434 56.0093 136.122 55.86 136.944 55.86V57.764C136.858 57.7427 136.778 57.732 136.704 57.732C136.629 57.7213 136.554 57.716 136.48 57.716C135.722 57.716 135.12 57.94 134.672 58.388C134.224 58.8253 134 59.4813 134 60.356V64.5H132ZM147.988 55.86C148.671 55.86 149.279 55.9933 149.812 56.26C150.356 56.5267 150.783 56.9373 151.092 57.492C151.401 58.036 151.556 58.74 151.556 59.604V64.5H149.556V59.86C149.556 59.1027 149.375 58.5373 149.012 58.164C148.66 57.7907 148.164 57.604 147.524 57.604C147.055 57.604 146.639 57.7 146.276 57.892C145.913 58.084 145.631 58.372 145.428 58.756C145.236 59.1293 145.14 59.604 145.14 60.18V64.5H143.14V55.956H145.044V58.26L144.708 57.556C145.007 57.012 145.439 56.596 146.004 56.308C146.58 56.0093 147.241 55.86 147.988 55.86ZM157.949 64.612C157.074 64.612 156.296 64.4253 155.613 64.052C154.93 63.668 154.392 63.1453 153.997 62.484C153.602 61.8227 153.405 61.0707 153.405 60.228C153.405 59.3747 153.602 58.6227 153.997 57.972C154.392 57.3107 154.93 56.7933 155.613 56.42C156.296 56.0467 157.074 55.86 157.949 55.86C158.834 55.86 159.618 56.0467 160.301 56.42C160.994 56.7933 161.533 57.3053 161.917 57.956C162.312 58.6067 162.509 59.364 162.509 60.228C162.509 61.0707 162.312 61.8227 161.917 62.484C161.533 63.1453 160.994 63.668 160.301 64.052C159.618 64.4253 158.834 64.612 157.949 64.612ZM157.949 62.9C158.44 62.9 158.877 62.7933 159.261 62.58C159.645 62.3667 159.944 62.0573 160.157 61.652C160.381 61.2467 160.493 60.772 160.493 60.228C160.493 59.6733 160.381 59.1987 160.157 58.804C159.944 58.3987 159.645 58.0893 159.261 57.876C158.877 57.6627 158.445 57.556 157.965 57.556C157.474 57.556 157.037 57.6627 156.653 57.876C156.28 58.0893 155.981 58.3987 155.757 58.804C155.533 59.1987 155.421 59.6733 155.421 60.228C155.421 60.772 155.533 61.2467 155.757 61.652C155.981 62.0573 156.28 62.3667 156.653 62.58C157.037 62.7933 157.469 62.9 157.949 62.9ZM167.637 64.612C166.699 64.612 165.973 64.372 165.461 63.892C164.949 63.4013 164.693 62.6813 164.693 61.732V54.068H166.693V61.684C166.693 62.0893 166.795 62.404 166.997 62.628C167.211 62.852 167.504 62.964 167.877 62.964C168.325 62.964 168.699 62.8467 168.997 62.612L169.557 64.036C169.323 64.228 169.035 64.372 168.693 64.468C168.352 64.564 168 64.612 167.637 64.612ZM163.285 57.62V56.02H168.981V57.62H163.285ZM176.467 64.5V62.772L176.355 62.404V59.38C176.355 58.7933 176.179 58.34 175.827 58.02C175.475 57.6893 174.941 57.524 174.227 57.524C173.747 57.524 173.272 57.5987 172.803 57.748C172.344 57.8973 171.955 58.1053 171.635 58.372L170.851 56.916C171.309 56.564 171.853 56.3027 172.483 56.132C173.123 55.9507 173.784 55.86 174.467 55.86C175.704 55.86 176.659 56.1587 177.331 56.756C178.013 57.3427 178.355 58.2547 178.355 59.492V64.5H176.467ZM173.779 64.612C173.139 64.612 172.579 64.5053 172.099 64.292C171.619 64.068 171.245 63.764 170.979 63.38C170.723 62.9853 170.595 62.5427 170.595 62.052C170.595 61.572 170.707 61.14 170.931 60.756C171.165 60.372 171.544 60.068 172.067 59.844C172.589 59.62 173.283 59.508 174.147 59.508H176.627V60.836H174.291C173.608 60.836 173.149 60.948 172.915 61.172C172.68 61.3853 172.563 61.652 172.563 61.972C172.563 62.3347 172.707 62.6227 172.995 62.836C173.283 63.0493 173.683 63.156 174.195 63.156C174.685 63.156 175.123 63.044 175.507 62.82C175.901 62.596 176.184 62.2653 176.355 61.828L176.691 63.028C176.499 63.5293 176.152 63.9187 175.651 64.196C175.16 64.4733 174.536 64.612 173.779 64.612Z" fill="#0F0F0F" />
                        <path d="M218 58.5C218 58.7652 217.895 59.0196 217.707 59.2071C217.52 59.3946 217.265 59.5 217 59.5H207V69.5C207 69.7652 206.895 70.0196 206.707 70.2071C206.52 70.3946 206.265 70.5 206 70.5C205.735 70.5 205.48 70.3946 205.293 70.2071C205.105 70.0196 205 69.7652 205 69.5V59.5H195C194.735 59.5 194.48 59.3946 194.293 59.2071C194.105 59.0196 194 58.7652 194 58.5C194 58.2348 194.105 57.9804 194.293 57.7929C194.48 57.6054 194.735 57.5 195 57.5H205V47.5C205 47.2348 205.105 46.9804 205.293 46.7929C205.48 46.6054 205.735 46.5 206 46.5C206.265 46.5 206.52 46.6054 206.707 46.7929C206.895 46.9804 207 47.2348 207 47.5V57.5H217C217.265 57.5 217.52 57.6054 217.707 57.7929C217.895 57.9804 218 58.2348 218 58.5Z" fill="black" />
                    </g>
                    <defs>
                        <filter id="filter0_d_13_252" x="0" y="0" width="303" height="157" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="20" />
                            <feGaussianBlur stdDeviation="30" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13_252" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13_252" result="shape" />
                        </filter>
                    </defs>
                </svg>
                <Tooltip id="my-tooltip" />



            </div>

            {/* Listar todas as diciplinas do bimestre usando o componente DisciplinaComponent*/}
            <div className={styles.allDisciplinas}>
                {disciplinas.map((disciplina) => (
                    <div className={styles.DisciplinasContainer} key={disciplina.id}>
                        <DisciplinaComponent

                            disciplina_id={disciplina.id}
                            disciplina={disciplina.disciplina}
                            nota={disciplina.nota}
                            criadoEm={new Date(disciplina.criadoEm)}
                            colorCard={getColorCard(disciplina.disciplina)}
                        />
                        <svg onClick={() => excluirDisciplina(disciplina.id)}

                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Remover"
                            data-tooltip-place="top" className={styles.IconBin} width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3_255)">
                                <path d="M23 4.72388H18V3.72388C18 2.92823 17.6839 2.16517 17.1213 1.60256C16.5587 1.03995 15.7956 0.723877 15 0.723877H9C8.20435 0.723877 7.44129 1.03995 6.87868 1.60256C6.31607 2.16517 6 2.92823 6 3.72388V4.72388H1C0.734784 4.72388 0.48043 4.82923 0.292893 5.01677C0.105357 5.20431 0 5.45866 0 5.72388C0 5.98909 0.105357 6.24345 0.292893 6.43098C0.48043 6.61852 0.734784 6.72388 1 6.72388H2V24.7239C2 25.2543 2.21071 25.763 2.58579 26.1381C2.96086 26.5132 3.46957 26.7239 4 26.7239H20C20.5304 26.7239 21.0391 26.5132 21.4142 26.1381C21.7893 25.763 22 25.2543 22 24.7239V6.72388H23C23.2652 6.72388 23.5196 6.61852 23.7071 6.43098C23.8946 6.24345 24 5.98909 24 5.72388C24 5.45866 23.8946 5.20431 23.7071 5.01677C23.5196 4.82923 23.2652 4.72388 23 4.72388ZM8 3.72388C8 3.45866 8.10536 3.20431 8.29289 3.01677C8.48043 2.82923 8.73478 2.72388 9 2.72388H15C15.2652 2.72388 15.5196 2.82923 15.7071 3.01677C15.8946 3.20431 16 3.45866 16 3.72388V4.72388H8V3.72388ZM20 24.7239H4V6.72388H20V24.7239ZM10 11.7239V19.7239C10 19.9891 9.89464 20.2434 9.70711 20.431C9.51957 20.6185 9.26522 20.7239 9 20.7239C8.73478 20.7239 8.48043 20.6185 8.29289 20.431C8.10536 20.2434 8 19.9891 8 19.7239V11.7239C8 11.4587 8.10536 11.2043 8.29289 11.0168C8.48043 10.8292 8.73478 10.7239 9 10.7239C9.26522 10.7239 9.51957 10.8292 9.70711 11.0168C9.89464 11.2043 10 11.4587 10 11.7239ZM16 11.7239V19.7239C16 19.9891 15.8946 20.2434 15.7071 20.431C15.5196 20.6185 15.2652 20.7239 15 20.7239C14.7348 20.7239 14.4804 20.6185 14.2929 20.431C14.1054 20.2434 14 19.9891 14 19.7239V11.7239C14 11.4587 14.1054 11.2043 14.2929 11.0168C14.4804 10.8292 14.7348 10.7239 15 10.7239C15.2652 10.7239 15.5196 10.8292 15.7071 11.0168C15.8946 11.2043 16 11.4587 16 11.7239Z" fill="#FF5964" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3_255">
                                    <rect width="32" height="32" fill="white" transform="translate(0 0.723877)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                ))}
            </div>

            {/* Card que aparece quando clicar para adicionar uma nova disciplinma */}
            <div className={styles.CardDisciplinasContener} style={isCardVisible ? { display: "flex" } : { display: "none" }}>
                <div className={styles.addDisciplinasContener}>
                    <div className={styles.TituloAddDisciplinasContener}>
                        <p className={styles.TituloAddDisciplinas}>Bimestre {getNumeroBimestre()}</p>
                        <GrClose onClick={() => setIsCardVisible(!isCardVisible)} className={styles.IconCloser} />
                    </div>
                    <div className={styles.AddDisciplinas}>
                        <p className={styles.TextDisciplina}>Disciplina</p>
                        <div className={styles.Disciplinas}>

                            <button onClick={() => setDisciplinaSelecionada("Biologia")} style={{ backgroundColor: disciplinaSelecionada === 'Biologia' ? '#cc4090' : '#351929' }} className={styles.buttonDisciplina}>Biologia</button>
                            <button onClick={() => setDisciplinaSelecionada("Artes")} style={{ backgroundColor: disciplinaSelecionada === 'Artes' ? '#05a2c2' : '#0d2c33' }} className={styles.buttonDisciplina}>Artes</button>
                            <button onClick={() => setDisciplinaSelecionada("Geografia")} style={{ backgroundColor: disciplinaSelecionada === 'Geografia' ? '#c26719' : '#332111' }} className={styles.buttonDisciplina}>Geografia</button>
                            <button onClick={() => setDisciplinaSelecionada("Sociologia")} style={{ backgroundColor: disciplinaSelecionada === 'Sociologia' ? '#9b19c2' : '#2b1133' }} className={styles.buttonDisciplina}>Sociologia</button>
                        </div>
                        <div className={styles.NotaContener}>
                            <p className={styles.TextNota}>Nota</p>
                            <input className={styles.InputNota} placeholder='7.4' type='number' onChange={(e) => setNota(parseFloat(e.target.value))}></input>

                        </div>
                        <div className={styles.buttonConfirmContener}>
                            <button className={styles.buttonConfirm} onClick={adicionarDisciplina}>
                                Confirmar
                            </button>

                        </div>

                    </div>

                </div>

            </div>



        </div>


    )

}

export default BimestreComponent