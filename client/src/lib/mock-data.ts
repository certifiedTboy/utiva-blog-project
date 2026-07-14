export const CATEGORIES = [
  { id: 1, name: "Technology", postCount: 2 },
  { id: 2, name: "Design", postCount: 1 },
  { id: 3, name: "Culture", postCount: 1 },
  { id: 4, name: "Business", postCount: 1 },
  { id: 5, name: "Science", postCount: 1 },
];

export const TAGS = [
  { id: 1, name: "webdev", postCount: 2 },
  { id: 2, name: "javascript", postCount: 2 },
  { id: 3, name: "ai", postCount: 3 },
  { id: 4, name: "design", postCount: 2 },
  { id: 5, name: "trends", postCount: 1 },
  { id: 6, name: "ux", postCount: 1 },
  { id: 7, name: "startup", postCount: 1 },
  { id: 8, name: "climate", postCount: 1 },
];

export const POSTS = [
  {
    id: 1,
    title: "The Future of Web Development: What to Expect in 2026",
    slug: "future-of-web-development-2026",
    excerpt:
      "Explore the cutting-edge trends shaping modern web development, from AI-assisted coding to edge computing and beyond.",
    content: `Web development is evolving at an unprecedented pace. As we move through 2026, several transformative technologies are redefining how we build, deploy, and experience digital products.

## AI-Assisted Development

The integration of AI into development workflows has moved beyond simple autocomplete. Tools now understand context, architecture patterns, and business requirements. Developers who embrace these tools are 5–10x more productive.

## Edge Computing Goes Mainstream

Latency is no longer a compromise. With edge runtimes deployed at hundreds of points-of-presence globally, server-side rendering now happens within milliseconds of every user — anywhere in the world.

## The Component Economy

Design systems and component libraries have matured into a full economy. Teams license, fork, and compose components rather than building from scratch. This shifts competitive advantage from implementation to product thinking.

## What This Means for You

The developers who thrive in 2026 are those who can think architecturally, collaborate with AI effectively, and focus on the parts that only humans can do — judgment, taste, and empathy for users.`,
    coverImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    authorName: "Alex Rivera",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    categoryName: "Technology",
    categoryId: 1,
    tags: ["webdev", "javascript", "ai", "trends"],
    viewCount: 1850,
    commentCount: 3,
    reactionCount: 45,
    readingTime: 8,
    status: "published",
    featured: true,
    createdAt: "2026-07-04T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Designing for Accessibility: A Practical Guide",
    slug: "designing-for-accessibility",
    excerpt:
      "Accessibility isn't a checklist — it's a mindset that makes products better for everyone. Here's how to embed it into your design process.",
    content: `Accessible design is good design. When you build for the margins — people with visual impairments, motor challenges, or cognitive differences — you end up with products that are clearer, more usable, and more robust for everyone.

## Start with Semantic HTML

The foundation of accessibility is structure. A screen reader navigates your page the same way a sighted user scans it — through headings, landmarks, and interactive elements. Use them correctly.

## Color Contrast Is Non-Negotiable

WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text. Tools like Stark and Colour Contrast Analyser make this easy to check. Don't rely on color alone to convey meaning.

## Keyboard Navigation

Every interactive element should be reachable and operable with a keyboard. Tab order should follow visual order. Focus states should be clearly visible — not hidden with \`outline: none\`.

## Test with Real People

Automated tools catch ~30% of accessibility issues. The rest require human testing, ideally with people who use assistive technologies daily.`,
    coverImage:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80",
    authorName: "Maya Patel",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
    categoryName: "Design",
    categoryId: 2,
    tags: ["design", "ux", "accessibility"],
    viewCount: 1240,
    commentCount: 2,
    reactionCount: 31,
    readingTime: 6,
    status: "published",
    featured: true,
    createdAt: "2026-07-01T00:00:00.000Z",
  },
  {
    id: 3,
    title: "The Slow Reading Movement: Reclaiming Deep Attention",
    slug: "slow-reading-movement",
    excerpt:
      "In an age of infinite scroll and 15-second videos, a growing movement is pushing back — and rediscovering the pleasure of reading slowly.",
    content: `We consume more words than ever. Articles, tweets, newsletters, captions — the average person encounters over 100,000 words a day. And yet, most of those words pass through us without leaving a mark.

## What Slow Reading Is

Slow reading isn't about reading slower in the literal sense. It's about reading with intention. Turning off notifications. Giving a text your full attention. Taking notes. Pausing to think.

## The Science Behind It

Research in cognitive psychology consistently shows that skimming and scanning reduce retention and comprehension. When we read slowly, we activate more neural pathways, form stronger memories, and make more creative associations.

## How to Practice It

Start small. Pick one article per day and read it properly — no tabs, no phone. Annotate as you go. When you finish, write two sentences summarizing what you learned. That act of synthesis transforms reading into understanding.

## The Paradox

The more you read slowly, the more you can read overall — because what you read actually sticks.`,
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
    authorName: "Jordan Kim",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    categoryName: "Culture",
    categoryId: 3,
    tags: ["reading", "mindfulness", "focus"],
    viewCount: 980,
    commentCount: 4,
    reactionCount: 28,
    readingTime: 5,
    status: "published",
    featured: true,
    createdAt: "2026-06-28T00:00:00.000Z",
  },
  {
    id: 4,
    title: "Building a Profitable Micro-SaaS in 90 Days",
    slug: "micro-saas-90-days",
    excerpt:
      "From idea to first paying customer in three months — a brutally honest account of what worked, what didn't, and what I'd do differently.",
    content: `Three months ago I had an idea and a weekend. Today I have 47 paying customers and $2,800 in monthly recurring revenue. Here's exactly how I got there.

## The Idea

I was frustrated by my own problem — tracking client feedback across tools was chaos. Emails, Slack threads, Notion pages. I built a simple aggregator that pulled everything into one view. Classic "scratch your own itch."

## Month 1: Build the Core

I resisted the urge to build features. The MVP had exactly three things: connect your tools, see all feedback in one place, flag things for follow-up. That's it. Two weeks of nights and weekends.

## Month 2: Find 10 Customers

I didn't launch on Product Hunt. I posted in three Slack communities where my target customer spent time. I offered free setup calls. I charged $29/month from day one — free tiers teach people your product has no value.

## Month 3: Stop Building, Start Listening

The biggest lesson: your first customers will tell you exactly what to build next. I closed my code editor for three weeks and just talked to people. Every conversation revealed something I'd missed.`,
    coverImage:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
    authorName: "Sam Chen",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
    categoryName: "Business",
    categoryId: 4,
    tags: ["startup", "saas", "entrepreneurship"],
    viewCount: 2100,
    commentCount: 5,
    reactionCount: 67,
    readingTime: 7,
    status: "published",
    featured: false,
    createdAt: "2026-06-22T00:00:00.000Z",
  },
  {
    id: 5,
    title: "The Science of Climate Tipping Points",
    slug: "climate-tipping-points",
    excerpt:
      "Some changes in Earth's climate system are gradual. Others are sudden and irreversible. Understanding tipping points is the most important climate story you're not hearing.",
    content: `Climate change is often framed as a linear problem — more emissions, more warming, more damage. But the physical science tells a more complicated and more alarming story: tipping points.

## What Is a Tipping Point?

A tipping point is a threshold in the climate system where a small change triggers a self-reinforcing process that can't be easily reversed. Think of it like a ball balanced on a hill — push it far enough, and it rolls down on its own.

## Examples We're Watching

The West Antarctic Ice Sheet contains enough water to raise sea levels by 3.3 meters. Models suggest it may already be past the point of no return. The Amazon rainforest, which produces its own rainfall, is approaching a threshold where deforestation triggers a conversion to savanna — releasing decades of stored carbon.

## Why This Changes the Math

Tipping points turn a linear problem into an exponential one. They compress timelines. They interact with each other — the loss of Arctic sea ice accelerates permafrost thaw, which releases methane, which accelerates warming.

## What Scientists Say

The 2023 Global Tipping Points Report identified nine major systems at risk. Crossing multiple tipping points in close succession could trigger a cascade that takes the planet to a permanently different state.`,
    coverImage:
      "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1200&q=80",
    authorName: "Dr. Priya Nair",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    categoryName: "Science",
    categoryId: 5,
    tags: ["climate", "science", "environment"],
    viewCount: 1430,
    commentCount: 6,
    reactionCount: 52,
    readingTime: 9,
    status: "published",
    featured: false,
    createdAt: "2026-06-18T00:00:00.000Z",
  },
];

export const COMMENTS: Record<
  number,
  Array<{
    id: number;
    postId: number;
    content: string;
    authorName: string;
    authorAvatar?: string;
    createdAt: string;
    parentId?: number;
    replies: Array<{
      id: number;
      postId: number;
      content: string;
      authorName: string;
      authorAvatar?: string;
      createdAt: string;
      parentId: number;
      replies: [];
    }>;
  }>
> = {
  1: [
    {
      id: 1,
      postId: 1,
      content:
        "Really insightful — the section on edge computing resonated with me. We've been migrating our infra and the latency improvements are staggering.",
      authorName: "Tobias W.",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tobias",
      createdAt: "2026-07-05T10:30:00.000Z",
      replies: [
        {
          id: 4,
          postId: 1,
          content: "Which provider are you using? Cloudflare Workers?",
          authorName: "Alex Rivera",
          authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
          createdAt: "2026-07-05T11:00:00.000Z",
          parentId: 1,
          replies: [],
        },
      ],
    },
    {
      id: 2,
      postId: 1,
      content:
        "The component economy point is so true. We practically haven't written a UI component from scratch in six months.",
      authorName: "Lena M.",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lena",
      createdAt: "2026-07-05T14:00:00.000Z",
      replies: [],
    },
    {
      id: 3,
      postId: 1,
      content:
        "Great read. I'd add that security at the edge is still a mostly unsolved problem — worth a follow-up post.",
      authorName: "Riku S.",
      createdAt: "2026-07-06T09:00:00.000Z",
      replies: [],
    },
  ],
  2: [
    {
      id: 5,
      postId: 2,
      content:
        "The part about testing with real people is so underrated. Automated checks give you a false sense of security.",
      authorName: "Dana L.",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dana",
      createdAt: "2026-07-02T08:20:00.000Z",
      replies: [],
    },
    {
      id: 6,
      postId: 2,
      content:
        "I'd add: don't forget ARIA labels on icon-only buttons. We had an audit fail on that exact issue last quarter.",
      authorName: "Eli B.",
      createdAt: "2026-07-02T12:45:00.000Z",
      replies: [],
    },
  ],
  3: [
    {
      id: 7,
      postId: 3,
      content:
        "Started doing this a month ago — one article, no distractions, notes afterward. The difference in how much I retain is wild.",
      authorName: "Anya T.",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anya",
      createdAt: "2026-06-29T16:10:00.000Z",
      replies: [],
    },
    {
      id: 8,
      postId: 3,
      content:
        "Cal Newport has written a lot about this too — Deep Work is basically the book version of this idea.",
      authorName: "Oscar F.",
      createdAt: "2026-06-30T10:00:00.000Z",
      replies: [],
    },
    {
      id: 9,
      postId: 3,
      content:
        "The paradox at the end is beautifully put. Going to share this with my team.",
      authorName: "Mira V.",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mira",
      createdAt: "2026-07-01T07:30:00.000Z",
      replies: [],
    },
    {
      id: 10,
      postId: 3,
      content:
        "I used to be a skimmer. This article made me sit with it for twenty minutes. I think I get it now.",
      authorName: "Hana K.",
      createdAt: "2026-07-01T20:15:00.000Z",
      replies: [],
    },
  ],
  4: [
    {
      id: 11,
      postId: 4,
      content:
        "The pricing point hit hard. I gave away a free tier for 3 months before realizing none of those users ever converted.",
      authorName: "Felix R.",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=felix",
      createdAt: "2026-06-23T09:00:00.000Z",
      replies: [],
    },
    {
      id: 12,
      postId: 4,
      content:
        "What tools are you using for support and billing? Curious about the stack.",
      authorName: "Nina O.",
      createdAt: "2026-06-23T11:30:00.000Z",
      replies: [],
    },
    {
      id: 13,
      postId: 4,
      content:
        "The 'stop building, start listening' month is where most solo founders fail. They keep shipping instead of talking.",
      authorName: "James W.",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      createdAt: "2026-06-24T15:00:00.000Z",
      replies: [],
    },
    {
      id: 14,
      postId: 4,
      content:
        "Sharing this with my co-founder immediately. We've been in 'build mode' for too long.",
      authorName: "Camille D.",
      createdAt: "2026-06-25T08:45:00.000Z",
      replies: [],
    },
    {
      id: 15,
      postId: 4,
      content: "What was your biggest unexpected cost?",
      authorName: "Tom H.",
      createdAt: "2026-06-26T12:00:00.000Z",
      replies: [],
    },
  ],
  5: [
    {
      id: 16,
      postId: 5,
      content:
        "This is the climate story that keeps me up at night. The interconnected tipping points are the part mainstream coverage almost never explains.",
      authorName: "Sana A.",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sana",
      createdAt: "2026-06-19T10:00:00.000Z",
      replies: [],
    },
    {
      id: 17,
      postId: 5,
      content:
        "I teach environmental science. Sharing this with my students — it explains tipping points better than most textbook chapters.",
      authorName: "Prof. J. Liu",
      createdAt: "2026-06-19T14:30:00.000Z",
      replies: [],
    },
    {
      id: 18,
      postId: 5,
      content:
        "The Amazon section is haunting. We're watching it in slow motion and the political will to act isn't there.",
      authorName: "Benny R.",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=benny",
      createdAt: "2026-06-20T09:15:00.000Z",
      replies: [],
    },
    {
      id: 19,
      postId: 5,
      content:
        "Do you have a link to the 2023 Global Tipping Points Report? I'd like to read the full thing.",
      authorName: "Clara E.",
      createdAt: "2026-06-21T16:45:00.000Z",
      replies: [],
    },
    {
      id: 20,
      postId: 5,
      content:
        "Thank you for writing this clearly and without the usual doom-fatigue framing.",
      authorName: "Yuki M.",
      createdAt: "2026-06-22T11:00:00.000Z",
      replies: [],
    },
    {
      id: 21,
      postId: 5,
      content:
        "A cascade of tipping points is exactly the scenario the IPCC worst-case models describe. Sobering article.",
      authorName: "Dr. A. Santos",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=santos",
      createdAt: "2026-06-23T08:30:00.000Z",
      replies: [],
    },
  ],
};

export const REACTIONS_DATA: Record<
  number,
  { counts: Record<string, number>; userReaction: string | null }
> = {
  1: {
    counts: { like: 18, love: 12, clap: 9, fire: 5, wow: 1 },
    userReaction: null,
  },
  2: {
    counts: { like: 10, love: 8, clap: 7, fire: 4, wow: 2 },
    userReaction: null,
  },
  3: {
    counts: { like: 11, love: 9, clap: 4, fire: 3, wow: 1 },
    userReaction: null,
  },
  4: {
    counts: { like: 22, love: 15, clap: 18, fire: 10, wow: 2 },
    userReaction: null,
  },
  5: {
    counts: { like: 20, love: 16, clap: 8, fire: 6, wow: 2 },
    userReaction: null,
  },
};

export const MOCK_USER = {
  id: "user_demo",
  firstName: "Demo",
  lastName: "User",
  fullName: "Demo User",
  imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
  email: "demo@inkwell.app",
  role: "admin" as const,
};

export const ADMIN_STATS = {
  totalPosts: 5,
  publishedPosts: 5,
  draftPosts: 0,
  totalUsers: 8,
  totalViews: 7610,
  totalComments: 20,
  totalReactions: 223,
  topPosts: POSTS.sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      title: p.title,
      viewCount: p.viewCount,
      reactionCount: p.reactionCount,
    })),
  recentActivity: [
    {
      description:
        "Dr. Priya Nair published 'The Science of Climate Tipping Points'",
      createdAt: "2026-06-18T10:00:00.000Z",
    },
    {
      description:
        "Sam Chen published 'Building a Profitable Micro-SaaS in 90 Days'",
      createdAt: "2026-06-22T14:00:00.000Z",
    },
    {
      description: "New comment on 'The Future of Web Development'",
      createdAt: "2026-07-06T09:00:00.000Z",
    },
    {
      description: "Alex Rivera published 'The Future of Web Development'",
      createdAt: "2026-07-04T00:00:00.000Z",
    },
  ],
};

export const ADMIN_USERS = [
  {
    id: "u1",
    name: "Alex Rivera",
    email: "alex@inkwell.app",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    postCount: 1,
    role: "author",
  },
  {
    id: "u2",
    name: "Maya Patel",
    email: "maya@inkwell.app",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
    postCount: 1,
    role: "author",
  },
  {
    id: "u3",
    name: "Jordan Kim",
    email: "jordan@inkwell.app",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    postCount: 1,
    role: "author",
  },
  {
    id: "u4",
    name: "Sam Chen",
    email: "sam@inkwell.app",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
    postCount: 1,
    role: "author",
  },
  {
    id: "u5",
    name: "Dr. Priya Nair",
    email: "priya@inkwell.app",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    postCount: 1,
    role: "author",
  },
  {
    id: "u6",
    name: "Demo User",
    email: "demo@inkwell.app",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
    postCount: 0,
    role: "admin",
  },
];

export const ADMIN_COMMENTS = Object.values(COMMENTS)
  .flat()
  .map((c) => ({
    ...c,
    postTitle: POSTS.find((p) => p.id === c.postId)?.title ?? "Unknown Post",
  }));

export const REACTIONS = [
  { type: "like", emoji: "👍", label: "Like" },
  { type: "love", emoji: "❤️", label: "Love" },
  { type: "clap", emoji: "👏", label: "Clap" },
  { type: "fire", emoji: "🔥", label: "Fire" },
  { type: "wow", emoji: "😮", label: "Wow" },
];

export const supportedLanguages = [
  { label: "JavaScript", value: "javascript", aliases: ["js"] },
  { label: "TypeScript", value: "typescript", aliases: ["ts"] },
  { label: "JSX", value: "jsx", aliases: [] },
  { label: "TSX", value: "tsx", aliases: [] },
  { label: "HTML", value: "html", aliases: ["markup"] },
  { label: "CSS", value: "css", aliases: [] },
  { label: "JSON", value: "json", aliases: [] },
  { label: "Python", value: "python", aliases: ["py"] },
  { label: "Java", value: "java", aliases: [] },
  { label: "C", value: "c", aliases: [] },
  { label: "C++", value: "cpp", aliases: ["c++"] },
  { label: "C#", value: "csharp", aliases: ["cs", "c#"] },
  { label: "PHP", value: "php", aliases: [] },
  { label: "Ruby", value: "ruby", aliases: ["rb"] },
  { label: "Go", value: "go", aliases: ["golang"] },
  { label: "Rust", value: "rust", aliases: ["rs"] },
  { label: "SQL", value: "sql", aliases: [] },
  { label: "Bash", value: "bash", aliases: ["sh", "shell"] },
  { label: "PowerShell", value: "powershell", aliases: ["ps1"] },
  { label: "YAML", value: "yaml", aliases: ["yml"] },
  { label: "Markdown", value: "markdown", aliases: ["md"] },
  { label: "React", value: "jsx", aliases: ["react"] },
];

export const languageAliases: Record<string, string> = {
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
  html: "markup",
  xml: "markup",
  shell: "bash",
  sh: "bash",
  py: "python",
  rb: "ruby",
  cs: "csharp",
  "c#": "csharp",
  cpp: "cpp",
  "c++": "cpp",
};
