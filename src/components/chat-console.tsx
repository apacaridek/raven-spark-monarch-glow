import { useEffect, useRef, useState } from "react";
import { ArrowUp, Orbit } from "lucide-react";
import { askMonkey, type ChatTurn } from "@/lib/chat";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "monkey-orbit-chat";

export function ChatConsole({ onExit }: { onExit: () => void }) {
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw) as ChatTurn[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-24)));
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setError(null);
    const next: ChatTurn[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setBusy(true);
    const result = await askMonkey({ data: { messages: next } });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setMessages([...next, { role: "assistant", content: result.text }]);
    fieldRef.current?.focus();
  }

  function reset() {
    setMessages([]);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-[env(safe-area-inset-bottom)] pt-4 sm:px-6">
      <header className="flex items-center justify-between rounded-xl border border-border bg-surface/80 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-sm border border-border bg-elevated">
            <Orbit className="size-4 text-fg" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-display text-sm font-medium tracking-wide">Monkey</p>
            <p className="font-mono text-[10px] tracking-widest text-muted uppercase">
              Orbital link
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="h-10 px-3 text-xs" onClick={reset}>
            Reset
          </Button>
          <Button variant="ghost" className="h-10 px-3 text-xs" onClick={onExit}>
            Hatch
          </Button>
        </div>
      </header>

      <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-xl border border-border bg-surface/60 px-4 py-5">
        {messages.length === 0 && !busy ? (
          <div className="m-auto max-w-sm text-center">
            <p className="font-display text-xl text-fg">Ruang senyap</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Kirim sinyal pertama. Monkey menjawab dari orbit.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {messages.map((m, i) => (
              <li
                key={`${m.role}-${i}`}
                className={cn(
                  "max-w-[92%] rounded-lg px-4 py-3 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-elevated text-fg"
                    : "mr-auto border border-border bg-bg text-fg",
                )}
              >
                <p className="mb-1 font-mono text-[10px] tracking-widest text-muted uppercase">
                  {m.role === "user" ? "Ground" : "Monkey"}
                </p>
                <p className="whitespace-pre-wrap">{m.content}</p>
              </li>
            ))}
            {busy ? (
              <li className="mr-auto rounded-lg border border-border bg-bg px-4 py-3 text-sm text-muted">
                Menerima sinyal…
              </li>
            ) : null}
          </ul>
        )}
        <div ref={endRef} />
      </div>

      {error ? (
        <p className="mt-3 text-center text-sm text-muted">{error}</p>
      ) : null}

      <form
        className="mt-3 mb-4 flex items-end gap-2 rounded-xl border border-border bg-surface p-2"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <textarea
          ref={fieldRef}
          value={input}
          rows={1}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
          placeholder="Kirim sinyal…"
          className="min-h-11 max-h-36 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-fg placeholder:text-subtle focus:outline-none"
        />
        <Button
          type="submit"
          className="size-11 shrink-0 rounded-md p-0"
          disabled={busy || !input.trim()}
          aria-label="Kirim"
        >
          <ArrowUp className="size-4" />
        </Button>
      </form>
    </div>
  );
}
