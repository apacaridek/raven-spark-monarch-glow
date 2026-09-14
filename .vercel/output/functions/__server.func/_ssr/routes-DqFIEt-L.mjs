import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as Orbit, r as ArrowUp } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DqFIEt-L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Starfield() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let w = 0;
		let h = 0;
		let raf = 0;
		const stars = [];
		function resize() {
			w = canvas.width = window.innerWidth * devicePixelRatio;
			h = canvas.height = window.innerHeight * devicePixelRatio;
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${window.innerHeight}px`;
		}
		function seed() {
			stars.length = 0;
			const n = Math.min(220, Math.floor(w * h / 18e3));
			for (let i = 0; i < n; i++) stars.push({
				x: Math.random() * w,
				y: Math.random() * h,
				z: .2 + Math.random() * .8,
				s: Math.random()
			});
		}
		function draw(t) {
			ctx.fillStyle = "#050814";
			ctx.fillRect(0, 0, w, h);
			for (const star of stars) {
				const tw = reduce ? 1 : .55 + Math.sin(t * .0012 + star.s * 12) * .45;
				const r = (.4 + star.z * 1.2) * devicePixelRatio;
				ctx.fillStyle = `rgba(232, 238, 252, ${.15 + star.z * .55 * tw})`;
				ctx.beginPath();
				ctx.arc(star.x, star.y, r, 0, Math.PI * 2);
				ctx.fill();
				if (!reduce) {
					star.y += star.z * .12 * devicePixelRatio;
					if (star.y > h) {
						star.y = 0;
						star.x = Math.random() * w;
					}
				}
			}
			if (!reduce) raf = requestAnimationFrame(draw);
		}
		resize();
		seed();
		draw(0);
		window.addEventListener("resize", () => {
			resize();
			seed();
		});
		return () => {
			cancelAnimationFrame(raf);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "pointer-events-none fixed inset-0 z-0",
		"aria-hidden": "true"
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-opacity duration-150 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90 active:scale-[0.98]",
			ghost: "bg-transparent text-fg border border-border hover:bg-elevated"
		},
		size: {
			default: "h-11 px-5 rounded-md text-sm",
			lg: "h-12 px-6 rounded-lg text-sm tracking-wide"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Airlock({ onEnter }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-[0.28em] text-muted uppercase",
				children: "Sector 07 · Hatch unlocked"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex size-14 items-center justify-center rounded-xl border border-border bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, {
					className: "size-6 text-fg",
					strokeWidth: 1.5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-8 font-display text-5xl font-medium tracking-tight text-fg sm:text-6xl",
				children: "Monkey"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-base leading-relaxed text-muted",
				children: "Asisten di orbit senyap. Buka hatch, lalu bicara — seperti mengirim sinyal ke stasiun yang jauh."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-10 min-w-44",
				size: "lg",
				onClick: onEnter,
				children: "Masuk stasiun"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-mono text-[11px] tracking-widest text-subtle",
				children: "VACUUM · 0.0 kPa · COMMS READY"
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askMonkey = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("aa7b8da9106f9d50e82b82a6fa778e86e290738047d4cb72fe225ebd818f3e1c"));
var STORAGE_KEY = "monkey-orbit-chat";
function ChatConsole({ onExit }) {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const endRef = (0, import_react.useRef)(null);
	const fieldRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setMessages(JSON.parse(raw));
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-24)));
	}, [messages]);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, busy]);
	async function send() {
		const text = input.trim();
		if (!text || busy) return;
		setInput("");
		setError(null);
		const next = [...messages, {
			role: "user",
			content: text
		}];
		setMessages(next);
		setBusy(true);
		const result = await askMonkey({ data: { messages: next } });
		setBusy(false);
		if (!result.ok) {
			setError(result.error);
			return;
		}
		setMessages([...next, {
			role: "assistant",
			content: result.text
		}]);
		fieldRef.current?.focus();
	}
	function reset() {
		setMessages([]);
		setError(null);
		localStorage.removeItem(STORAGE_KEY);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-10 mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-[env(safe-area-inset-bottom)] pt-4 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between rounded-xl border border-border bg-surface/80 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-9 items-center justify-center rounded-sm border border-border bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, {
							className: "size-4 text-fg",
							strokeWidth: 1.5
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-medium tracking-wide",
						children: "Monkey"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-widest text-muted uppercase",
						children: "Orbital link"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "h-10 px-3 text-xs",
						onClick: reset,
						children: "Reset"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "h-10 px-3 text-xs",
						onClick: onExit,
						children: "Hatch"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex min-h-0 flex-1 flex-col overflow-y-auto rounded-xl border border-border bg-surface/60 px-4 py-5",
				children: [messages.length === 0 && !busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "m-auto max-w-sm text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl text-fg",
						children: "Ruang senyap"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: "Kirim sinyal pertama. Monkey menjawab dari orbit."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "flex flex-col gap-4",
					children: [messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("max-w-[92%] rounded-lg px-4 py-3 text-sm leading-relaxed", m.role === "user" ? "ml-auto bg-elevated text-fg" : "mr-auto border border-border bg-bg text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 font-mono text-[10px] tracking-widest text-muted uppercase",
							children: m.role === "user" ? "Ground" : "Monkey"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap",
							children: m.content
						})]
					}, `${m.role}-${i}`)), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "mr-auto rounded-lg border border-border bg-bg px-4 py-3 text-sm text-muted",
						children: "Menerima sinyal…"
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-sm text-muted",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 mb-4 flex items-end gap-2 rounded-xl border border-border bg-surface p-2",
				onSubmit: (e) => {
					e.preventDefault();
					send();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					ref: fieldRef,
					value: input,
					rows: 1,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							send();
						}
					},
					placeholder: "Kirim sinyal…",
					className: "min-h-11 max-h-36 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-fg placeholder:text-subtle focus:outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "size-11 shrink-0 rounded-md p-0",
					disabled: busy || !input.trim(),
					"aria-label": "Kirim",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
				})]
			})
		]
	});
}
function Home() {
	const [inside, setInside] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh overflow-hidden bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}), !ready ? null : inside ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatConsole, { onExit: exit }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Airlock, { onEnter: enter })]
	});
}
//#endregion
export { Home as component };
