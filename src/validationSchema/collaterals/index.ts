import * as yup from 'yup';

export const collateralValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  end_customer_id: yup.string().nullable(),
});
