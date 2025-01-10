import 'dotenv/config'
import * as env from 'env-var'

export const envs = {
  PORT: env.get('port').required().asPortNumber()
}
