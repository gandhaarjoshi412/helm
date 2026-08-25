"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signInWithMagicLink: (email: string) => Promise<{ error: Error | null }>;
  signInWithGithub: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    // Purge any stale demo user session from browser localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("kodium_demo_user");
    }

    if (!supabase) {
      setLoading(false);
      return;
    }

    // Initial session fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (identifier: string, password: string) => {
    if (!supabase) {
      return { error: new Error("Supabase is not configured on this deployment. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel environment variables.") };
    }

    let targetEmail = identifier.trim();

    // If user entered a username instead of an email (no '@' symbol)
    if (!targetEmail.includes("@")) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("email")
        .ilike("username", targetEmail)
        .maybeSingle();

      if (profile?.email) {
        targetEmail = profile.email;
      }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: targetEmail,
      password,
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signUpWithEmail = async (email: string, password: string, usernameInput?: string) => {
    if (!supabase) {
      return { error: new Error("Supabase is not configured on this deployment. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel environment variables.") };
    }

    const cleanUsername = usernameInput?.trim() || "";

    if (cleanUsername) {
      // Validate username format: letters, numbers, underscores only, no spaces
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(cleanUsername)) {
        return {
          error: new Error(
            "Username can only contain letters, numbers, and underscores (no spaces or special symbols)."
          ),
        };
      }

      // Check if username is already taken
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .ilike("username", cleanUsername)
        .maybeSingle();

      if (existing) {
        return {
          error: new Error(
            `Username '@${cleanUsername}' is already taken. Please choose a different username.`
          ),
        };
      }
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: cleanUsername,
          full_name: cleanUsername,
        },
      },
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("already registered") || msg.includes("already exists") || error.status === 422) {
        return { error: new Error("An account is already registered on this email. Please sign in instead.") };
      }
      if (msg.includes("rate limit exceeded")) {
        return { error: new Error("Too many signup attempts in a short time. Please wait 5 minutes or sign in with GitHub.") };
      }
      return { error: new Error(error.message) };
    }

    // In Supabase, if email confirmation is disabled and email already exists, identities list is empty
    if (authData?.user?.identities && authData.user.identities.length === 0) {
      return { error: new Error("An account is already registered on this email. Please sign in instead.") };
    }

    return { error: null };
  };

  const signInWithMagicLink = async (email: string) => {
    if (!supabase) {
      return { error: new Error("Supabase is not configured on this deployment. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel environment variables.") };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signInWithGithub = async () => {
    if (!supabase) {
      return { error: new Error("Supabase is not configured on this deployment. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel environment variables.") };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
  };

  const deleteAccount = async () => {
    if (!supabase || !user) {
      return { error: new Error("No active user session to delete.") };
    }

    try {
      // 1. Call Supabase RPC function to completely delete user from auth.users and profiles
      const { error: rpcError } = await supabase.rpc("delete_user_account");

      if (rpcError) {
        console.warn("RPC delete_user_account error, attempting direct profile delete:", rpcError);
        // Fallback: delete profile record
        await supabase.from("profiles").delete().eq("id", user.id);
      }

      // 2. Sign out the session and clear local auth state
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error("Failed to delete account.") };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithMagicLink,
        signInWithGithub,
        signOut,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
