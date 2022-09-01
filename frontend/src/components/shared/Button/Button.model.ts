import { MouseEventHandler, ReactNode } from 'react';

export interface IButton {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}
