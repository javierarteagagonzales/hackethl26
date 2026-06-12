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
  },
  {
    id: "arkiv-track",
    title: "Arkiv",
    sponsor: "Arkiv",
    description: "Build innovative solutions for job boards, wikis, and event platforms.",
    color: "from-purple-500 to-pink-400",
    categories: ["Job Platform", "Wikis", "Events Platform"],
    prizes: [
      { name: "Global Winners Pool", amount: "$2,500 USDC" },
      { name: "Local Winner", amount: "Special Prize" }
    ],
    totalPrizePool: "$2,500 USDC"
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
    activeEvents: [],
    pastEvents: []
  },
  "arkiv-track": {
    id: "arkiv-track",
    heroImage: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2070&auto=format&fit=crop",
    title: "Explore Arkiv Build",
    description: "Join the Arkiv Buildathon to build the next generation of job boards, wikis, and event platforms.",
    activeEvents: [],
    pastEvents: [],
    formation: {
      description: "Find all the information, documentation, and resources needed to build on Arkiv. Learn how to integrate our network and use our tools for your project.",
      links: [
        { title: "Arkiv Network", url: "https://arkiv.network/" },
        { title: "Arkiv Docs", url: "https://docs.arkiv.network/" }
      ]
    }
  }
};
