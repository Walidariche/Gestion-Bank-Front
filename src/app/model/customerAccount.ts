export interface customerAccountdetails  {
  type:          string;
  id:            string;
  balance:       number;
  createAT:      Date;
  status:        null;
  customerDTO:   CustomerDTO;
  interestRate?: number;
  overDraft?:    number;
}

export interface CustomerDTO {
  id:    number;
  name:  string;
  email: string;
}

