import { createServerFn } from "@tanstack/react-start";

export type ChatTurn = { role: "user" | "assistant"; content: string };

const SYSTEM = `Kamu adalah Monkey, asisten orbital yang tenang.
Jawab dalam bahasa Indonesia yang santai, jelas, dan ramah.
Jangan sebut nama model atau provider kecuali diminta.
Jangan bantu aktivitas ilegal. Nada: tenang, presisi, seperti di stasiun luar angkasa.`;

export const askMonkey = createServerFn({ method: "POST" })
  .validator((input: { messages: ChatTurn[] }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Sinyal AI tidak tersedia di stasiun ini." };
    }

    const trimmed = data.messages
      .filter((m) => m.content.trim())
      .slice(-12)
      .map((m) => ({
        role: m.role,
        content: m.content.slice(0, 4000),
      }));

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.7,
        max_tokens: 800,
        messages: [{ role: "system", content: SYSTEM }, ...trimmed],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Tautan putus (${res.status}). Coba lagi.` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) {
      return { ok: false as const, error: "Tidak ada balasan dari orbit." };
    }
    return { ok: true as const, text };
  });
