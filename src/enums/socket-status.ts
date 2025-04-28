export const CONNECTED: SocketStatus         = 0;
export const DISCONNECTED: SocketStatus      = 1;
export const RECONNECT_FAILED: SocketStatus  = 2;
export const RECONNECT_ERROR: SocketStatus   = 3;
export const RECONNECTING: SocketStatus      = 4;
export const UNAUTHORIZED: SocketStatus      = 5;
export const AUTHENTICATED: SocketStatus     = 6;

export type SocketStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;
