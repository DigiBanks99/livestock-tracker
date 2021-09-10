import { Action } from '@ngrx/store';

export const NoopAction: Action = {
  get type() {
    return 'NOOP';
  }
};
