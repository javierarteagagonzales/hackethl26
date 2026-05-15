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
