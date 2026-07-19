import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFoundBlog() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold mb-2">
          Article not found
        </h2>
        <Button
          onClick={() => navigate("/blogs")}
          data-testid="button-back-to-blog"
        >
          Back to Blog
        </Button>
      </div>
    </div>
  );
}
