import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Send, X, Plus, Image } from "lucide-react";
import { CATEGORIES, POSTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1, "Content is required"),
  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  categoryId: z.string().optional(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function WritePage() {
  const [, params] = useRoute("/write/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const editId = params?.id ? parseInt(params.id) : null;
  const existingPost = editId ? POSTS.find((p) => p.id === editId) : null;

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: existingPost
      ? {
          title: existingPost.title,
          excerpt: existingPost.excerpt ?? "",
          content: existingPost.content,
          coverImage: existingPost.coverImage ?? "",
          categoryId: existingPost.categoryId?.toString() ?? "",
          status: existingPost.status as "draft" | "published",
          featured: existingPost.featured,
        }
      : {
          title: "",
          excerpt: "",
          content: "",
          coverImage: "",
          status: "draft",
          featured: false,
        },
  });

  function addTag() {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function onSubmit(data: PostFormData, asDraft = false) {
    const status = asDraft ? "draft" : data.status;
    toast({
      title:
        status === "published"
          ? editId
            ? "Post updated!"
            : "Post published!"
          : "Draft saved!",
    });
    navigate("/dashboard");
  }

  const coverImagePreview = form.watch("coverImage");

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            {editId ? "Edit Post" : "Write a New Post"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Share your ideas with the world
          </p>
        </motion.div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="A compelling title..."
                      className="text-lg font-serif font-semibold h-12"
                      data-testid="input-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Excerpt{" "}
                    <span className="text-muted-foreground text-xs">
                      (optional summary)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="A short summary that appears in previews..."
                      className="resize-none"
                      rows={2}
                      data-testid="input-excerpt"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Cover Image URL{" "}
                    <span className="text-muted-foreground text-xs">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="relative">
                        <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder="https://..."
                          className="pl-10"
                          data-testid="input-cover-image"
                        />
                      </div>
                      {coverImagePreview && (
                        <div className="rounded-xl overflow-hidden border border-border aspect-video">
                          <img
                            src={coverImagePreview}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add a tag and press Enter..."
                  className="flex-1"
                  data-testid="input-tag"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTag}
                  data-testid="button-add-tag"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        data-testid={`button-remove-tag-${tag}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 p-4 bg-card border border-card-border rounded-xl">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      data-testid="switch-featured"
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="cursor-pointer">
                      Featured Post
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Show on the homepage featured section
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Content *{" "}
                    <span className="text-muted-foreground text-xs">
                      (supports Markdown: ## Heading, **bold**)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Start writing your post..."
                      className="min-h-[400px] font-mono text-sm resize-none"
                      data-testid="input-content"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Button
                type="submit"
                className="gap-2 cursor-pointer"
                data-testid="button-publish"
              >
                <Send className="w-4 h-4" />{" "}
                {editId ? "Update Post" : "Publish"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onSubmit(form.getValues(), true)}
                className="gap-2 cursor-pointer"
                data-testid="button-save-draft"
              >
                <Save className="w-4 h-4" /> Save as Draft
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                data-testid="button-cancel"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
