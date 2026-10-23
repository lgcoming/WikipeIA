import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false durante el SSR y la hidratación, true después: evita discrepancias de hidratación
// sin llamar a setState dentro de un efecto.
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
