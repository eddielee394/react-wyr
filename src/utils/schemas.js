import { schema } from "normalizr";

// Define a users schema
const voteSchema = new schema.Entity("votes");
const authorSchema = new schema.Entity("author");
// Define your article

const answerSchema = new schema.Entity("answers", { votes: voteSchema });
const questionSchema = new schema.Entity("questions", {
  answers: [answerSchema],
  author: authorSchema
});

// Schemas for Github API responses.
export const Schemas = {
  author: authorSchema,
  answers: answerSchema,
  answers_array: [answerSchema],
  questions: questionSchema,
  questions_array: [questionSchema]
};
