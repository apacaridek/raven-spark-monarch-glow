import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-BjV8J5vt.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SYSTEM = `Kamu adalah Monkey, asisten orbital yang tenang.
Jawab dalam bahasa Indonesia yang santai, jelas, dan ramah.
Jangan sebut nama model atau provider kecuali diminta.
Jangan bantu aktivitas ilegal. Nada: tenang, presisi, seperti di stasiun luar angkasa.`;
var askMonkey_createServerFn_handler = createServerRpc({
	id: "aa7b8da9106f9d50e82b82a6fa778e86e290738047d4cb72fe225ebd818f3e1c",
	name: "askMonkey",
	filename: "src/lib/chat.ts"
}, (opts) => askMonkey.__executeServer(opts));
var askMonkey = createServerFn({ method: "POST" }).validator((input) => input).handler(askMonkey_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Sinyal AI tidak tersedia di stasiun ini."
	};
	const trimmed = data.messages.filter((m) => m.content.trim()).slice(-12).map((m) => ({
		role: m.role,
		content: m.content.slice(0, 4e3)
	}));
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .7,
			max_tokens: 800,
			messages: [{
				role: "system",
				content: SYSTEM
			}, ...trimmed]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Tautan putus (${res.status}). Coba lagi.`
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Tidak ada balasan dari orbit."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { askMonkey_createServerFn_handler };
