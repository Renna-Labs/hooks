import Logger from '../utils/logger';

const VERSION_INCREMENT: string[] = ['patch', 'minor', 'major'];

export function getIncrementedVersion(version: string, options: { type: string }): string {
  if (!VERSION_INCREMENT.includes(options.type)) {
    Logger.error(
      `Incorrect version type: ${
        options.type
      }, it should be one of these values: ${VERSION_INCREMENT.join(', ')}`,
    );

    process.exit(1);
  }

  const updateVersion = (raw: string): string => {
    const splitted = raw.split('.');

    if (options.type === 'patch') {
      splitted[2] = (parseInt(splitted[2], 10) + 1).toString();
    }

    if (options.type === 'minor') {
      splitted[1] = (parseInt(splitted[1], 10) + 1).toString();
      splitted[2] = '0';
    }

    if (options.type === 'major') {
      splitted[0] = (parseInt(splitted[0], 10) + 1).toString();
      splitted[1] = '0';
      splitted[2] = '0';
    }

    return splitted.join('.');
  };

  try {
    return updateVersion(version);
  } catch (e) {
    Logger.error('Failed to parse package.json');
    process.exit(1);
    return '';
  }
}
