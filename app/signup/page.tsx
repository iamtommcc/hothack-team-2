"use client";

import Button from "@/components/Button";
import PasswordValidationInput from "@/components/PasswordValidationInput";
import ValidationInput from "@/components/ValidationInput";
import { signUpValidationSchema } from "@/utils/schema/validation-schemas";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>();
  const [password, setPassword] = useState("");
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
      confirmPassword: "",
      surname: "",
    },
    onSubmit: () => {},
    validationSchema: signUpValidationSchema,
  });

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-white">
      <div className="bg-white p-[3.5rem] rounded-lg mx-4 max-width-[600px] border-solid border-black">

        <h1 className="text-black text-[35px] font-bold mb-4">Sign Up</h1>

        <p className="text-[16px] text-black">Surname</p>
        <ValidationInput
          error={errors.surname}
          touched={touched.surname}
          value={values.surname}
          onChange={(e) => setFieldValue("surname", e.target.value)}
          placeholder="Enter your surname"
          className="w-full bg-gray"
        />

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

        <p className="text-[16px] text-black">Confirm Password</p>
        <PasswordValidationInput
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          value={values.confirmPassword}
          handleChange={handleChange("confirmPassword")}
          placeholder="Confirm your password"
          handleBlur={handleBlur("confirmPassword")}
          className="w-full bg-gray"
        />

        <Button
          text="Sign Up"
          onClick={() => handleSignUp}
          className="text-white bg-black border rounded-full px-2 py-2 text-[16px] mt-3 mb-2 w-full min-w-[500px]"
        />
      </div>
    </div>
  );
}
