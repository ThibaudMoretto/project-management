export interface NextFunction {
  (arg0: any): any;
}

export interface ActionFunction {
  payload: {
    accessToken?: string;
    locale: string;
    status?: number;
  };
  type: any;
  meta: any;
}
