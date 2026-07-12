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
};

export const REACTIONS_DATA: Record<
  number,
  { counts: Record<string, number>; userReaction: string | null }
> = {
  1: {
    counts: { like: 18, love: 12, clap: 9, fire: 5, wow: 1 },
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
