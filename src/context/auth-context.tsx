"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export interface DemoUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface AuthContextType {
  user: User | DemoUser | null;
  session: Session | null;
  loading: boolean;
  isDemoMode: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signInWithMagicLink: (email: string) => Promise<{ error: Error | null }>;
  signInWithGithub: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | DemoUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (!supabase) {
      setIsDemoMode(true);
      // Check if localStorage has saved demo session
      const savedDemoUser = localStorage.getItem("kodium_demo_user");
      if (savedDemoUser) {
        try {
          setUser(JSON.parse(savedDemoUser));
        } catch {
          // ignore parsing error
        }
      }
      setLoading(false);
      return;
    }

    setIsDemoMode(false);

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

  const signInWithEmail = async (email: string, password: string) => {
    if (isDemoMode || !supabase) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const demoUser: DemoUser = {
        id: "demo-user-" + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: {
          full_name: email.split("@")[0].toUpperCase() + " Dev",
        },
      };
      setUser(demoUser);
      localStorage.setItem("kodium_demo_user", JSON.stringify(demoUser));
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    if (isDemoMode || !supabase) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const demoUser: DemoUser = {
        id: "demo-user-" + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: {
          full_name: fullName || email.split("@")[0],
        },
      };
      setUser(demoUser);
      localStorage.setItem("kodium_demo_user", JSON.stringify(demoUser));
      return { error: null };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signInWithMagicLink = async (email: string) => {
    if (isDemoMode || !supabase) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const demoUser: DemoUser = {
        id: "demo-user-" + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: {
          full_name: email.split("@")[0],
        },
      };
      setUser(demoUser);
      localStorage.setItem("kodium_demo_user", JSON.stringify(demoUser));
      return { error: null };
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
    if (isDemoMode || !supabase) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const demoUser: DemoUser = {
        id: "demo-user-github",
        email: "octocat@github.dev",
        user_metadata: {
          full_name: "GitHub Developer",
          avatar_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
      };
      setUser(demoUser);
      localStorage.setItem("kodium_demo_user", JSON.stringify(demoUser));
      return { error: null };
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
    if (isDemoMode || !supabase) {
      setUser(null);
      setSession(null);
      localStorage.removeItem("kodium_demo_user");
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isDemoMode,
        signInWithEmail,
        signUpWithEmail,
        signInWithMagicLink,
        signInWithGithub,
        signOut,
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
