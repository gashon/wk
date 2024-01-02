import { toast } from "sonner";

export const successNotification = (message: string) => toast.success(message);

export const errorNotification = (message: string) => toast.error(message);

export const warningNotification = (message: string) => toast.warning(message);
