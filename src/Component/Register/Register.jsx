import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiLockKeyFill } from "react-icons/pi";
import { useRef } from "react";
import { Link } from "react-router-dom";

function Register({ handleForm }) {
  const firstnameValue = useRef("");
  const lastnameValue = useRef("");
  const emailValue = useRef("");
  const passwordValue = useRef("");
  const cpasswordValue = useRef("");

  function allInputValue(e) {
    if (passwordValue.current.value !== cpasswordValue.current.value) {
      e.preventDefault();
      alert("password and confirm password does not match please try again");
    } else {
      e.preventDefault();
      handleForm(
        firstnameValue.current.value,
        lastnameValue.current.value,
        emailValue.current.value,
        passwordValue.current.value
      );
    }
  }

  return (
    <div className="bg-white shadow-2xl sm:w-96 m-10 sm:mx-auto flex justify-between align-center flex-col px-5 py-5 rounded-lg">
      <h1 className="text-left mb-10 text-3xl font-bold">Sign up</h1>
      <form
        onSubmit={allInputValue}
        className="flex justify-center align-center w-full"
      >
        <table className="w-full">
          <tr className="flex align-center mb-4 border-b-2">
            <span>
              <FaUser />
            </span>
            <input
              className="w-11/12 text-xl py-2 px-5 outline-none border-none rounded-lg"
              type="text"
              name="first_name"
              ref={firstnameValue}
              placeholder="first name"
            />
          </tr>

          <tr className="flex align-center mb-4 border-b-2">
            <span>
              <FaUser />
            </span>
            <input
              className="w-11/12 text-xl py-2 px-5 outline-none border-none rounded-lg"
              type="text"
              name="last_name"
              ref={lastnameValue}
              placeholder="last name"
            />
          </tr>

          <tr className="flex align-center mb-4 border-b-2">
            <span>
              <MdEmail />
            </span>
            <input
              className="w-11/12 text-xl py-2 px-5 outline-none border-none rounded-lg"
              type="email"
              name="email"
              ref={emailValue}
              placeholder="your email"
            />
          </tr>

          <tr className="flex align-center mb-4 border-b-2">
            <span>
              <PiLockKeyFill />
            </span>
            <input
              className="w-11/12 text-xl py-2 px-5 outline-none border-none rounded-lg"
              type="password"
              name="password"
              ref={passwordValue}
              placeholder="password"
            />
          </tr>

          <tr className="flex align-center mb-4 border-b-2">
            <span>
              <PiLockKeyFill />
            </span>
            <input
              className="w-11/12 text-xl py-2 px-5 outline-none border-none rounded-lg"
              type="password"
              name="confirm_password"
              ref={cpasswordValue}
              placeholder="Repeat your password"
            />
          </tr>
          <tr className="text-start">
            <input
              className="bg-sky-500 px-5 py-2 rounded-lg text-white text-xl cursor-pointer mt-2"
              type="submit"
              value="Registeer"
            />
          </tr>
        </table>
      </form>
      <Link className="mt-4 underline text-blue-600" href="/login">
        already have an account Login
      </Link>
    </div>
  );
}

export default Register;
