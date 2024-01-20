"use client";

import { useEffect, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import PasswordValidationInput from "@/components/PasswordValidationInput";
import ValidationInput from "@/components/ValidationInput";
import { loginValidationSchema } from "@/utils/schema/validation-schemas";
import { useFormik } from "formik";
import Link from "next/link";

export default function LoginPage() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
    validationSchema: loginValidationSchema,
  });

  const router = useRouter();

  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const handleLogIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  console.log({ loading, user });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-96 text-center">
          <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-300">
            You're already logged in
          </h1>
          <button
            onClick={handleLogout}
            className="w-full p-3 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-white">
      <div className="bg-white p-[3.5rem] rounded-lg mx-4 max-width-[600px]">
        <div className="flex justify-center">{/* TODO add a logo*/}</div>

        <h1 className="text-black text-[35px] font-bold mb-4">Log In</h1>

        <p className="text-[16px] text-black">Email Address</p>
        <ValidationInput
          error={errors.email}
          touched={touched.email}
          value={values.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
          placeholder="Enter your email address"
          className="w-full bg-gray"
        />
        <p className="text-[16px] text-black">Password</p>
        <PasswordValidationInput
          error={errors.password}
          touched={touched.password}
          value={values.password}
          handleChange={handleChange("password")}
          placeholder="Enter your password"
          handleBlur={handleBlur("password")}
          className="w-full bg-gray"
        />

        <Button
          text="Log In"
          onClick={() => handleLogIn}
          className="text-white bg-black border rounded-full px-2 py-2 text-[16px] mt-3 mb-2 w-full"
        />
        <div className="flex flex-row min-w-[500px]">
          <p className="text-[12px] text-black mr-[2px]">Don't have an account?</p>

          <Link
            href="/sign-up"
            className="text-[12px] text-black text-underline text-decoration-line"
          >
            Create one here.
          </Link>
        </div>
      </div>
    </div>
  );
}
