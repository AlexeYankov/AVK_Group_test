import React from "react";
import {
    ChangeEvent,
    ComponentPropsWithoutRef,
    KeyboardEvent,
    forwardRef,
    useEffect,
    useState
} from "react";
import {FormControl, FormErrorMessage, FormLabel, Input, InputGroup} from "@chakra-ui/react";
import {UseFormRegister} from "react-hook-form";

export type TextFieldProps = {
    inputId?: string;
    maxW?: string | object;
    width?: string;
    label?: string;
    autoComplete?: string;
    id: string;
    onEnter?: (value: string) => void;
    onChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
    password?: boolean;
    fullWidth?: boolean;
    control?: any;
    type?: "password" | "text" | "number" | "text-area";
    value?: string | number;
    placeholder?: string;
    register?: UseFormRegister<any>;
    setError?: (value: string) => void;
    error?: any;
} & ComponentPropsWithoutRef<"input">;

export const InputKit = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const {
        disabled,
        control,
        fullWidth,
        width,
        autoComplete,
        maxW,
        error,
        inputId,
        value,
        setError,
        onChangeHandler,
        label,
        onEnter,
        password,
        id,
        placeholder,
        type = "text",
        register,
        ...rest
    } = props;
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const focused = isFocused ? "light.--color-light-100" : "dark.--color-dark-100";
    const onChangeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value.trim()) {
            setError && setError("");
        }
        register && register(id).onChange(event);
        onChangeHandler && onChangeHandler(event);
    };
    const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 27) {
            setError && setError("");
        }
        if (event.keyCode === 13) {
            onEnter && onEnter(event.currentTarget.value);
            setError && setError("");
        }
    };
    return (
        <FormControl isDisabled={disabled} isInvalid={!!error} width={width} pt={2} maxW={maxW}>
            <FormLabel marginBottom={"1"} fontSize="sm" color="dark.--color-dark-100">
                {label}
            </FormLabel>
            <InputGroup
                size="sm"
                display={"flex"}
                alignItems={"flex-start"}
                flexDirection={"column"}
                justifyContent={"center"}
                fill={isFocused ? "light.--color-light-100" : "dark.--color-dark-100"}
                position={"relative"}>
                <Input
                    display={"flex"}
                    width={"100%"}
                    onFocus={() => {
                        console.log(1)
                        setIsFocused(true);
                    }}
                    name={register && register(id).name}
                    ref={register && register(id).ref}
                    // onBlur={onBlurHandlerInput}
                    id={id}
                    type={type}
                    variant={"primary"}
                    onKeyDown={keyDownHandler}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChangeHandlerInput}
                />
                <FormErrorMessage
                    position={"absolute"}
                    top={"75%"}
                    color={"danger.--color-danger-300"}>
                    {error}
                </FormErrorMessage>
            </InputGroup>
        </FormControl>
    );
});

InputKit.displayName = "InputKit";
