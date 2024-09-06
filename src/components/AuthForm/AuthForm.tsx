import {FC, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "../Button/Button.tsx";
import TextField from "../TextField/TextField.tsx";

interface FormValues {
    email: string;
    password: string;
}

interface MockServerResponse {
    status: "success";
    message: string;
}

const AuthForm: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormValues>({mode: "onBlur",});

    const mockServer = async (email: string, password: string): Promise<MockServerResponse> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === "test@test.com" && password === "password123") {
                    resolve({status: "success", message: "Успешный вход"});
                } else {
                    reject(new Error("Неверные логин или пароль"));
                }
            }, 1000);
        });
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        setSuccess(false);
        setError(null);

        const {email, password} = data;

        try {
            const response = await mockServer(email, password);

            if (response.status === "success") {
                setSuccess(true);
                reset();
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {success ? (
                <div className="flex flex-col items-center px-6 py-24 text-xl font-medium text-green-600">
                    Успешный вход!
                </div>
            ) : (
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Email"
                        type="email"
                        {...register("email", {
                            required: "Email обязателен",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Введите корректный email"
                            }
                        })}
                        error={errors.email}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        {...register("password", {
                            required: "Пароль обязателен",
                            minLength: {
                                value: 6,
                                message: "Пароль должен быть минимум 6 символов"
                            }
                        })}
                        error={errors.password}
                    />

                    <div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Загрузка..." : "Войти"}
                        </Button>
                    </div>

                    {error && (
                        <span className="text-sm text-red-500 font-medium">{error}</span>
                    )}
                </form>
            )}
        </div>
    );
};

export default AuthForm;