import { CollateralInterface } from 'interfaces/collateral';
import { UserInterface } from 'interfaces/user';
import { InsurerInterface } from 'interfaces/insurer';
import { GetQueryInterface } from 'interfaces';

export interface EndCustomerInterface {
  id?: string;
  user_id?: string;
  insurer_id?: string;
  created_at?: any;
  updated_at?: any;
  collateral?: CollateralInterface[];
  user?: UserInterface;
  insurer?: InsurerInterface;
  _count?: {
    collateral?: number;
  };
}

export interface EndCustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  insurer_id?: string;
}
