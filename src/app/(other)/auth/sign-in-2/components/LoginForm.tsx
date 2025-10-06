import PasswordFormInput from "@/components/form/PasswordFormInput";
import TextFormInput from "@/components/form/TextFormInput";
import { Button, FormCheck } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAdminAuth } from "@/context/admin/AuthContext";
import { useLocation  } from "react-router-dom";
import { useEffect } from "react";

interface LoginFormData {
  email: string;
  password: string;
}


const LoginForm = () => {
  const { login, admin, loading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>();

const onSubmit = async (data: LoginFormData) => {
  try {
    await login({ username: data.email, password: data.password });
    const redirectLink =
      new URLSearchParams(location.search).get("redirectTo") ||
      "/dashboard/analytics";
    navigate(redirectLink, { replace: true });
  } catch (err: any) {
    alert(err.message || "Login failed");
  }
};


  // ✅ Redirect when admin is populated
useEffect(() => {
  if (admin) {
    const redirectLink =
      new URLSearchParams(location.search).get("redirectTo") ||
      "/dashboard/analytics";

    navigate(redirectLink, { replace: true }); // ✅ avoid history stacking
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [admin]);



  return (
    <form className="authentication-form" onSubmit={handleSubmit(onSubmit)}>
      <TextFormInput
        control={control}
        name="email"
        containerClassName="mb-3"
        label="Email"
        id="email-id"
        placeholder="Enter your email"
        rules={{ required: "Email is required" }}
      />

      <PasswordFormInput
        control={control}
        name="password"
        containerClassName="mb-3"
        placeholder="Enter your password"
        id="password-id"
        label={
          <>
            <Link
              to="/auth/reset-pass"
              className="float-end text-muted text-unline-dashed ms-1"
            >
              Reset password
            </Link>
            <label className="form-label" htmlFor="password-id">
              Password
            </label>
          </>
        }
        rules={{ required: "Password is required" }}
      />

      <div className="mb-3">
        <FormCheck label="Remember me" id="sign-in" />
      </div>

      <div className="mb-1 text-center d-grid">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

