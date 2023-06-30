import { EndCustomerInterface } from 'interfaces/end-customer';
import { GetQueryInterface } from 'interfaces';

export interface CollateralInterface {
  id?: string;
  amount: number;
  end_customer_id?: string;
  created_at?: any;
  updated_at?: any;

  end_customer?: EndCustomerInterface;
  _count?: {};
}

export interface CollateralGetQueryInterface extends GetQueryInterface {
  id?: string;
  end_customer_id?: string;
}
