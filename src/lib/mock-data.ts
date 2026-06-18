export const MOCK_TRACKS = [
  {
    id: "arbitrum-track",
    title: "Arbitrum",
    sponsor: "Arbitrum",
    description: "Build the future of Ethereum scaling with Arbitrum.",
    color: "from-blue-500 to-cyan-400",
    categories: ["General"],
    prizes: [
      { name: "1st Place", amount: "$900" },
      { name: "2nd Place", amount: "$700" },
      { name: "Bounties", amount: "$500" }
    ],
    totalPrizePool: "$2,100"
  }
];

export const MOCK_STATS = {
  totalUsers: "1,248",
  activeTeams: "312",
  projectsSubmitted: "145",
  pendingApprovals: "89"
};

export const MOCK_TRACK_DETAILS: Record<string, any> = {
  "arbitrum-track": {
    id: "arbitrum-track",
    heroImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
    title: "Explore Arbitrum",
    description: "Build the decentralized future with Arbitrum's scaling solutions.",
    website: "https://arbitrum.io",
    socials: {
      x: { handle: "@arbitrum", url: "https://x.com/arbitrum" },
      discord: { handle: "Arbitrum Discord", url: "https://discord.gg/arbitrum" },
      github: { handle: "OffchainLabs", url: "https://github.com/OffchainLabs" }
    },
    activeEvents: [],
    pastEvents: [],
    formation: {
      description: "Tanto si eres nuevo en Web3 como si ya desarrollas contratos inteligentes avanzados, aquí encontrarás el camino para construir sobre Arbitrum. Sigue los niveles en orden o ve directo al que corresponda a tu experiencia.",
      levels: [
        {
          level: "Principiante",
          badge: "01",
          goal: "Entiende qué es una Capa 2 y da tus primeros pasos como usuario sin necesidad de tocar código.",
          resources: [
            {
              title: "Introducción oficial a Arbitrum",
              description: "Una guía amigable que explica por qué Ethereum necesita soluciones de escalabilidad y cómo Arbitrum resuelve ese problema.",
              url: "https://docs.arbitrum.io/get-started/arbitrum-introduction"
            },
            {
              title: "Tutorial del Puente de Arbitrum",
              description: "Guía paso a paso para conectar tu billetera y transferir fondos desde Ethereum de forma segura.",
              url: "https://docs.arbitrum.io/arbitrum-bridge/quickstart"
            },
            {
              title: "Portal de Arbitrum",
              description: "Catálogo oficial para descubrir aplicaciones, juegos y herramientas verificadas y activas en la red.",
              url: "https://portal.arbitrum.io/"
            }
          ]
        },
        {
          level: "Intermedio",
          badge: "02",
          goal: "Aprende a usar los protocolos DeFi de la red e interpreta datos de actividad y seguridad en cadena.",
          resources: [
            {
              title: "Layer3 — Misiones interactivas",
              description: "Tutoriales gamificados enfocados en Arbitrum donde realizas acciones reales en la blockchain y acumulas experiencia.",
              url: "https://layer3.xyz/"
            },
            {
              title: "L2BEAT — Panel de seguridad",
              description: "La referencia de la industria para auditar la seguridad de una Capa 2, revisar sus riesgos y verificar el TVL bloqueado.",
              url: "https://l2beat.com/scaling/projects/arbitrum"
            },
            {
              title: "Arbiscan — Explorador de la red",
              description: "Rastrea el estado de tus transacciones, saldos de billeteras y costos exactos de gas directamente en la red.",
              url: "https://arbiscan.io/"
            }
          ]
        },
        {
          level: "Avanzado",
          badge: "03",
          goal: "Programa tus primeros contratos inteligentes con Solidity en el entorno compatible con Ethereum (EVM).",
          resources: [
            {
              title: "Solidity Quickstart (Remix)",
              description: "Tutorial oficial desde cero para compilar y desplegar tu primer contrato inteligente usando la herramienta online Remix.",
              url: "https://docs.arbitrum.io/build-decentralized-apps/quickstart-solidity-remix"
            },
            {
              title: "Foundry en Arbitrum",
              description: "Comandos y estructura para crear, compilar y verificar un contrato o token ERC-20 usando Foundry como entorno de desarrollo.",
              url: "https://docs.arbitrum.io/build-decentralized-apps/quickstart-create-a-token"
            }
          ]
        },
        {
          level: "Experto",
          badge: "04",
          goal: "Lleva la eficiencia al límite programando contratos inteligentes en Rust compilados a WebAssembly con Stylus.",
          resources: [
            {
              title: "Stylus Rust Quickstart",
              description: "Desde instalar cargo-stylus hasta compilar tu código a WASM y desplegarlo en la red. El punto de partida definitivo.",
              url: "https://docs.arbitrum.io/stylus/quickstart"
            },
            {
              title: "Stylus Rust SDK — Referencia completa",
              description: "Domina el manejo de storage y la optimización de gas en Rust para sacar el máximo rendimiento de tus contratos Stylus.",
              url: "https://docs.arbitrum.io/stylus/reference/overview"
            }
          ]
        }
      ]
    }
  }
};
