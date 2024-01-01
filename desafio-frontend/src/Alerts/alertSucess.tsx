import { toast } from 'react-toastify';


export const alertSucess = (mensagemErro: string) => toast.success(mensagemErro, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});