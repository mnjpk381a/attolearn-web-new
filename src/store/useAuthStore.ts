import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  pwd: string;
  phone?: string;
  webUrl?: string;
  typeId: number;
  isEmailVerified: boolean;
  activationCode?: string;
  resetPasswordCode?: string;
  photo?: string;
  deviceToken?: string;
  isAdmin: boolean;
  gender?: string;
  country?: string;
  createdOn: string; // ISO string
}

export interface AuthResponse {
  user: AuthUser;
  sessiontoken: string;
}

interface AuthState {
  user: AuthUser | null;
  sessionToken: string | null;
  isHydrated: boolean;

  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
  setHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      sessionToken: null,
      isHydrated: false,

      setAuth: (data) =>
        set({
          user: data.user,
          sessionToken: data.sessiontoken,
        }),

      clearAuth: () =>
        set({
          user: null,
          sessionToken: null,
        }),

      setHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: "auth-storage",

      // ✅ Persist only what is needed
      partialize: (state) => ({
        user: state.user,
        sessionToken: state.sessionToken,
      }),

      // ✅ Prevent hydration mismatch in Next.js
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
