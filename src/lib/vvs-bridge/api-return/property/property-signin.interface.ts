import { ICurrentUser } from '../../chat/current-user.interface';
import { IRecentActivity } from '../../current-ticket';
/*
	Insert User To Property Return Interface
*/
export interface IPropertySignIn {
	CurrentUser: ICurrentUser[];
	RecentActivity: IRecentActivity[];
	Authorization: string;
	AblyToken: string;
	ONE_SIGNAL_APP_ID: string;
}
