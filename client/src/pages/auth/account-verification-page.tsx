import { useState } from "react";
import { motion } from "framer-motion";
import { MailCheck, PenLine } from "lucide-react";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export default function AccountVerificationPage() {
  const [otp, setOtp] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Handle OTP verification logic here
    console.log("Verifying OTP:", otp);
  }

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
          <form onSubmit={handleSubmit}>
            <div className="text-left">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                Verify Your Account
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                We've sent a 6-digit code to your email. Please enter it below.
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
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

            <Button type="submit" className="w-full" size="lg">
              Verify Account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              Didn't receive a code?{" "}
            </span>
            <button className="text-primary hover:underline font-medium">
              Resend code
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
