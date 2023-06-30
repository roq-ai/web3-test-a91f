import { UserInterface } from 'interfaces/user';
import { InsurerInterface } from 'interfaces/insurer';
import { GetQueryInterface } from 'interfaces';

export interface TeamMemberInterface {
  id?: string;
  user_id?: string;
  insurer_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  insurer?: InsurerInterface;
  _count?: {};
}

export interface TeamMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  insurer_id?: string;
}
