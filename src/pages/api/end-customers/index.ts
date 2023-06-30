import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { endCustomerValidationSchema } from 'validationSchema/end-customers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEndCustomers();
    case 'POST':
      return createEndCustomer();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEndCustomers() {
    const data = await prisma.end_customer
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'end_customer'));
    return res.status(200).json(data);
  }

  async function createEndCustomer() {
    await endCustomerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.collateral?.length > 0) {
      const create_collateral = body.collateral;
      body.collateral = {
        create: create_collateral,
      };
    } else {
      delete body.collateral;
    }
    const data = await prisma.end_customer.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
