import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function AuthForm() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = location.state?.from?.pathname || "/start";

  const login      = useAuthStore((s) => s.login);
  const signup     = useAuthStore((s) => s.signup);
  const isLoading  = useAuthStore((s) => s.isLoading);
  const error      = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError ?? (() => {}));

  const isSignup = mode === "signup";

  const canSubmit = useMemo(() => {
    if (!email || !password) return false;
    if (password.length < 6) return false;
    if (isSignup && password !== confirm) return false;
    return true;
  }, [email, password, confirm, isSignup]);

  const onSubmit = async (e) => {
    e.preventDefault();
    clearError();
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate(nextPath, { replace: true });
    } catch (err) {
      console.error("Auth failed:", err?.code || err?.message || err);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setPassword("");
    setConfirm("");
    clearError();
  };

  // Reusable classes so inputs aren’t full width
  const fieldClass =
    "w-80 sm:w-96 h-12 mx-auto rounded-xl border-2 border-black/20 bg-white px-4 text-base " +
    "placeholder-black/40 outline-none focus:ring-2 focus:ring-[#3C520A]/40 focus:border-[#3C520A] shadow-sm";

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tabs — separated */}
      <div className="mb-6 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => switchMode("login")}
          className={
            "h-10 px-5 rounded-lg text-sm sm:text-base font-semibold transition " +
            (!isSignup
              ? "bg-[#3C520A] text-white shadow"
              : "bg-white text-black border border-black/20 hover:bg-black/10")
          }
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={
            "h-10 px-5 rounded-lg text-sm sm:text-base font-semibold transition " +
            (isSignup
              ? "bg-[#3C520A] text-white shadow"
              : "bg-white text-black border border-black/20 hover:bg-black/10")
          }
        >
          Sign up
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit} className="w-full max-w-md grid gap-5 text-center">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">Email</label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) clearError();
            }}
            className={fieldClass}
            placeholder="john.smith@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">Password</label>
          <input
            type="password"
            required
            minLength={6}
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) clearError();
            }}
            className={fieldClass}
            placeholder="******"
          />
        </div>

        {isSignup && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black">Confirm</label>
            <input
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (error) clearError();
              }}
              className={fieldClass}
              placeholder="******"
            />
            {confirm && confirm !== password && (
              <p className="text-xs text-red-600">Passwords do not match</p>
            )}
          </div>
        )}

        {/* Submit button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={isLoading || !canSubmit}
            className="h-12 w-44 rounded-xl bg-[#3C520A] text-white text-base font-semibold shadow hover:opacity-95 disabled:opacity-60"
          >
            {isLoading ? "Please wait..." : isSignup ? "Create account" : "Log in"}
          </button>
        </div>
      </form>
    </div>
  );
}
