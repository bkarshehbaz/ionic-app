import { IRecentActivity } from '../../current-ticket/recent-activity.interface';
import { IUser } from '../../user/user.interface';
/*
	Remove User From Property Return Interface
*/
export interface IPropertySignOut {

    CurrentUser: IUser[];
    RecentActivity: IRecentActivity[];

}
