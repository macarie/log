import kleur from 'kleur'

export enum LOG_LEVEL {
  ERROR,
  WARN,
  SUCCESS,
  INFO,
  VERBOSE,
  DEBUG,
}

const pad = (string: string, spaces = 2): string => {
  const spaceString = ' '.repeat(spaces)

  return `${spaceString}${string}${spaceString}`
}

type AvailableLogTypes =
  | 'error'
  | 'warn'
  | 'success'
  | 'info'
  | 'verbose'
  | 'debug'

const logTypes = new Map<
  AvailableLogTypes,
  { level: LOG_LEVEL; prefix: string; format: kleur.Color }
>([
  [
    'error',
    {
      level: LOG_LEVEL.ERROR,
      prefix: `${kleur.bgRed().white(pad('error'))}${' '.repeat(7)}`,
      format: kleur.red,
    },
  ],
  [
    'warn',
    {
      level: LOG_LEVEL.WARN,
      prefix: `${kleur.bgYellow().grey(pad('warn'))}${' '.repeat(8)}`,
      format: kleur.yellow,
    },
  ],
  [
    'success',
    {
      level: LOG_LEVEL.SUCCESS,
      prefix: `${kleur.bgGreen().grey(pad('success'))}${' '.repeat(5)}`,
      format: kleur.green,
    },
  ],
  [
    'info',
    {
      level: LOG_LEVEL.INFO,
      prefix: `${kleur.bgCyan().grey(pad('info'))}${' '.repeat(8)}`,
      format: kleur.cyan,
    },
  ],
  [
    'verbose',
    {
      level: LOG_LEVEL.VERBOSE,
      prefix: `${kleur.bgWhite().black(pad('verbose'))}${' '.repeat(5)}`,
      format: kleur.dim,
    },
  ],
  [
    'debug',
    {
      level: LOG_LEVEL.DEBUG,
      prefix: `${kleur.bgBlue().white(pad('debug'))}${' '.repeat(7)}`,
      format: kleur.dim().blue,
    },
  ],
])

export const createLogger = (
  moduleName: string,
  initialLogLevel: LOG_LEVEL = LOG_LEVEL.INFO,
  formatModuleName: (moduleName: string) => string = (moduleName) =>
    kleur.bgWhite().black(pad(moduleName, 1))
) => {
  let logLevel: LOG_LEVEL = initialLogLevel

  const moduleTag = moduleName === '' ? '' : `${formatModuleName(moduleName)}`

  const logger = (logType: AvailableLogTypes, message: string) => {
    const { level = -1, prefix, format } = logTypes.get(logType) ?? {}

    if (logLevel >= level) {
      console.log(`${moduleTag}${prefix!}${format!(message)}`)
    }
  }

  logger.setLogLevel = (level: LOG_LEVEL) => {
    logLevel = level
  }

  logger.getLogLevel = () => logLevel

  return logger
}

export const log = createLogger('', LOG_LEVEL.INFO)

export default log
