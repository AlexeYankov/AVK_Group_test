"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { postsApi, useGetPosts } from "@/api/postsApi";
import { CreatePostFormType, CreatePostType } from "@/types/types";
import { ButtonKit } from "@/ui-kit/button";
import { InputKit } from "@/ui-kit/input";
import { toastWrapper } from "@/ui-kit/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreatePostSchema } from "@/types/schema/createPostSchema";
import { Box, Center, FormControl, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export const PostCreatePanel = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (formData: CreatePostType) => postsApi.createPost(formData),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
  } = useForm<CreatePostFormType>({
    mode: "onSubmit",
    shouldUnregister: false,
    defaultValues: {
      title: "",
      body: "",
    },
    resolver: yupResolver(CreatePostSchema()),
  });
  const processForm: SubmitHandler<CreatePostFormType> = async (formData) => {
    if (!formData.title) {
      return toastWrapper("Наименование не может быть пустым");
    }
    const userId = 1;
    const normalizeFormData = { ...formData, userId: userId.toString() };
    mutation.mutate(normalizeFormData, {
      onSuccess: async (res) => {
        const previousPosts = queryClient.getQueryData(["posts"]);
        if (!Array.isArray(previousPosts)) {
          return;
        }
        queryClient.setQueryData(
          ["posts"],
          [...previousPosts, { ...normalizeFormData, id: res.data.id }],
        );

        toastWrapper("Пост успешно добавлен");
        reset();
        setBody("");
        setTitle("");

        localStorage.setItem("description", normalizeFormData.body);
        router.push("posts/" + res.data.id);
        return { previousPosts, normalizeFormData };
      },
    });
  };

  const onChangeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.id === "title") {
      return setTitle(event.currentTarget.value);
    }
    setBody(event.currentTarget.value);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"} pt="8">
      <Text fontSize={"2xl"}>Here you can create your own post</Text>
      <FormControl as={"form"} onSubmit={handleSubmit(processForm)}>
        <Center
          display={"flex"}
          justifyContent={"flex-start"}
          gap={[0, "20px"]}
          w={"100%"}
          flexDirection={["column", "row"]}
        >
          <Box
            display={"flex"}
            flexDirection={["column", "row"]}
            alignItems={"center"}
            w={"100%"}
            maxW={["100%", "70%"]}
            pb={8}
            gap={"20px"}
          >
            <InputKit
              id="title"
              register={register}
              error={errors["title"]?.message}
              control={dirtyFields}
              label="post title"
              value={title}
              onChangeHandler={onChangeHandlerInput}
            />
            <InputKit
              id="body"
              register={register}
              error={errors["body"]?.message}
              control={dirtyFields}
              value={body}
              label="message"
              onChangeHandler={onChangeHandlerInput}
            />
          </Box>
          <ButtonKit />
        </Center>
      </FormControl>
    </Box>
  );
};
