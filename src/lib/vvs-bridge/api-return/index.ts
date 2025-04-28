export * from "./checkin";
export * from "./checkout";
export * from "./edit";
export * from "./park";
export * from "./pay";
export * from "./property";
export * from "./pull";
export * from "./return-checkin";
export * from "./initialize.interface";

export type IOneSignalAction = "paycard" | "paycash" | "payvoucher" | "paycomp" | "checkin" | "checkout" | "rcheckin" | "pull" | "park" | "edit" | "insert_chat";
