export type Role = "Jungler" | "Mid" | "EXP" | "Gold" | "Roam";

export interface Player {
  id: string;
  ign: string;
  realName?: string;
  role: Role;
  captain?: boolean;
  rank: string;
  peakRank?: string;
  winRate: number;
  matchesPlayed: number;
  signatureHeroes: { name: string; image?: string }[];
  joinedDate: string;
  bio?: string;
}

export interface Match {
  id: string;
  date: string;
  opponent: string;
  opponentLogo?: string;
  format: "Bo1" | "Bo3" | "Bo5" | "Scrim";
  tournament?: string;
  score: [number, number];
  result: "win" | "loss";
  mvp?: string;
  notes?: string;
  games?: MatchGame[];
}

export interface MatchGame {
  game: number;
  win: boolean;
  duration: string;
  mvp?: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  placement: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  src?: string;
  caption?: string;
  type: "screenshot" | "event" | "meme";
}

export const ROLE_META: Record<Role, { color: string; label: string }> = {
  Jungler: { color: "#f43f5e", label: "Jungle" },
  Mid: { color: "#38bdf8", label: "Mid Lane" },
  EXP: { color: "#fb923c", label: "EXP Lane" },
  Gold: { color: "#facc15", label: "Gold Lane" },
  Roam: { color: "#22d3ee", label: "Roam" },
};

export const players: Player[] = [
  {
    id: "venomfang",
    ign: "VenomFang",
    realName: "Mark",
    role: "Jungler",
    captain: true,
    rank: "Mythical Glory 812 pts",
    peakRank: "Top 3 Local Leaderboard",
    winRate: 71.4,
    matchesPlayed: 1284,
    signatureHeroes: [
      { name: "Lancelot" },
      { name: "Fanny" },
      { name: "Hayabusa" },
      { name: "Ling" },
    ],
    joinedDate: "2023-02-14",
    bio: "Founder and shotcaller. Known for hyper-aggressive invades and clutch lord steals. Plays best when the game is on the line.",
  },
  {
    id: "serpentine",
    ign: "Serpentine",
    realName: "Jhay",
    role: "Mid",
    rank: "Mythical Glory 640 pts",
    peakRank: "Mythical Glory",
    winRate: 68.9,
    matchesPlayed: 1102,
    signatureHeroes: [
      { name: "Kagura" },
      { name: "Lunox" },
      { name: "Valentina" },
      { name: "Novaria" },
    ],
    joinedDate: "2023-03-01",
    bio: "The rotation engine. Rarely loses lane, always first to side objectives. Kagura umbrella mechanics are a highlight reel on their own.",
  },
  {
    id: "toxinscale",
    ign: "ToxinScale",
    realName: "Raven",
    role: "EXP",
    rank: "Mythic Honor",
    peakRank: "Mythical Glory",
    winRate: 66.2,
    matchesPlayed: 967,
    signatureHeroes: [
      { name: "Yu Zhong" },
      { name: "Paquito" },
      { name: "Chou" },
      { name: "Terizla" },
    ],
    joinedDate: "2023-05-20",
    bio: "Lane bully specialist. Wins the EXP matchup more often than not and opens space with perfectly timed ultimate entries.",
  },
  {
    id: "necrovia",
    ign: "Necrovia",
    realName: "Ella",
    role: "Gold",
    rank: "Mythical Glory 507 pts",
    peakRank: "Mythical Glory",
    winRate: 69.8,
    matchesPlayed: 1043,
    signatureHeroes: [
      { name: "Beatrix" },
      { name: "Claude" },
      { name: "Brody" },
      { name: "Moskov" },
    ],
    joinedDate: "2024-01-08",
    bio: "Positioning prodigy. Four-hero Beatrix arsenal keeps bans guessing. Turns even gold deficits into teamfight-winning damage.",
  },
  {
    id: "hemashield",
    ign: "HemaShield",
    realName: "Toto",
    role: "Roam",
    rank: "Mythic Honor",
    peakRank: "Mythical Glory",
    winRate: 64.5,
    matchesPlayed: 1189,
    signatureHeroes: [
      { name: "Franco" },
      { name: "Mathilda" },
      { name: "Tigreal" },
      { name: "Chip" },
    ],
    joinedDate: "2023-04-11",
    bio: "The squad's guardian. Vision control, pick comp mastery, and Franco hooks that decide drafts before they start.",
  },
  {
    id: "vipervenom",
    ign: "ViperVenom",
    realName: "Kai",
    role: "Mid",
    rank: "Mythic",
    peakRank: "Mythic Honor",
    winRate: 61.3,
    matchesPlayed: 720,
    signatureHeroes: [
      { name: "Selena" },
      { name: "Cyclops" },
      { name: "Xavier" },
      { name: "Vexana" },
    ],
    joinedDate: "2024-06-30",
    bio: "Sixth man and flex pick. Subs into mid or roam on tournament days — Selena arrow accuracy is feared in scrims.",
  },
];

export const matches: Match[] = [
  {
    id: "m-2026-011",
    date: "2026-08-15",
    opponent: "Ironclad Five",
    format: "Bo5",
    tournament: "Squad Clash Championship — Grand Finals",
    score: [3, 1],
    result: "win",
    mvp: "venomfang",
    notes: "Dropped game one, then ran three straight dominant wins.",
    games: [
      { game: 1, win: false, duration: "18:42", mvp: undefined },
      { game: 2, win: true, duration: "14:55", mvp: "necrovia" },
      { game: 3, win: true, duration: "22:10", mvp: "venomfang" },
      { game: 4, win: true, duration: "17:33", mvp: "serpentine" },
    ],
  },
  {
    id: "m-2026-010",
    date: "2026-08-14",
    opponent: "Nightfall Esports",
    format: "Bo3",
    tournament: "Squad Clash Championship — Semifinals",
    score: [2, 0],
    result: "win",
    mvp: "necrovia",
    games: [
      { game: 1, win: true, duration: "16:04", mvp: "necrovia" },
      { game: 2, win: true, duration: "19:47", mvp: "hemashield" },
    ],
  },
  {
    id: "m-2026-009",
    date: "2026-08-09",
    opponent: "Grim Reapers",
    format: "Bo3",
    tournament: "Squad Clash Championship — Quarterfinals",
    score: [2, 1],
    result: "win",
    mvp: "serpentine",
    notes: "Lost game one to a pick comp; adapted bans and took the series.",
    games: [
      { game: 1, win: false, duration: "21:18" },
      { game: 2, win: true, duration: "15:29", mvp: "serpentine" },
      { game: 3, win: true, duration: "20:02", mvp: "toxinscale" },
    ],
  },
  {
    id: "m-2026-008",
    date: "2026-07-28",
    opponent: "Obsidian Order",
    format: "Scrim",
    score: [1, 2],
    result: "loss",
    notes: "Experimental draft week — testing gold lane flex picks.",
  },
  {
    id: "m-2026-007",
    date: "2026-07-21",
    opponent: "Titan Circuit",
    format: "Bo3",
    tournament: "Summer Skirmish Cup",
    score: [2, 0],
    result: "win",
    mvp: "toxinscale",
    games: [
      { game: 1, win: true, duration: "13:58", mvp: "toxinscale" },
      { game: 2, win: true, duration: "17:41" },
    ],
  },
  {
    id: "m-2026-006",
    date: "2026-07-19",
    opponent: "Void Walkers",
    format: "Bo3",
    tournament: "Summer Skirmish Cup",
    score: [0, 2],
    result: "loss",
    notes: "Banned out of comfort picks; valuable lesson on pocket picks.",
  },
  {
    id: "m-2026-005",
    date: "2026-07-12",
    opponent: "Crimson Hive",
    format: "Scrim",
    score: [3, 0],
    result: "win",
  },
  {
    id: "m-2026-004",
    date: "2026-06-27",
    opponent: "Stormbreak",
    format: "Bo5",
    tournament: "Regional Qualifiers — Finals",
    score: [3, 2],
    result: "win",
    mvp: "hemashield",
    notes: "Game 5 hinge play: HemaShield Franco hook at 22 min sealed the series.",
    games: [
      { game: 1, win: true, duration: "19:12", mvp: "venomfang" },
      { game: 2, win: false, duration: "24:36" },
      { game: 3, win: true, duration: "16:50", mvp: "necrovia" },
      { game: 4, win: false, duration: "28:04" },
      { game: 5, win: true, duration: "23:57", mvp: "hemashield" },
    ],
  },
  {
    id: "m-2026-003",
    date: "2026-06-14",
    opponent: "Phantom Legion",
    format: "Scrim",
    score: [2, 1],
    result: "win",
  },
  {
    id: "m-2026-002",
    date: "2026-05-30",
    opponent: "Ashen Kings",
    format: "Bo3",
    tournament: "Regional Qualifiers — Semifinals",
    score: [2, 0],
    result: "win",
    mvp: "necrovia",
    games: [
      { game: 1, win: true, duration: "15:44", mvp: "necrovia" },
      { game: 2, win: true, duration: "18:26" },
    ],
  },
  {
    id: "m-2026-001",
    date: "2026-05-17",
    opponent: "Dusk Syndicate",
    format: "Scrim",
    score: [1, 2],
    result: "loss",
  },
];

export const achievements: Achievement[] = [
  {
    id: "a-2026-03",
    title: "Champion — Squad Clash Championship S3",
    date: "2026-08-15",
    placement: "1st",
  },
  {
    id: "a-2026-02",
    title: "Champion — Summer Skirmish Cup",
    date: "2026-07-21",
    placement: "1st",
  },
  {
    id: "a-2026-01",
    title: "Qualified — Regional Finals",
    date: "2026-06-27",
    placement: "1st",
  },
  {
    id: "a-2025-04",
    title: "Top 4 — Winter Warfare League",
    date: "2025-12-13",
    placement: "Top 4",
  },
  {
    id: "a-2025-03",
    title: "Champion — Campus Clash Season 3",
    date: "2025-09-27",
    placement: "1st",
  },
];

export const galleryItems: GalleryItem[] = [  {
    id: "g-1",
    caption: "Grand Finals winning moment",
    type: "event",
  },
  {
    id: "g-2",
    caption: "Squad Clash trophy shot",
    type: "event",
  },
  {
    id: "g-3",
    caption: "Pentakill by VenomFang",
    type: "screenshot",
  },
  {
    id: "g-4",
    caption: "Bootcamp weekend grind",
    type: "event",
  },
  {
    id: "g-5",
    caption: "Maniac clip that broke Discord",
    type: "meme",
  },
  {
    id: "g-6",
    caption: "Draft board vs Stormbreak",
    type: "screenshot",
  },
  {
    id: "g-7",
    caption: "Team huddle before finals",
    type: "event",
  },
  {
    id: "g-8",
    caption: "Savage counter-pick montage",
    type: "screenshot",
  },
  {
    id: "g-9",
    caption: "Franco hook of the year nominee",
    type: "meme",
  },
];

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  tag: "Announcement" | "Tournament" | "Roster" | "Recap";
  excerpt: string;
  body: string[];
}

export const newsPosts: NewsPost[] = [
  {
    slug: "scc-season-3-champions",
    title: "Venom Vanguard Crowned SCC Season 3 Champions",
    date: "2026-08-16",
    tag: "Tournament",
    excerpt:
      "Down 0-1 in the Grand Finals, the squad ran three straight wins against Ironclad Five to lift the Squad Clash Championship trophy.",
    body: [
      "For the first time in squad history, Venom Vanguard is your Squad Clash Championship champion. After dropping game one of the Grand Finals to Ironclad Five, the team regrouped in the draft room and came out swinging — closing the series with three consecutive wins.",
      "Necrovia set the tone in game two with a near-flawless Beatrix performance, and VenomFang took over games three and four with back-to-back jungle clinics. Serpentine's game-four Kagura sealed the series at 18 minutes.",
      "The trophy comes with a direct invite to the Invitational Circuit this November. Full VOD review drops on Discord this weekend — thank you to everyone who watched live.",
    ],
  },
  {
    slug: "tryouts-open-exp-roam-subs",
    title: "Tryouts Open: EXP & Roam Subs Wanted",
    date: "2026-08-20",
    tag: "Announcement",
    excerpt:
      "With the Invitational Circuit approaching, we're opening two sub slots. Mythic+ players with deep hero pools should apply now.",
    body: [
      "Champions are made by depth, not just five names. Ahead of the November Invitational Circuit, Venom Vanguard is opening sub positions for EXP lane and Roam.",
      "Requirements are unchanged: current or peak Mythic rank, age 16+, mic required, and a minimum three-hero tournament pool for your role. Subs rotate into scrim blocks every other week and travel with the roster for LAN events.",
      "Applications close September 15 or when slots fill — historically, they fill fast. Head to the Recruit page or apply directly in our Discord #tryout channel.",
    ],
  },
  {
    slug: "regional-finals-qualifier-recap",
    title: "How We Survived a Game 5 Against Stormbreak",
    date: "2026-06-28",
    tag: "Recap",
    excerpt:
      "A full breakdown of the Regional Qualifiers Finals: the drafts that worked, the hook that ended it, and what comes next.",
    body: [
      "Five games. Two match points against us. One Franco hook that will live in squad lore forever.",
      "Stormbreak outdrafted us in games two and four with split-push comps we failed to answer early. Between games, the draft room simplified everything: comfort picks, early tempo, no fancy flexes. HemaShield's 22-minute game-five hook on their carry turned a losing fight into the series-ending push.",
      "The win qualifies us for the Regional Finals bracket. Scrim priority now shifts to late-game macro — watch the schedule page for our updated block times.",
    ],
  },
  {
    slug: "vipervenom-moves-to-sub",
    title: "Roster Update: ViperVenom Transitions to Sixth Man",
    date: "2026-05-02",
    tag: "Roster",
    excerpt:
      "After a strong season splitting time mid and roam, ViperVenom officially becomes our tournament sixth man.",
    body: [
      "ViperVenom joined as a mid laner but kept earning games with a Selena that terrorized our own scrims. Starting today, Kai officially moves into the sixth man role — first substitute across mid and roam for all official series.",
      "What does that mean? More rotation weeks, more starter contention, and a bigger hero pool in draft. Captains take note: banning against six players is harder than banning against five.",
    ],
  },
];

export type EventType = "Scrim" | "Tournament" | "Training" | "Stream";

export interface ScheduleEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  type: EventType;
  opponent?: string;
  notes?: string;
}

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: "e-2026-09-01",
    date: "2026-09-01",
    time: "19:00",
    title: "Weekly Scrim Block",
    type: "Scrim",
    opponent: "Crimson Hive",
    notes: "Best of 5 block, focus: early invade counters.",
  },
  {
    id: "e-2026-09-03",
    date: "2026-09-03",
    time: "19:30",
    title: "VOD Review Night",
    type: "Training",
    notes: "SCC Grand Finals rewatch — draft room only.",
  },
  {
    id: "e-2026-09-05",
    date: "2026-09-05",
    time: "20:00",
    title: "Tryout Lobby Night",
    type: "Scrim",
    notes: "Open lobbies for EXP/Roam applicants.",
  },
  {
    id: "e-2026-09-12",
    date: "2026-09-12",
    time: "18:00",
    title: "Autumn Ascension Cup",
    type: "Tournament",
    opponent: "TBD Bracket",
    notes: "First tournament of the fall split. Full roster expected.",
  },
  {
    id: "e-2026-09-19",
    date: "2026-09-19",
    time: "20:00",
    title: "Community Watch Party",
    type: "Stream",
    notes: "Invitational Circuit group draw, live on TikTok.",
  },
  {
    id: "e-2026-08-22",
    date: "2026-08-22",
    time: "19:00",
    title: "Champion Photo & Media Day",
    type: "Stream",
    notes: "Trophy shots, banner reveal, gallery refresh.",
  },
  {
    id: "e-2026-08-15",
    date: "2026-08-15",
    time: "17:00",
    title: "SCC Season 3 Grand Finals",
    type: "Tournament",
    opponent: "Ironclad Five",
    notes: "Won 3-1. Champions.",
  },
];

export interface Highlight {
  id: string;
  title: string;
  platform: "youtube" | "tiktok";
  videoId?: string;
  url?: string;
  player?: string;
  date: string;
}

export const highlights: Highlight[] = [
  {
    id: "h-1",
    title: "SCC Finals Game 4 — The Close-Out Teamfight",
    platform: "youtube",
    videoId: "aqz-KE-bpKQ",
    player: "venomfang",
    date: "2026-08-16",
  },
  {
    id: "h-2",
    title: "Lancelot Jungle Clinic vs Nightfall (Semis)",
    platform: "youtube",
    videoId: "aqz-KE-bpKQ",
    player: "venomfang",
    date: "2026-08-14",
  },
  {
    id: "h-3",
    title: "Beatrix Quadra Kill in 90 Seconds",
    platform: "tiktok",
    url: "https://www.tiktok.com/@venomvanguard",
    player: "necrovia",
    date: "2026-07-21",
  },
  {
    id: "h-4",
    title: "The Hook That Ended Stormbreak",
    platform: "youtube",
    videoId: "aqz-KE-bpKQ",
    player: "hemashield",
    date: "2026-06-27",
  },
  {
    id: "h-5",
    title: "Kagura Umbrella Outplay Compilation",
    platform: "tiktok",
    url: "https://www.tiktok.com/@venomvanguard",
    player: "serpentine",
    date: "2026-05-30",
  },
  {
    id: "h-6",
    title: "Yu Zhong 1v3 Hold on the EXP Lane",
    platform: "youtube",
    videoId: "aqz-KE-bpKQ",
    player: "toxinscale",
    date: "2026-05-17",
  },
];

export interface HistoryEntry {
  period: string;
  title: string;
  description: string;
}

export const historyTimeline: HistoryEntry[] = [
  {
    period: "Feb 2023",
    title: "The Squad Is Founded",
    description:
      "VenomFang and Serpentine form Venom Vanguard from a ranked grind group. First logo, first Discord, first 10-loss scrim night.",
  },
  {
    period: "Mid 2023",
    title: "Founding Five Complete",
    description:
      "ToxinScale, HemaShield, and the original gold laner lock in. The squad runs its first weekly scrim block against local teams.",
  },
  {
    period: "Sep 2025",
    title: "First Trophy — Campus Clash S3",
    description:
      "An undefeated playoff run delivers the squad's first championship. Necrovia debuts mid-tournament after an open tryout.",
  },
  {
    period: "Dec 2025",
    title: "First LAN — Winter Warfare Top 4",
    description:
      "First offline event. A top-4 finish against org-backed rosters puts VV on the regional map — and shows the gaps to fix.",
  },
  {
    period: "Jun 2026",
    title: "Regional Qualifiers Champions",
    description:
      "A five-game war against Stormbreak ends on a legendary Game 5 hook. VV qualifies for its first Regional Finals bracket.",
  },
  {
    period: "Aug 2026",
    title: "Squad Clash Championship Winners",
    description:
      "Three straight wins after dropping game one of the Grand Finals. The first major trophy — and an invite to the November Invitational Circuit.",
  },
];

export const recruitment = {
  requirements: [
    { title: "Mythic+ Rank", detail: "Current or peak Mythic. Honor/Glory preferred." },
    { title: "Age 16+", detail: "Mature attitude in and out of the game." },
    { title: "Mic + Discord", detail: "Voice comms are mandatory during scrims." },
    {
      title: "Scrim Availability",
      detail: "Weeknights 7–10 PM and weekend blocks. Consistency matters.",
    },
    {
      title: "Deep Hero Pool",
      detail: "At least 3 tournament-viable heroes for your role.",
    },
    {
      title: "Team-First Mentality",
      detail: "Draft discipline, no flame, willingness to review VODs.",
    },
  ],
  openRoles: ["EXP", "Roam"] as Role[],
  applyInfo: [
    "In-game name (IGN) and role",
    "Current rank + screenshot",
    "Top 3 heroes with win rates",
    "Availability schedule",
    "A clip or two of your best plays (optional but helps)",
  ],
} as const;

export const faqs = [
  {
    q: "When are tryouts held?",
    a: "Rolling tryouts every Friday and Saturday night after scrims — around 10 PM. We'll invite you to a private lobby lobby block once your application is reviewed.",
  },
  {
    q: "Do you only accept Mythic players?",
    a: "The baseline is current or peak Mythic because our scrim block runs at that level. Exceptional mechanics with lower rank still get considered if you can hang in draft reviews.",
  },
  {
    q: "Is this a paid team?",
    a: "Not yet. Tournament prize pools are split, and gear/skins come from squad funds when we place. We're building toward an org-backed roster.",
  },
  {
    q: "What happens after I apply?",
    a: "A captain reviews your profile within 48 hours, then you get a Discord DM with your tryout slot. Show up on time with your hero pool ready.",
  },
  {
    q: "Can I be a sub instead of a starter?",
    a: "Yes — subs get equal scrim time during rotation weeks and are first in line when starter slots open.",
  },
] as const;

export interface SquadStats {
  totalMatches: number;
  wins: number;
  losses: number;
  winRate: number;
  tournamentsWon: number;
  activeMembers: number;
}

export const getSquadStats = (): SquadStats => {
  const wins = matches.filter((m) => m.result === "win").length;
  const losses = matches.length - wins;
  return {
    totalMatches: matches.length,
    wins,
    losses,
    winRate: Math.round((wins / Math.max(matches.length, 1)) * 1000) / 10,
    tournamentsWon: achievements.filter((a) => a.placement === "1st").length,
    activeMembers: players.length,
  };
};

export const getLatestMatches = (count: number): Match[] =>
  [...matches].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);

export const getPlayerById = (id: string): Player | undefined =>
  players.find((p) => p.id === id);

export const getFeaturedPlayers = (count: number): Player[] => {
  const sorted = [...players].sort(
    (a, b) => Number(b.captain ?? false) - Number(a.captain ?? false) || b.winRate - a.winRate,
  );
  return sorted.slice(0, count);
};

export const getMatchById = (id: string): Match | undefined =>
  matches.find((m) => m.id === id);

export const getPostBySlug = (slug: string): NewsPost | undefined =>
  newsPosts.find((p) => p.slug === slug);

export const getSortedNews = (): NewsPost[] =>
  [...newsPosts].sort((a, b) => b.date.localeCompare(a.date));

const eventDateTime = (e: ScheduleEvent): number =>
  new Date(`${e.date}T${e.time}:00`).getTime();

export const getUpcomingEvents = (): ScheduleEvent[] => {
  const now = Date.now();
  return scheduleEvents
    .filter((e) => eventDateTime(e) >= now)
    .sort((a, b) => eventDateTime(a) - eventDateTime(b));
};

export const getPastEvents = (): ScheduleEvent[] => {
  const now = Date.now();
  return scheduleEvents
    .filter((e) => eventDateTime(e) < now)
    .sort((a, b) => eventDateTime(b) - eventDateTime(a));
};

export const getNextEvent = (): ScheduleEvent | undefined =>
  getUpcomingEvents()[0];

export const getMvpCounts = (): Map<string, number> => {
  const counts = new Map<string, number>();
  for (const match of matches) {
    if (!match.mvp) continue;
    counts.set(match.mvp, (counts.get(match.mvp) ?? 0) + 1);
    for (const game of match.games ?? []) {
      if (game.mvp && game.mvp !== match.mvp) {
        counts.set(game.mvp, (counts.get(game.mvp) ?? 0) + 1);
      }
    }
  }
  return counts;
};

export const getPlayerMatches = (playerId: string): Match[] =>
  matches
    .filter((m) => m.mvp === playerId || m.games?.some((g) => g.mvp === playerId))
    .sort((a, b) => b.date.localeCompare(a.date));

export const getLeaderboard = (): { player: Player; mvps: number }[] => {
  const mvpCounts = getMvpCounts();
  return players
    .map((player) => ({ player, mvps: mvpCounts.get(player.id) ?? 0 }))
    .sort((a, b) => b.player.winRate - a.player.winRate);
};
