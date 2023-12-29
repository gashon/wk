import { toast } from "sonner";

export const successNotification = (message: string) => toast.success(message);

export const errorNotification = (message: string) => toast.error(message);
