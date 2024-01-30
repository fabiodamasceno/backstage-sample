import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react'
import {
  AnyApiFactory,
  configApiRef,
  createApiFactory,
  identityApiRef,
  analyticsApiRef,
} from '@backstage/core-plugin-api'

import { GoogleAnalytics } from '@backstage/plugin-analytics-module-ga'

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  createApiFactory({
    api: analyticsApiRef,
    deps: { configApi: configApiRef, identityApi: identityApiRef },
    factory: ({ configApi, identityApi }) =>
      GoogleAnalytics.fromConfig(configApi, {
        identityApi,
      }),
  }),
  ScmAuth.createDefaultApiFactory(),
]
