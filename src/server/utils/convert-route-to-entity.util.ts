const mapping: Record<string, string> = {
  collaterals: 'collateral',
  'end-customers': 'end_customer',
  insurers: 'insurer',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
