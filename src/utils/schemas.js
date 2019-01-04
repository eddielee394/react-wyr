import { schema } from "normalizr";

// Define a users schema
const voteSchema = new schema.Entity("votes");
const authorSchema = new schema.Entity("author");
const categorySchema = new schema.Entity("categories");
const answerSchema = new schema.Entity("answers", { votes: voteSchema });

// Define your article

const questionSchema = new schema.Entity("questions", {
  answers: [answerSchema],
  author: authorSchema,
  category: categorySchema
});

// Schemas for Github API responses.
export const Schemas = {
  author: authorSchema,
  answers: answerSchema,
  answersList: [answerSchema],
  questions: questionSchema,
  questionsList: [questionSchema],
  categories: categorySchema,
  categoriesList: [categorySchema]
};
