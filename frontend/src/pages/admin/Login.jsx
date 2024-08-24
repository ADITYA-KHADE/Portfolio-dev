import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/Authcontext";

const Login = () => {
  const { setAuthUser } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(data));
        setAuthUser(data);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="bg-white mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-3xl">
        <div className="py-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <fieldset className="border border-gray-600 rounded-lg p-4">
            
          <form className="space-y-6 " onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-bold leading-6 px-3 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2 px-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white text-gray-900 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between px-3">
                <label
                  htmlFor="password"
                  className="block text-lg font-bold leading-6 text-gray-900"
                >
                  Password
                </label>
                
              </div>
              <div className="mt-2 px-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block bg-white text-gray-900 w-full rounded-md border-0 py-1.5  
                  shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="px-3">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
