import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, clearMessage } from "../redux/actions/authActions";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import ButtonLoadingSpinner from "../components/loader/ButtonLoadingSpinner";
import Logo from "../assets/SocialEcho.png";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingText("Signing in...");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const timeout = setTimeout(() => {
      setLoadingText(
        "This is taking longer than usual. Please wait while backend services are getting started."
      );
    }, 5000);

    await dispatch(signInAction(formData, navigate));

    setLoading(false);
    clearTimeout(timeout);
  };

  const signInError = useSelector((state) => state.auth?.signInError);
  const successMessage = useSelector((state) => state.auth?.successMessage);

  const handleClearMessage = () => {
    dispatch(clearMessage());
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <form className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl p-8 md:p-10">
        <div className="flex justify-center">
          <img className="h-12 w-auto drop-shadow-md" src={Logo} alt="Logo" />
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold text-gray-800">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-gray-500">
          Sign in to continue to your account
        </p>

        {signInError && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 shadow-sm">
            <span>{signInError}</span>
            <button type="button" onClick={handleClearMessage}>
              <RxCross1 />
            </button>
          </div>
        )}

        {successMessage && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-600 shadow-sm">
            <span>{successMessage}</span>
            <button type="button" onClick={handleClearMessage}>
              <RxCross1 />
            </button>
          </div>
        )}

        <div className="mt-8 flex rounded-xl bg-gray-100 p-1">
          <Link
            to="/signin"
            className="w-1/2 rounded-lg bg-white py-3 text-center font-semibold text-blue-600 shadow"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="w-1/2 rounded-lg py-3 text-center font-medium text-gray-500 transition hover:text-blue-600"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-8">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            autoComplete="off"
            required
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-4 text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="mt-5">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="off"
            required
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-4 text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="mt-3 flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
            loading ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          {loading ? (
            <ButtonLoadingSpinner loadingText={loadingText} />
          ) : (
            "Sign In"
          )}
        </button>

        <div className="mt-8 flex justify-center">
          <Link
            to="/admin"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
          >
            <MdOutlineAdminPanelSettings className="text-xl" />
            Admin
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
