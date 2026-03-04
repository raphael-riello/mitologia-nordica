import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} — Mitologia Nórdica` : "Mitologia Nórdica — Portal dos Nove Mundos";
    return () => {
      document.title = prev;
    };
  }, [title]);
}
