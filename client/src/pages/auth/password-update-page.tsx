import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { Eye, EyeOff, PenLine, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { passwordUpdateSchema } from "@/helpers/form-validators";
import { useUpdatePasswordMutation } from "@/features/apis/auth-apis";

export default function PasswordUpdatePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [_location, navigate] = useLocation();

  const { toast } = useToast();

  const [updatePassword, { isLoading, isSuccess, error, data, isError }] =
    useUpdatePasswordMutation();

  const formik = useFormik({
    initialValues: { otp: "", password: "", confirmPassword: "" },
    validationSchema: passwordUpdateSchema,
    onSubmit: (values) => {
      updatePassword(values);
    },
  });

  useEffect(() => {
    if (isError) {
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

    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess, data, error]);

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
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
            Update Password
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <div className="flex mt-3 justify-center">
                <InputOTP
                  maxLength={6}
                  value={formik.values.otp}
                  onChange={(value) => formik.setFieldValue("otp", value)}
                  onBlur={() => formik.setFieldTouched("otp")}
                >
                  <InputOTPGroup className="gap-8">
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
                <div className="text-red-500 text-xs text-center">
                  {formik.errors.otp}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative mt-3">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Confirm New Password</Label>
              <div className="relative mt-3">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <Button type="submit" className="w-full cursor-pointer" size="lg">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
