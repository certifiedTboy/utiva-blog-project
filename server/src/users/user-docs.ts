export const userDocs = {
  "/users": {
    post: {
      tags: ["Users"],
      summary: "Create a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                confirmPassword: { type: "string" },
              },
              required: [
                "firstName",
                "lastName",
                "email",
                "password",
                "confirmPassword",
              ],
            },
          },
        },
      },

      responses: {
        201: { description: "User created successfully" },
      },
    },
    get: {
      tags: ["Users"],
      summary: "Get all users (admin only)",
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
          description: "Number of users per page",
        },
      ],
      responses: {
        200: { description: "Users fetched successfully" },
        401: { description: "Unauthorized" },
        403: { description: "Forbidden" },
      },
    },
  },

  "/users/verify": {
    post: {
      tags: ["Users"],
      summary: "Verify user account",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                otp: { type: "string" },
              },
              required: ["otp"],
            },
          },
        },
      },

      responses: {
        201: { description: "Account verified successfully" },
      },
    },
  },

  "/users/profile": {
    get: {
      tags: ["Users"],
      summary: "Get current user profile data",

      responses: {
        200: { description: "User verified successfully" },
      },
    },
  },
};
