import { EndCustomerInterface } from 'interfaces/end-customer';
import { TeamMemberInterface } from 'interfaces/team-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InsurerInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  end_customer?: EndCustomerInterface[];
  team_member?: TeamMemberInterface[];
  user?: UserInterface;
  _count?: {
    end_customer?: number;
    team_member?: number;
  };
}

export interface InsurerGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
