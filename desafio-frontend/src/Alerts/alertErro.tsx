import { toast } from 'react-toastify';


export const alertErro = (mensagemErro: string) => toast.error(mensagemErro, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});