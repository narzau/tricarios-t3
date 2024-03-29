// /src/app/login/page.tsx  

"use client";
import { SignInResponse, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent,  useState } from "react";

type LoginInput = {
  email: string;
  password: string;
}

type SearchParamsProps = {
  searchParams: {
    error?: {
      message: string;
    } | undefined
  }
}

export default function LoginPage( props: SearchParamsProps) {
  const session = useSession();
  const router = useRouter()
  if (session.data) router.push("/dashboard");

  const [inputs, setInputs] = useState<LoginInput>({ email: "", password: "" });
  const [loginResponse, setLoginResponse] = useState<SignInResponse | undefined>(undefined);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = async (event:FormEvent) => {
    event.preventDefault();
    const loginResponse = await signIn("credentials", { 
      email: inputs.email, 
      password: inputs.password, 
      callbackUrl: '/dashboard' 
    });
    setLoginResponse(loginResponse);
  }
  return (
    <>
      { session.data  ? null :       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="off"
                  required
                  value={inputs.email || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  value={inputs.password || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

            {props?.searchParams?.error ? <div className="text-red-500/80 text-center fond-bold text-xl">{loginResponse?.error}Hubo un error al ingresar</div> : null

            }
           
          </form>
          
        </div>
      </div>}

    </>
  )
}