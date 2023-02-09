import path from 'path';
import chalk from 'chalk';
import simpleGit from 'simple-git';
import githubRelease from 'new-github-release-url';
import open from 'open';
import { execa } from 'execa';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { getIncrementedVersion } from './getIncrementedVersion';
import { setPackageVersion } from './setPackageVersion';
import packageJson from '../package.json';

const git = simpleGit();
const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option('skip-build', {
    type: 'boolean',
    default: false,
    description: 'Skip building step.',
  })
  .option('skip-publish', {
    type: 'boolean',
    default: false,
    description: 'Skip publishing step.',
  })
  .example([['$0 minor --skip-build', 'Release but skip building packages.']]);

(async () => {
  const status = await git.status();

  if (status.files.length !== 0) {
    chalk.red('Working tree is not clean');
    process.exit(1);
  }

  try {
    await execa('yarn', ['test'], { stdio: 'inherit' });

    chalk.green('All tests passed.');
  } catch (e) {
    chalk.red('Tests failed', e);
    process.exit(1);
  }

  chalk.white('Releasing all packages');

  let incrementedVersion = packageJson.version;

  incrementedVersion = getIncrementedVersion(incrementedVersion, {
    type: argv._[0] as string,
  });
  chalk.white(`New version: ${chalk.cyan(incrementedVersion)}`);

  await setPackageVersion(incrementedVersion);

  if (!argv.skipBuild) {
    try {
      await execa('yarn', ['build'], { stdio: 'inherit' });

      chalk.green('Library was built successfully');
    } catch (e) {
      chalk.red('Build failed', e);
      process.exit(1);
    }
  }

  await git.add([path.join(__dirname, '../.')]);
  await git.commit(`[release] Version: ${incrementedVersion}`);
  await git.push();

  if (!argv.skipPublish) {
    try {
      await execa('npm', ['publish'], { stdio: 'inherit' });

      chalk.green('Library was successfully published to npm');
    } catch (e) {
      chalk.red('Publish failed', e);
      process.exit(1);
    }
  }

  open(
    githubRelease({
      user: 'Renna-Labs',
      repo: 'hooks',
      tag: incrementedVersion,
      title: incrementedVersion,
    }),
  );
})();
