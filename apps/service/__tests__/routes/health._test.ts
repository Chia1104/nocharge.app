import app from "@/server";

describe("Health Route", () => {
  it("should return 200", async () => {
    const response = await app.request("/api/v1/health");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok" });
  });
});
