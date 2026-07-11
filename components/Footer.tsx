"use client";

import { useEffect, useState } from "react";

function useUptime() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`;
}

export default function Footer() {
  const uptime = useUptime();

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span>© 2026 Salon Raut — all systems operational</span>
        <span className="footer__status">
          <span className="pulse" /> uptime {uptime}
        </span>
      </div>
    </footer>
  );
}
