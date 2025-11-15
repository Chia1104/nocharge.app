import * as healthContracts from "./contracts/health.contract";

export const routerContract = {
  health: {
    server: healthContracts.healthContract,
    client: healthContracts.protectedHealthContract,
  },
};
