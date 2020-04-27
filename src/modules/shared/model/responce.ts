export interface ResponseEntityParams<T> {
  errors?: Array<string> | string;
  data?: T;
}

export class ResponseEntity<T> {
  success: boolean;
  errors?: Array<string> | string;
  data?: T;

  constructor(params: ResponseEntityParams<T> = {}) {
    this.success = Boolean(params.errors) ? false : true;
    this.errors = params.errors ? params.errors : null;
    this.data = params.data ? params.data : null;
  }
}
