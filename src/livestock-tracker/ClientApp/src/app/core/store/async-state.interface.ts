import { SaveState } from '@core/models/save-state.enum';

export interface AsyncState {
  isPending: boolean;
  saveState: SaveState;
}
