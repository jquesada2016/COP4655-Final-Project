export type task = {
    [index: string]: any;
    id: string;
    title: string;
    description: string;
    urgency: "low" | "normal" | "high" | "emergency";
    category?: string;
    createdBy: string;
    creationDate: number;
    reminderTimestamp?: number;
    expirationDate?: number;
    location?: { lat: number; lon: number };
    img?: string;
    audio?: string;
    video?: string;
};
