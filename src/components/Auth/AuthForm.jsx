import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function AuthForm() {
    const [mode, setMode] = useState("login"); //Login / Signup
    const [ email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const nextPath = location.state?.from?.pathname || "/start";

    // Individual style to avoid re-rendering
    const login = useAuthStore((s) => s.login);
    const signup = useAuthStore((s) => s.signup);
    const isLoading = useAuthStore((s) => s.isLoading);
    const error = useAuthStore((s) => s.error);
    const clearError = useAuthStore((s) => s.clearError ??(() => {}));

    const isSignup = mode === "signup";

    // Extracted validation
    const canSubmit = useMemo(() => {
        if(!email || !password) return false;
        if(isSignup && password !== confirm) return false;
        if(password.length < 6) return false;
        return true;
    }, [email, password, confirm, isSignup]);
    
    const onSubmit = async (e) => {
    e.preventDefault();
    clearError?.();
    try {
        if (isSignup) {
            await signup(email, password);
        } else {
            await login(email,password);
        }

        // Sanity check Log
        console.log("Auth OK -> navigate to:", nextPath);

        navigate(nextPath, {replace: true });

    } catch {
        // console.error("Auth failed:", e?.code || e?.message || e); 
        // Error is setup in store
        // if Firebase rejects auth- recorded here
        console.error("Auth failed:", err?.code || err?.message || err);
    }
};

const switchMode = (next) => {
    setMode(next);
    setPassword("");
    setConfirm("");
    clearError();
};

return (
    <div className="w-full flex flex-col items-center">
        {/* Tabs- separated buttons */}
        <div className="mb-10 flex justify-center gap-6">
         <button
          type="button"
          onClick={() => switchMode("login")}
          className={
            "h-14 min-w-40 px-8 rounded-3xl text-base sm:text-lg font-semibold transition " +
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
            "h-14 min-w-40 px-8 rounded-3xl text-base sm:text-lg font-semibold transition " +
            (isSignup 
                ? "bg-[#3C520A]/10 text-white shadow" 
                : "bg-white text-black border border-black/20 hover:bg-black/10")
          }
        >
            Sign up
        </button>
         </div>

         {/* Error */}
         {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
                {error}
            </div>
         )}

         {/* Form */}
         <form onSubmit={onSubmit} className="w-full max-w-xl grid gap-6 text-center">
            <div>
                <label className="mb-2 block text-sm font-medium text-black">Email</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) clearError();
                  }}
                  className="w-medium h-48 border-2 border-black/20 rounded-2xl bg-white px-4 text-[15px] placeholder-black/40 outline-none focus:ring-2 focus:ring-[#3C520A]/40 focus:border-[#3C520A] shadow-sm"
                  placeholder="john.smith@example.com"
                  />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-black">Password</label>
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
                  className="w-medium h-48 border-2 border-black/20 rounded-2xl bg-white px-4 text-[15px] placeholder-black/40 outline-none focus:ring-2 focus:ring-[#3C520A]/40 focus:border-[#3C520A] shadow-sm"
                  placeholder="******"
                />
            </div>

            {isSignup && (
                <div>
                    <label className="mb-2 block text-sm font-medium text-black">Confirm</label>
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
                      className="w-medium h-48 border-2 border-black/20 rounded-2xl bg-white px-4 text-[15px] placeholder-black/40 outline-none focus:ring-2 focus:ring-[#3C520A]/40 focus:border-[#3C520A] shadow-sm"
                      placeholder="******"
                    />
                    {confirm && confirm !== password && (
                        <p className="mt-2 text-xs text-red-600">Passwords do not match</p>
                    )}
                </div>
            )}

            <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading || !canSubmit}
                  className="h-24 w-48 rounded-3xl bg-[#3C520A] text-white font-medium shadow hover:opacity-95 disabled:opacity-60"
                >
                  {isLoading ? "Please wait..." : isSignup ? "Create account" : "log in"}
                </button>
            </div>  
         </form>
    </div>
);
}