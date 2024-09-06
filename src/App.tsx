import AuthForm from "./components/AuthForm/AuthForm.tsx";

const App = () => {

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8">
            <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Войдите в свою учетную запись
            </h2>
            <AuthForm/>
        </div>
    );
};

export default App;
