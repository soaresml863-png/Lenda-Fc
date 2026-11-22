import { createFileRoute } from "@tanstack/react-router";
import { LastMatch, NextMatch } from "@/components/game/MatchCards";
import { PlayerCard } from "@/components/game/PlayerCard";
import { Retired, SeasonEnd } from "@/components/game/SeasonEnd";
import { CompetitionsPanel, SeasonStatsPanel } from "@/components/game/SeasonPanels";
import { useSave } from "@/game/store";

export const Route = createFileRoute("/carreira/")({
  head: () => ({
    meta: [
      { title: "Painel da carreira — Lenda FC" },
      { name: "description", content: "Jogue a próxima partida, acompanhe sua nota, gols e prêmios de melhor em campo." },
      { property: "og:title", content: "Painel da carreira — Lenda FC" },
      { property: "og:description", content: "Jogue a próxima partida e acompanhe sua temporada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const save = useSave();
  if (save.phase === "retired") return <Retired save={save} />;
  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <PlayerCard save={save} />
      <div className="space-y-5">
        {save.phase === "seasonEnd" ? (
          <SeasonEnd save={save} />
        ) : (
          <>
            <NextMatch save={save} />
            <div className="grid gap-5 xl:grid-cols-2">
              <LastMatch r={save.lastMatch} />
              <CompetitionsPanel save={save} />
            </div>
            <SeasonStatsPanel save={save} />
          </>
        )}
      </div>
    </div>
  );
}
