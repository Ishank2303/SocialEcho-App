import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction, clearMessage } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import ContextAuthModal from "../components/modals/ContextAuthModal";
import { RxCross1 } from "react-icons/rx";
import ButtonLoadingSpinner from "../components/loader/ButtonLoadingSpinner";
import Logo from "../assets/SocialEcho.png";

const SignUpNew = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpError = useSelector((state) => state.auth?.signUpError);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (e.target.value.includes("mod.socialecho.com")) {
      setIsModerator(true);
    } else {
      setIsModerator(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setAvatar(null);
      setAvatarError(null);
      return;
    }
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    ) {
      setAvatar(null);
      setAvatarError("Please upload a valid image file (jpeg, jpg, png)");
    } else if (file.size > 10 * 1024 * 1024) {
      setAvatar(null);
      setAvatarError("Please upload an image file less than 10MB");
    } else {
      setAvatar(file);
      setAvatarError(null);
    }
  };

  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModerator, setIsModerator] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingText("Signing up...");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("role", "general");
    formData.append("isConsentGiven", isConsentGiven.toString());

    const timeout = setTimeout(() => {
      setLoadingText(
        "This is taking longer than usual. Please wait while backend services are getting started."
      );
    }, 5000);

    await dispatch(signUpAction(formData, navigate, isConsentGiven, email));
    setLoading(false);
    setIsConsentGiven(false);
    clearTimeout(timeout);
  };

  const handleClearError = () => {
    dispatch(clearMessage());
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <form className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl p-8 md:p-10" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
    <img
        className="h-12 w-auto drop-shadow-md"
        src={Logo}
        alt="SocialEcho"
    />

    <h1 className="mt-6 text-center text-3xl font-bold text-gray-800">
        Create Account
    </h1>

    <p className="mt-2 text-center text-gray-500">
        Join the community and start sharing today
    </p>
</div>
          {signUpError &&
            Array.isArray(signUpError) &&
            signUpError.map((err, i) => (
              <div
                className="mt-6 flex items-center rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 shadow-sm"
                role="alert"
                key={i}
              >
                <span className="ml-2 block sm:inline">{err}</span>
                <button
                  className="ml-auto font-bold text-red-700"
                  onClick={handleClearError}
                >
                  <RxCross1 className="h-3 w-3" />
                </button>
              </div>
            ))}

          <div className="mt-8 flex rounded-xl bg-gray-100 p-1">
            <Link
              to={"/signin"}
              className="w-1/2 rounded-lg py-3 text-center font-medium text-gray-500 transition hover:text-blue-600"
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className="w-1/2 rounded-lg bg-white py-3 text-center font-semibold text-blue-600 shadow"
            >
              Sign Up
            </Link>
          </div>
          <div className="relative mt-8 flex items-center">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-3 h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="block w-full rounded-xl border border-gray-300 bg-gray-50 px-12 py-4 text-gray-700 shadow-sm transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="Username"
              required
              autoComplete="off"
            />
          </div>
          <label
            htmlFor="avatar"
            className="mx-auto mt-6 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 px-4 py-5 text-center transition hover:border-blue-500 hover:bg-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <h2 className="mx-3 text-gray-400">Profile Photo</h2>
            <input
              id="avatar"
              type="file"
              className="hidden"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              autoComplete="off"
            />
          </label>
          {avatar && (
            <div className="mt-2 flex items-center justify-center">
              <span className="font-medium text-blue-500">{avatar.name}</span>
            </div>
          )}
          {avatarError && (
            <div className="mt-2 flex items-center justify-center">
              <span className="text-red-500">{avatarError}</span>
            </div>
          )}

          <div className="relative mt-6 flex items-center">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-3 h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <input
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              type="email"
              className="block w-full rounded-xl border border-gray-300 bg-gray-50 px-12 py-4 text-gray-700 shadow-sm transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="Email address"
              required
              autoComplete="off"
            />
          </div>
          <div className="relative mt-4 flex items-center">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-3 h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="block w-full rounded-xl border border-gray-300 bg-gray-50 px-12 py-4 text-gray-700 shadow-sm transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              placeholder="Password"
              required
              autoComplete="off"
            />
          </div>
          <div className="mt-6">
            <button
              disabled={loading}
              type="submit"
              className={`w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {loading ? (
                <ButtonLoadingSpinner loadingText={loadingText} />
              ) : (
                <span>Sign Up</span>
              )}
            </button>

            <div onClick={() => setIsModalOpen(true)} className="mt-6">
              {isConsentGiven && !isModerator ? (
                <p className="mt-2 cursor-pointer rounded-lg border border-green-500 px-4 py-3 text-center text-sm font-semibold text-green-600">
                  Context-Based Authentication is enabled
                </p>
              ) : (
                <p className="mt-2 cursor-pointer rounded-lg border px-4 py-3 text-center text-sm font-semibold">
                  Context-Based Authentication is disabled
                </p>
              )}
            </div>

            <div>
              <ContextAuthModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setIsConsentGiven={setIsConsentGiven}
                isModerator={isModerator}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpNew;
