import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Starfield } from "@/components/starfield";
import { Airlock } from "@/components/airlock";
import { ChatConsole } from "@/components/chat-console";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [inside, setInside] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setInside(sessionStorage.getItem("monkey-inside") === "1");
    setReady(true);
  }, []);

  function enter() {
    sessionStorage.setItem("monkey-inside", "1");
    setInside(true);
  }

  function exit() {
    sessionStorage.removeItem("monkey-inside");
    setInside(false);
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <Starfield />
      {!ready ? null : inside ? (
        <ChatConsole onExit={exit} />
      ) : (
        <Airlock onEnter={enter} />
      )}
    </main>
  );
}
