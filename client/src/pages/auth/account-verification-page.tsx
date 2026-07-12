import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PenLine, Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useVerifyUserAccountMutation,
  useCreateUserMutation,
} from "@/features/apis/user-apis";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required.")
    .matches(/^[0-9]{6}$/, "OTP must be exactly 6 digits."),
});

export default function AccountVerificationPage() {
  const [_location, navigate] = useLocation();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  const [verifyUserAccount, { isLoading, isSuccess, error, data }] =
    useVerifyUserAccountMutation();

  const [
    resendVerificationOTP,
    {
      isLoading: retryIsLoading,
      error: retryError,
      data: _retryData,
      isSuccess: retryIsSuccess,
    },
  ] = useCreateUserMutation();

  const state = window.history.state;

  const handleResendCode = () => {
    if (Object.keys(state).length > 0)
      return resendVerificationOTP({
        ...state,
        confirmPassword: state.password,
      });
  };

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpValidationSchema,
    onSubmit: (values) => {
      verifyUserAccount(values);
    },
  });

  useEffect(() => {
    if (countdown > 0 && !isResending) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsResending(false);
    }
  }, [countdown, isResending]);

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/sign-in");
    }
    if (error) {
      const errorMessage =
        error && "data" in error && (error as any).data?.message
          ? (error as any).data.message
          : "Something went wrong";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }

    if (retryIsSuccess) {
      toast({
        title: "Success",
        description: "A new verification code has been sent.",
      });
      setCountdown(60);
      setIsResending(true);
    }
    if (retryError) {
      const errorMessage =
        retryError && "data" in retryError && (retryError as any).data?.message
          ? (retryError as any).data.message
          : "Something went wrong";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setIsResending(false);
    }
  }, [isSuccess, data, error, navigate, toast, retryIsSuccess, retryError]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-amber-50/30 dark:to-amber-950/10 px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-2 cursor-pointer mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <PenLine className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-2xl font-semibold text-foreground">
                Ade's Notes
              </span>
            </div>
          </Link>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-8 shadow-sm">
          <form onSubmit={formik.handleSubmit}>
            <div className="text-left">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                Verify Your Account
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                We've sent a 6-digit code to your email. Please enter it below.
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <InputOTP
                maxLength={6}
                value={formik.values.otp}
                onChange={(value) => formik.setFieldValue("otp", value)}
                onBlur={() => formik.setFieldTouched("otp")}
              >
                <InputOTPGroup className="flex gap-3">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {formik.touched.otp && formik.errors.otp ? (
              <div className="text-red-500 text-xs text-center -mt-4 mb-4">
                {formik.errors.otp}
              </div>
            ) : null}

            <Button
              type="submit"
              className="w-full cursor-pointer"
              size="lg"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Account
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Didn't receive a code?{" "}
            </span>
            <button
              onClick={handleResendCode}
              disabled={countdown > 0 || retryIsLoading}
              className="text-primary cursor-pointer hover:underline font-medium disabled:text-muted-foreground disabled:cursor-not-allowed disabled:no-underline"
            >
              {retryIsLoading ? (
                <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Resend code
              {countdown > 0 && ` in ${countdown}s`}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
