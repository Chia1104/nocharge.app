import { implement } from "@orpc/server";
import { os } from "@orpc/server";

import { routerContract } from "./router.contract";

export const baseOS = os.$context<{
  headers: Headers;
}>();

export const contractOS = implement(routerContract).$context<{
  headers: Headers;
}>();
