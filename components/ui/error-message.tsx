interface IErrorMessageProps {
  errors: any;
}

const ErrorMessage = ({ errors }: IErrorMessageProps) => {
  return (
    <>
      {errors && <p className="px-1 text-xs text-red-600">{errors?.message}</p>}
    </>
  );
};

export default ErrorMessage;
