import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { insurerValidationSchema } from 'validationSchema/insurers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getInsurers();
    case 'POST':
      return createInsurer();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInsurers() {
    const data = await prisma.insurer
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'insurer'));
    return res.status(200).json(data);
  }

  async function createInsurer() {
    await insurerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.end_customer?.length > 0) {
      const create_end_customer = body.end_customer;
      body.end_customer = {
        create: create_end_customer,
      };
    } else {
      delete body.end_customer;
    }
    if (body?.team_member?.length > 0) {
      const create_team_member = body.team_member;
      body.team_member = {
        create: create_team_member,
      };
    } else {
      delete body.team_member;
    }
    const data = await prisma.insurer.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
