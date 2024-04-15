import { isLogin } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (!isLogin(req)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  try {
    return NextResponse.json(
      {
        message: "Hello World",
        description: "Welcome to the api route, here are the available routes",
        data: {
          User: [
            {
              route: "user",
              method: "GET",
              description: "Returns a list of users",
            },
            {
              route: "user/one?id=$id",
              method: "GET",
              description: "Returns a single user",
            },
            {
              route: "user",
              method: "POST",
              description: "Creates a new user",
              body: {
                name: "string",
                username: "string",
                password: "string",
                role: "string",
              },
            },
            {
              route: "user?id=$id",
              method: "DELETE",
              description: "Deletes a user",
            },
          ],
          Book: [
            {
              route: "book",
              method: "GET",
              description: "Returns a list of books",
            },
            {
              route: "book/one?id=$id",
              method: "GET",
              description: "Returns a single book",
            },
            {
              route: "book",
              method: "POST",
              description: "Creates a new book",
              body: {
                title: "string",
                author: "string",
                published: "date",
                description: "string",
                pdf: "string",
                cover: "string",
              },
            },
            {
              route: "book?id=$id",
              method: "PUT",
              description: "Updates a book",
              body: {
                title: "string",
                author: "string",
                published: "date",
                description: "string",
                pdf: "string",
                cover: "string",
              },
            },
            {
              route: "book?id=$id",
              method: "DELETE",
              description: "Deletes a book",
            },
          ],
          Favorite: [
            {
              route: "favorite",
              method: "GET",
              description: "Returns a list of favorites",
              params: {
                userId: "number",
              },
            },
            {
              route: "favorite",
              method: "POST",
              description: "Creates a new favorite",
              body: {
                userId: "number",
                bookId: "number",
              },
            },
            {
              route: "favorite?id=$id",
              method: "DELETE",
              description: "Deletes a favorite",
            },
          ],
          Auth: [
            {
              route: "register",
              method: "POST",
              description: "Registers a new user",
              body: {
                name: "string",
                username: "string",
                password: "string",
                confirmPass: "string",
              },
            },
          ],
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      {
        status: 500,
      }
    );
  }
}
