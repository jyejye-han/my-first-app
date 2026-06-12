"use client";
import { useState, useEffect } from "react";

const AUTH_KEY = "ytutor-auth";
const AUTH_EVENT = "ytutor-auth-change";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setIsLoggedIn(localStorage.getItem(AUTH_KEY) === "1");
    sync();
    setReady(true);
    window.addEventListener(AUTH_EVENT, sync);
    return () => window.removeEventListener(AUTH_EVENT, sync);
  }, []);

  const login = () => {
    localStorage.setItem(AUTH_KEY, "1");
    setIsLoggedIn(true);
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsLoggedIn(false);
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  return { isLoggedIn, ready, login, logout };
}
