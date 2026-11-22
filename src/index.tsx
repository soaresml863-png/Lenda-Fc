import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, Mic, Shield, Trophy, Users, Award } from "lucide-react";
import { Brand } from "@/components/game/Brand";
import { Button } from "@/components/ui/button";
import { LEAGUES } from "@/game/data/leagues";
import { useHydrated } from "@/hooks/use-hydrated";
import { useGame } from "@/game/store";
import { teamName } from "@/game/engine/world";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lenda FC — Modo carreira de jogador de futebol" },
      { name: "description", content: "Do primeiro contrato à Bola de Ouro: ligas do mundo inteiro, Champions, Libertadores, Copa do Mundo, imprensa e decisões de carreira." },
      { property: "og:title", content: "Lenda FC — Modo carreira de jogador de futebol" },
      { property: "og:description", content: "Do primeiro contrato à Bola de Ouro: ligas do mundo inteiro, copas, seleção, imprensa e decisões de carreira." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const clubs = LEAGUES.reduce((a, l) => a + l.teams.length, 0);

const FEATURES = [
  { icon: Globe2, title: `${LEAGUES.length} ligas · ${clubs} clubes`, text: "Brasileirão, Premier League, La Liga, Serie A, Bundesliga, MLS, Saudi Pro League e mais." },
  { icon: Trophy, title: "Todos os campeonatos", text: "Copas nacionais, Champions, Libertadores, Sul-Americana, Mundial de Clubes e Intercontinental." },
  { icon: Shield, title: "Seleção nacional", text: "Seja convocado para a Copa do Mundo, Copa América, Eurocopa e outros torneios." },
  { icon: Award, title: "Bola de Ouro", text: "Melhor em campo, Chuteira de Ouro, Troféu Kopa, Puskás e a disputa pela Bola de Ouro." },
  { icon: Mic, title: "Imprensa", text: "Coletivas, rumores e manchetes que mudam sua fama e sua relação com o técnico." },
  { icon: Users, title: "Decisões de carreira", text: "Propostas, renovações, capitania, patrocínios e a hora de pendurar as chuteiras." },
];

function Index() {
  const hydrated = useHydrated();
  const save = useGame((s) => s.save);
  const hasSave = hydrated && save;

  return (
    <div className="min-h-screen">
      <div className="pitch-stripes bg-hero relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-chalk" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 bg-chalk" />
        <div aria-hidden className="animate-floodlight pointer-events-none absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Brand />
          {hasSave && (
            <Button asChild variant="chalk" size="sm">
              <Link to="/carreira">Continuar</Link>
            </Button>
          )}
        </header>
        <section className="relative mx-auto max-w-6xl px-5 pb-24 pt-16 text-center md:pt-24">
          <p className="text-label text-primary">Modo carreira · jogador</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-display text-6xl sm:text-8xl md:text-9xl">
            Do primeiro contrato à <span className="text-gold">Bola de Ouro</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Crie seu jogador aos 17 anos, escolha o clube e escreva sua história em ligas do mundo inteiro.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/novo">Nova carreira</Link>
            </Button>
            {hasSave && (
              <Button asChild variant="chalk" size="xl">
                <Link to="/carreira">
                  Continuar com {save.player.name} · {teamName(save.clubId)}
                </Link>
              </Button>
            )}
          </div>
        </section>
      </div>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-5 shadow-card">
            <f.icon className="size-6 text-primary" />
            <h2 className="mt-3 font-condensed text-xl font-bold uppercase tracking-wide">{f.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">Lenda FC · seu progresso fica salvo neste navegador</footer>
    </div>
  );
}
