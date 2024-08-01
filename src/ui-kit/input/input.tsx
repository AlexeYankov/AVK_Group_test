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
    onClearClick?: () => void;
    onClose?: () => void;
    onEnter?: (value: string) => void;
    onChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
    password?: boolean;
    search?: boolean;
    fullWidth?: boolean;
    control?: any;
    type?: "password" | "text" | "number";
    value?: string | number;
    serverValue?: string | number;
    placeholder?: string;
    register?: UseFormRegister<any>;
    setError?: (value: string) => void;
    error?: any;
} & ComponentPropsWithoutRef<"input">;

const InputKit = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const {
        className,
        disabled,
        control,
        fullWidth,
        width,
        autoComplete,
        maxW,
        error,
        inputId,
        value,
        serverValue,
        setError,
        onChangeHandler,
        label,
        onClearClick,
        onClose,
        onEnter,
        password,
        search,
        id,
        placeholder,
        type = "text",
        register,
        ...rest
    } = props;
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState(value || "");
    const [valueType, setValueType] = useState(type);
    useEffect(() => {
        if (id === "minValue" || id === "maxValue" || id === "decks") {
            setInputValue(String(value));
        }
    }, [value]);
    const isShowClearButton = onClearClick && search && value?.toString().length! > 0;
    const setInputType = () => {
        if (valueType === "text") {
            return setValueType("password");
        }
        setValueType("text");
    };
    const focused = isFocused ? "light.--color-light-100" : "dark.--color-dark-100";
    const onChangeHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value.trim()) {
            setError && setError("");
        }
        setInputValue(event.currentTarget.value);
        register && register(id).onChange(event);
        onChangeHandler && onChangeHandler(event);
    };
    const onBlurHandlerInput = (event: ChangeEvent<HTMLInputElement>) => {
        !inputValue && setError && setError("reqiured");
        if (!event.currentTarget.value.trim() && id === "profile") {
            setInputValue(String(serverValue));
            setError && setError("");
        }
        register && register(id).onBlur(event);
        setIsFocused(false);
    };
    const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 27) {
            setInputValue(String(serverValue));
            setError && setError("");
            onClose && onClose();
        }
        if (event.keyCode === 13) {
            if (!event.currentTarget.value.trim()) {
                return setError && setError("name cant be empty");
            }
            onEnter && onEnter(event.currentTarget.value);
            onClose && onClose();
            setError && setError("");
        }
    };
    const claerClickHandler = () => {
        onClearClick && onClearClick();
        setInputValue("");
    };
    return (
        <FormControl
            isDisabled={disabled}
            isInvalid={!!error}
            // onBlur={!inputValue || id === "profile" ? () => "" : onClose}
            width={width}
            maxW={maxW}>
            <FormLabel marginBottom={"1"} fontSize="sm" color="dark.--color-dark-100">
                {label}
            </FormLabel>
            <InputGroup
                size="sm"
                display={"flex"}
                alignItems={"flex-start"}
                flexDirection={"column"}
                justifyContent={"center"}
                fill={focused}
                position={"relative"}>
                <Input
                    display={"flex"}
                    width={"100%"}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    name={register && register(id).name}
                    ref={register && register(id).ref}
                    // onBlur={onBlurHandlerInput}
                    id={id}
                    type={valueType}
                    variant={"primary"}
                    onKeyDown={keyDownHandler}
                    autoComplete={autoComplete}
                    placeholder={search ? "input search" : placeholder}
                    value={inputValue}
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

export default InputKit;
