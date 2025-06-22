import { toast } from "react-toastify";

export  function ErrorAlert(msg){
    toast.error(msg);
}

export  function SuccessAlert(msg){
    toast.success(msg);
}
