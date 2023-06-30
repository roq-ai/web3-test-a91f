import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { collateralValidationSchema } from 'validationSchema/collaterals';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.collateral
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCollateralById();
    case 'PUT':
      return updateCollateralById();
    case 'DELETE':
      return deleteCollateralById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCollateralById() {
    const data = await prisma.collateral.findFirst(convertQueryToPrismaUtil(req.query, 'collateral'));
    return res.status(200).json(data);
  }

  async function updateCollateralById() {
    await collateralValidationSchema.validate(req.body);
    const data = await prisma.collateral.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCollateralById() {
    const data = await prisma.collateral.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
