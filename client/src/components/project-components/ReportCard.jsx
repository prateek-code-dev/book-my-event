import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const ReportCard = ({ title, description, value }) => {
    return (
        <div className="text-lg">
            <Card className="p-4 h-[200px] bg-gray-50">
                <p className="h-1/3 text-2xl font-bold">{title || "Title"}</p>
                <p className="h-1/3 text-lg text-gray-400">
                    {description || "Description"}
                </p>
                <p className="h-1/3 text-3xl font-extrabold">{value}</p>
            </Card>
        </div>
    );
};

export default ReportCard;
