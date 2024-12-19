const request = require("supertest");
const app = require("../../backend/server"); // Passe den Pfad an, falls nötig

const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe("Server Tests", () => {
  it("should respond with 200 on the root endpoint", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Welcome to PokeScan");
  });

  it("should handle 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown");
    expect(response.statusCode).toBe(404);
  });

  it("should upload an image to the server", async () => {
    const response = await request(app)
      .post("/upload")
      .attach("file", "__tests__/testFiles/sample.png"); // Test-Bild hochladen
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("File uploaded successfully");
  });
});
