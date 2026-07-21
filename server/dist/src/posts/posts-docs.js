export const postDocs = {
    "/posts": {
        post: {
            tags: ["Posts"],
            summary: "Create a new post",
            security: [{ cookieAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                content: { type: "string" },
                                excerpt: { type: "string" },
                                coverImage: { type: "string" },
                                coverImageCredit: { type: "string" },
                                category: { type: "string", description: "Category ID" },
                                tags: { type: "array", items: { type: "string" } },
                                status: { type: "string", enum: ["published", "draft"] },
                                featured: { type: "boolean" },
                            },
                            required: ["title", "content", "category"],
                        },
                    },
                },
            },
            responses: {
                201: { description: "Post created successfully" },
                401: { description: "Unauthorized" },
            },
        },
        get: {
            tags: ["Posts"],
            summary: "Get all published posts",
            parameters: [
                {
                    name: "page",
                    in: "query",
                    schema: { type: "integer", default: 1 },
                    description: "Page number",
                },
                {
                    name: "limit",
                    in: "query",
                    schema: { type: "integer", default: 10 },
                    description: "Number of posts per page",
                },
            ],
            responses: {
                200: { description: "Posts fetched successfully" },
            },
        },
    },
    "/posts/admin/all": {
        get: {
            tags: ["Posts"],
            summary: "Get all posts (for admins)",
            security: [{ cookieAuth: [] }],
            responses: {
                200: { description: "All posts fetched successfully" },
            },
        },
    },
    "/posts/{slug}": {
        get: {
            tags: ["Posts"],
            summary: "Get a single post by slug",
            parameters: [
                {
                    name: "slug",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            responses: {
                200: { description: "Post fetched successfully" },
                404: { description: "Post not found" },
            },
        },
    },
    "/posts/{postId}": {
        patch: {
            tags: ["Posts"],
            summary: "Update a post",
            security: [{ cookieAuth: [] }],
            parameters: [
                {
                    name: "postId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                content: { type: "string" },
                                category: { type: "string" },
                                status: { type: "string", enum: ["published", "draft"] },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Post updated successfully" },
                401: { description: "Unauthorized" },
                404: { description: "Post not found" },
            },
        },
        delete: {
            tags: ["Posts"],
            summary: "Delete a post",
            description: "Admin only",
            security: [{ cookieAuth: [] }],
            parameters: [
                {
                    name: "postId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            responses: {
                200: { description: "Post deleted successfully" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden" },
            },
        },
    },
    "/posts/{postId}/view-count": {
        patch: {
            tags: ["Posts"],
            summary: "Update post view count",
            parameters: [
                {
                    name: "postId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            responses: {
                200: { description: "Post view count updated successfully" },
            },
        },
    },
    "/posts/comments/all": {
        get: {
            tags: ["Posts"],
            summary: "Get all comments",
            description: "Admin only",
            security: [{ cookieAuth: [] }],
            parameters: [
                {
                    name: "page",
                    in: "query",
                    schema: { type: "integer", default: 1 },
                    description: "Page number",
                },
                {
                    name: "limit",
                    in: "query",
                    schema: { type: "integer", default: 10 },
                    description: "Number of comments per page",
                },
            ],
            responses: {
                200: { description: "All comments fetched successfully" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden" },
            },
        },
    },
    "/posts/{postId}/comments": {
        get: {
            tags: ["Posts"],
            summary: "Get all comments for a post",
            parameters: [
                {
                    name: "postId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the post to fetch comments for",
                },
                {
                    name: "page",
                    in: "query",
                    schema: { type: "integer", default: 1 },
                    description: "Page number for pagination",
                },
                {
                    name: "limit",
                    in: "query",
                    schema: { type: "integer", default: 10 },
                    description: "Number of comments per page",
                },
            ],
            responses: {
                200: {
                    description: "Comments fetched successfully",
                },
            },
        },
        post: {
            tags: ["Posts"],
            summary: "Add a comment to a post",
            security: [{ cookieAuth: [] }],
            parameters: [
                {
                    name: "postId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                content: { type: "string" },
                                parentId: {
                                    type: "string",
                                    description: "ID of the parent comment for a reply",
                                },
                            },
                            required: ["content"],
                        },
                    },
                },
            },
            responses: {
                201: { description: "Comment added successfully" },
                401: { description: "Unauthorized" },
            },
        },
    },
    "/posts/comments/{commentId}": {
        patch: {
            tags: ["Posts"],
            summary: "Update a comment",
            security: [{ cookieAuth: [] }],
            parameters: [
                {
                    name: "commentId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                content: { type: "string" },
                            },
                            required: ["content"],
                        },
                    },
                },
            },
            responses: {
                200: { description: "Comment updated successfully" },
                401: { description: "Unauthorized" },
                404: { description: "Comment not found" },
            },
        },
        delete: {
            tags: ["Posts"],
            summary: "Delete a comment",
            security: [{ cookieAuth: [] }],
            parameters: [
                {
                    name: "commentId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            responses: {
                200: { description: "Comment deleted successfully" },
                401: { description: "Unauthorized" },
            },
        },
    },
    "/posts/{postId}/reactions": {
        get: {
            tags: ["Posts"],
            summary: "Get all reactions for a post",
            parameters: [
                {
                    name: "postId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            responses: {
                200: { description: "Reactions fetched successfully" },
            },
        },
        post: {
            tags: ["Posts"],
            summary: "Add, update, or remove a reaction on a post",
            security: [{ cookieAuth: [] }],
            parameters: [
                {
                    name: "postId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                type: {
                                    type: "string",
                                    enum: ["like", "love", "clap", "fire", "wow"],
                                },
                            },
                            required: ["type"],
                        },
                    },
                },
            },
            responses: {
                200: { description: "Reaction added/updated/removed successfully" },
                401: { description: "Unauthorized" },
            },
        },
    },
};
