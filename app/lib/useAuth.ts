"use client";
import { useState, useEffect } from "react";

const AUTH_KEY = "ytutor-auth";
const ROLE_KEY = "ytutor-role";
const AUTH_EVENT = "ytutor-auth-change";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      const loggedIn = localStorage.getItem(AUTH_KEY) === "1";
      setIsLoggedIn(loggedIn);
      setIsTeacher(loggedIn && localStorage.getItem(ROLE_KEY) !== "general");
    };
    sync();
    setReady(true);
    window.addEventListener(AUTH_EVENT, sync);
    return () => window.removeEventListener(AUTH_EVENT, sync);
  }, []);

  const login = () => {
    localStorage.setItem(AUTH_KEY, "1");
    if (!localStorage.getItem(ROLE_KEY)) localStorage.setItem(ROLE_KEY, "teacher");
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ROLE_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  return { isLoggedIn, isTeacher, ready, login, logout };
}
