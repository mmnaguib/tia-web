import toast from "react-hot-toast";

interface IProps {
  error?: string | undefined;
}

const ErrorMsg = ({ error }: IProps) => {
  if (error) {
    toast.dismiss();
    toast.error(error);
  }
  return null;
};

export default ErrorMsg;
