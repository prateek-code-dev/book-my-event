import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const Modal = ({ isOpen, setIsOpen, handleAction }) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        <p className="py-2 text-lg">
                            This action cannot be undone.
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <Button onClick={(e) => handleAction(e)}>
                    <p className="text-xl">Delete Event</p>
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
