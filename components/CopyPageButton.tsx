import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Router from "next/router";

type State = "idle" | "loading" | "copied" | "error";

interface Props {
  filePath: string;
  filePathFallback: string;
  repoBase: string;
}

function Button({ filePath, filePathFallback, repoBase }: Props) {
  const [state, setState] = useState<State>("idle");

  async function handleCopy() {
    if (!repoBase) return;
    setState("loading");
    try {
      let res = await fetch(`${repoBase}/${filePath}`);
      if (!res.ok) res = await fetch(`${repoBase}/${filePathFallback}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("error");
    } finally {
      setTimeout(() => setState("idle"), 2000);
    }
  }

  const label =
    state === "loading"
      ? "Copying…"
      : state === "copied"
        ? "Copied!"
        : state === "error"
          ? "Failed"
          : "Copy page";

  return (
    <button
      onClick={handleCopy}
      disabled={state === "loading"}
      title="Copy page as MDX"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        height: "1.75rem",
        padding: "0 0.5rem",
        fontSize: "0.75rem",
        fontWeight: 500,
        borderRadius: "0.375rem",
        border: "1px solid color-mix(in srgb, currentColor 25%, transparent)",
        background: "transparent",
        color: "inherit",
        cursor: state === "loading" ? "wait" : "pointer",
        opacity: state === "loading" ? 0.7 : 1,
        whiteSpace: "nowrap",
        lineHeight: 1,
        userSelect: "none",
        flexShrink: 0,
        marginLeft: "auto",
      }}
    >
      {state !== "copied" && state !== "error" && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z" />
          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
        </svg>
      )}
      {label}
    </button>
  );
}

export default function CopyPageButton(props: Props) {
  const [mountNode, setMountNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    function attach() {
      setMountNode((prev) => {
        prev?.remove();
        const breadcrumb = document.querySelector(".nextra-breadcrumb");
        if (!breadcrumb) return null;
        const mount = document.createElement("div");
        mount.style.cssText = "display:contents";
        breadcrumb.appendChild(mount);
        return mount;
      });
    }

    attach();
    Router.events.on("routeChangeComplete", attach);

    return () => {
      Router.events.off("routeChangeComplete", attach);
      setMountNode((prev) => { prev?.remove(); return null; });
    };
  }, []);

  if (!mountNode) return null;
  return createPortal(<Button {...props} />, mountNode);
}
