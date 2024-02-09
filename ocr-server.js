import express from "express";
import fileUpload from "express-fileupload";

const app = express();

app.use(fileUpload());

app.post("/ocr", (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: "No files were uploaded." });
  }

  res.json({
    firstName: ["Luke", "Leia"][Math.floor(Math.random() * 2)],
    lastName: "Skywalker",
    passportNumber: Math.random().toString(36).substring(7),
  });
});

export const handler = app;
