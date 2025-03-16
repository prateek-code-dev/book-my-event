import { LoaderCircle } from "lucide-react";

const Loading = () => {
    return (
        <div className="text-4xl flex items-center justify-center w-16 h-16">
            <LoaderCircle className="animate-spin w-full h-full" />
        </div>
    );
};

export default Loading;
