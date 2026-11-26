import Directory from "@/components/home/Directory";
import { getToolSummaries } from "@/lib/tools";

export default function Home() {
  // Se lee el catálogo en el servidor y solo viaja al navegador lo que usa el directorio.
  return <Directory tools={getToolSummaries()} />;
}
