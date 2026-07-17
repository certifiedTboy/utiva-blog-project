import swaggerJsDoc from "swagger-jsdoc";
import { userDocs } from "../users/user-docs.js";
import { authDocs } from "../auth/auth-docs.js";
import { postDocs } from "../posts/posts-docs.js";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ade's note API server documentation",
            version: "1.0.0",
            description: "Ade's note API server documentation",
        },
        paths: {
            ...userDocs,
            ...authDocs,
            ...postDocs,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "authToken",
                },
            },
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            },
        ],
    },
    apis: [],
};
export const swaggerSpec = swaggerJsDoc(options);
