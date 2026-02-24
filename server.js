import express from "express";
import cors from "cors";
import db from "./database.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const lies = {
  late_reply: [
    "I typed the reply and emotionally sent it.",
    "My phone saw the message and panicked.",
    "I opened it, overthought, and disappeared."
  ],

  missed_call: [
    "My phone was on silent and my soul was loud.",
    "I was in the middle of something unmissable.",
    "I saw the call 2 seconds late and accepted defeat."
  ],

  missed_class: [
    "The professor cancelled in my dreams.",
    "Attendance and I are currently enemies.",
    "I reached campus spiritually."
  ],

  late_submission: [
    "The file was ready but the WiFi wasn’t.",
    "My laptop chose violence.",
    "Time moved faster near the deadline."
  ],

  work_issue: [
    "There was a system issue I can’t legally explain.",
    "IT told me to wait and I waited too hard.",
    "The task worked yesterday, I swear."
  ],

  office_deadline: [
    "The approval chain broke in the middle.",
    "I was waiting on a dependency that ghosted me.",
    "The timeline changed unexpectedly."
  ],

  relationship: [
    "We had a misunderstanding that required space.",
    "Things are complicated but improving.",
    "We’re communicating… slowly."
  ],

  missed_date: [
    "Something urgent came up last minute.",
    "I was already on the way, mentally.",
    "The universe rescheduled us."
  ],

  parents: [
    "My parents had an emergency discussion.",
    "Family situation came up suddenly.",
    "I had to be home immediately."
  ],

  family_function: [
    "A relative I barely know arrived unexpectedly.",
    "The function lasted way longer than planned.",
    "Family time was non-negotiable."
  ],

  friends: [
    "Plans changed suddenly.",
    "Everyone showed up late.",
    "We lost track of time unintentionally."
  ],

  birthday: [
    "I remembered, just a little late.",
    "I was planning something special.",
    "Time zones betrayed me."
  ],

  exam: [
    "I wasn’t feeling well before the exam.",
    "There was confusion about the schedule.",
    "I prepared but things went sideways."
  ],

  gym: [
    "Rest day turned into rest week.",
    "My body said no.",
    "I didn’t want to injure myself."
  ],

  hostel_college: [
    "Hostel rules changed suddenly.",
    "There was a college issue I had to handle.",
    "Something official came up unexpectedly."
  ]
};

app.post("/lie", (req, res) => {
  console.log("📩 /lie hit with body:", req.body);

  const { situation, theme } = req.body;

  if (!situation) {
    console.log("❌ No situation received");
    return res.status(400).json({ error: "No situation" });
  }

  const lie =
    lies[situation]?.[
      Math.floor(Math.random() * lies[situation].length)
    ];

  if (!lie) {
    console.log("❌ Invalid situation:", situation);
    return res.status(400).json({ error: "Invalid situation" });
  }

  db.run(
    "INSERT INTO clicks (situation, theme) VALUES (?, ?)",
    [situation, theme || "default"],
    function (err) {
      if (err) {
        console.error("❌ DB INSERT ERROR:", err);
      } else {
        console.log("✅ INSERTED ROW ID:", this.lastID);
      }
    }
  );

  res.json({ lie });
});

app.get("/analytics", (req, res) => {
  db.all("SELECT * FROM clicks ORDER BY clicked_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "DB error" });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});