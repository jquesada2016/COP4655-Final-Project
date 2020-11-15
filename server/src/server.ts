import express from "express";

const app = express();

app.get("/test", (_, res) => {
  console.log("Visitor at /test");
  res.json({
    test: "this is a test",
    endpoint: "/",
    apiType: "REST"
  });
});

app.listen(7000, () => console.log("express server started on port 7000"));
