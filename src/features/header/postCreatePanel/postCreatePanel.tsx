"use client";

import {yupResolver} from "@hookform/resolvers/yup";
import {postsApi} from "@/api/postsApi";
import {CreatePostFormType, CreatePostType} from "@/types/types";
import {ButtonKit} from "@/ui-kit/button";
import {InputKit} from "@/ui-kit/input";
import {toastWrapper} from "@/ui-kit/toast";
import {useMutation} from "@tanstack/react-query";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreatePostSchema} from "@/types/schema/createPostSchema";
import {Box, Center} from "@chakra-ui/react";
import {ChangeEvent, useEffect, useState} from "react";

export const PostCreatePanel = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const mutation = useMutation({
        mutationFn: (formData: CreatePostType) => postsApi.createPost(formData)
    });
    const {
        register,
        handleSubmit,
        formState: {errors, isValid, dirtyFields},
        getValues,
        reset,
        setError
    } = useForm<CreatePostFormType>({
        mode: "onSubmit",
        shouldUnregister: false,
        defaultValues: {
            title: "",
            body: ""
        },
        resolver: yupResolver(CreatePostSchema())
    });

    console.log(errors);
    const processForm: SubmitHandler<CreatePostFormType> = async (formData) => {
        if (!formData.title) {
            return toastWrapper("Наименование не может быть пустым");
        }
        const userId = 1;
        const normalizeFormData = {...formData, userId: userId.toString()};
        mutation.mutate(normalizeFormData, {
            onSuccess: (res) => {
                toastWrapper("Пост успешно добавлен");
                reset();
                setBody("");
                setTitle("");
                return;
            }
        });
    };

    const onChangeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.id === "title") {
            return setTitle(event.currentTarget.value);
        }
        setBody(event.currentTarget.value);
    };

    return (
        <form onSubmit={handleSubmit(processForm)} style={{width: "100%"}}>
            <Center display={"flex"} gap={[0, "20px"]} w={"100%"} flexDirection={["column", "row"]}>
                <Box
                    display={"flex"}
                    flexDirection={["column", "row"]}
                    alignItems={"center"}
                    justifyContent={"center"}
                    w={"100%"}
                    maxW={["100%", "70%"]}
                    pb={8}
                    gap={"20px"}>
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
        </form>
    );
};
