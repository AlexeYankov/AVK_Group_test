import * as yup from "yup";

export const CreatePostSchema = () =>
  yup
    .object({
      title: yup
        .string()
        .required("title required")
        .min(3, "title must be min 3 symbols")
        .max(20, "title must be 20 symbols max"),
      body: yup
        .string()
        .required("message required")
        .min(3, "title must be min 3 symbols")
        .max(200, "message must be 200 symbols max"),
    })
    .required();
