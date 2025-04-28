export interface ITicketCombined {
    // customerStepModel
    ticketNumber	  :  string;

    customerFirstName :  string;
    customerLastName  :  string;
    customerPhone	  :  string;

    ticketTypeName	  :  string;
    ticketTypeID      :  string;

    // carStepModel
    vinNumber		  :	 string;

    manual            :  number;

    makeName		  :	 string;
    makeID			  :	 string;
    apiMakeID		  :	 string;

    modelName		  :	 string;
    modelID			  :	 string;
    apiModelID		  :	 string;

    carYear           :	 string;

    colorName		  :	 string;
    colorID			  :	 string;

    // Notes
    notes             :  string;

    // Photos
    // carphotos      : Array<any>;
    images            : any[];

    // testing purposes
    currentTicketID   : number;

    checkInUserID     : number;

  }
