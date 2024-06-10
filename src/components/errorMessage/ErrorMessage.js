import img from '../errorMessage/iranserver-iran.gif';

const ErrorMessage = () => {
  return (
    <img src={img} style={{ display: 'block', margin: "0 auto", width: "300px" }} alt="Error message"></img>
  )
}

export default ErrorMessage;