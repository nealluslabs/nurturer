import { lazy } from "react";

const CandidateAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/candidates/interactions",
      component: lazy(() => import("./candidateInteractionsPage")),
    },
    {
      path: "/candidates",
      component: lazy(() => import("./CandidateApp")),
    },
  ],
};

export default CandidateAppConfig;
