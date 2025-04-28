import { DecodeStringPipe } from './decode-string/decode-string';

import { HighlightPipe } from './highlight/highlight';
// import { KeysPipe } from './keys/keys';
import { CarInfoPipe } from './car-info';
import { ColorPipe } from './color';
import { CustomerFullnamePipe } from "./customer-fullname";
import { TicketTypeNamePipe } from "./ticket-type-name/index";
import { MakeNamePipe } from "./make-name";
import { ModelNamePipe } from "./model-name";
import { MomentFormatPipe } from './arrival-time';
import { FullParkLocationPipe } from './full-park-location';
import { UserFullNamePipe } from './user-flname/user-flname.pipe';
import { RelativeTime } from './relative-time';
import { ActivityTypePipe } from './activity-type';
import { StartCasePipe } from './start-case';
import { MomentPipe } from './moment';
import { TicketNumberPipe } from './ticket-number';
import { ProfilePhotoPipe } from './profile-photo';
import { InProgressPipe } from './in-progress';
import { FilterTicketsByPipe } from './filter-tickets-by';
import { FilterListByPipe } from './filter-list';
import { MakeIconPipe } from './make-icon';
// import { BalancePipe } from './balance';
import { CalendarEventPipe } from './calendar-event';
import { AbsPipe } from './abs';
import { PaymentTypePipe } from './payment';
import { IsHotelPipe } from './is-hotel';
// import { ByUserPipe } from './by-user';

export const AppPipes = [
    // TimeAgoPipe,
    DecodeStringPipe,
    // KeysPipe,
	HighlightPipe,
	CarInfoPipe,
    ColorPipe,
	CustomerFullnamePipe,
    TicketTypeNamePipe,
    MakeNamePipe,
	ModelNamePipe,
	MomentFormatPipe,
	FullParkLocationPipe,
	UserFullNamePipe,
	RelativeTime,
	ActivityTypePipe,
	StartCasePipe,
	MomentPipe,
	TicketNumberPipe,
	ProfilePhotoPipe,
	InProgressPipe,
	FilterTicketsByPipe,
	FilterListByPipe,
	MakeIconPipe,
	// BalancePipe,
	// ByUserPipe
	CalendarEventPipe,
	AbsPipe,
	PaymentTypePipe,
	IsHotelPipe
];
