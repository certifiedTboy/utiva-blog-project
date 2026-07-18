import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { usePosts } from "@/features/context/post-context";
import { Search, Filter } from "lucide-react";
import { TAGS } from "@/lib/mock-data";
import PostCard from "@/pages/blogs/post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageMetadata } from "@/components/common/page-metadata";
import BookOpenIcon from "./book-open-icon";

const PAGE_SIZE = 9;

export default function BlogPage() {
  const { posts: allPosts, categories: CATEGORIES } = usePosts();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return (
      allPosts &&
      allPosts?.length > 0 &&
      allPosts.filter((p) => {
        const matchSearch =
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.excerpt?.toLowerCase().includes(search.toLowerCase());

        const matchCat =
          //@ts-ignore
          !selectedCategory || p.categoryName === selectedCategory;
        const matchTag = !selectedTag || p.tags.includes(selectedTag);
        return matchSearch && matchCat && matchTag;
      })
    );
  }, [allPosts, search, selectedCategory, selectedTag]);

  const totalPages =
    filtered && filtered?.length > 0 && Math.ceil(filtered?.length / PAGE_SIZE);
  const posts =
    filtered &&
    filtered?.length > 0 &&
    filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <PageMetadata
        title="The Blog"
        description="Discover articles on web development, design, and more."
      />
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-serif text-4xl font-semibold text-foreground mb-2">
            The Blog
          </h1>
          <p className="text-muted-foreground">
            {filtered && filtered?.length > 0 && filtered.length > 0
              ? `${filtered.length} articles and counting`
              : "Discover great writing"}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative mb-8"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 bg-card border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                data-testid="input-search"
              />
            </form>

            {(selectedCategory || selectedTag || search) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filters:
                </span>
                {selectedCategory && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() => setSelectedCategory("")}
                  >
                    {selectedCategory} ×
                  </Badge>
                )}
                {selectedTag && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() => setSelectedTag("")}
                  >
                    #{selectedTag} ×
                  </Badge>
                )}
                {search && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() => setSearch("")}
                  >
                    "{search}" ×
                  </Badge>
                )}
                <button
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedTag("");
                    setSearch("");
                    setPage(1);
                  }}
                >
                  Clear all
                </button>
              </div>
            )}

            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <PostCard key={i} post={post} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <BookOpenIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No articles found</p>
                <p className="text-sm mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            {totalPages && totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  data-testid="button-prev-page"
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm text-muted-foreground self-center">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  data-testid="button-next-page"
                >
                  Next
                </Button>
              </div>
            )}
          </div>

          <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-card-border rounded-xl p-5"
            >
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}
                  onClick={() => {
                    setSelectedCategory("");
                    setPage(1);
                  }}
                  data-testid="button-category-all"
                >
                  All Topics
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between ${selectedCategory === cat.name ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setPage(1);
                    }}
                    data-testid={`button-category-${cat.id}`}
                  >
                    <span>{cat.name}</span>
                    <span className="opacity-60 text-xs">{cat.postCount}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-card-border rounded-xl p-5"
            >
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTag === tag.name ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => {
                      setSelectedTag(selectedTag === tag.name ? "" : tag.name);
                      setPage(1);
                    }}
                    data-testid={`badge-tag-${tag.id}`}
                  >
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
