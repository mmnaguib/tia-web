interface IProps {
  msg?: string;
}
const InputErrorMessage = ({ msg }: IProps) => {
  return (
    <p
      style={{ margin: 0, color: "red", fontWeight: "bold", fontSize: "16px" }}
    >
      {msg}
    </p>
  );
};
export default InputErrorMessage;
