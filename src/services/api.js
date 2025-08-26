import axios from "axios";
import { decodeHTML } from "../utils/decodeHTML";
import { shuffleArray } from "../utils/shuffleArray";

const API_URL = import.meta.env.VITE_API_URL;

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchQuestions(amount = 10, category, difficulty) {
  if (!API_URL) {
    throw new Error("API URL missing: set VITE_API_URL in your .env");
  }

  const params = { amount, type: "multiple" };
  if (category) params.category = category;
  if (difficulty) params.difficulty = difficulty;

  // up to 3 attempts w/ small backoff for 429s
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log("Fetching from:", API_URL, "params:", params);
      const { data } = await axios.get(API_URL, { params });

      if (!data || data.response_code !== 0 || !Array.isArray(data.results)) {
        throw new Error(
          `OpenTDB error (code ${data?.response_code ?? "unknown"}): No results`
        );
      }

      return data.results.map((q, idx) => {
        const correct = decodeHTML(q.correct_answer);
        const options = shuffleArray([
          ...q.incorrect_answers.map(decodeHTML),
          correct,
        ]);
        return {
          id: idx + 1,
          question: decodeHTML(q.question),
          options,
          answer: correct,
        };
      });
    } catch (err) {
      const status = err?.response?.status;
      const isLast = attempt === maxAttempts;
      if (status === 429 && !isLast) {
        // brief backoff: 300ms, then 600ms
        await sleep(300 * attempt);
        continue;
      }
      console.error("fetchQuestions failed:", err);
      throw new Error(err?.message || "Network/unknown error while fetching questions");
    }
  }
}