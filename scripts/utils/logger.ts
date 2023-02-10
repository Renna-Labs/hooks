import chalk from 'chalk';

const Logger = {
  log: (message: string) => {
    console.log(chalk.white(message));
  },
  info: (message: string) => {
    console.log(chalk.blue(message));
  },
  success: (message: string) => {
    console.log(chalk.green(message));
  },
  error: (message: string) => {
    console.log(chalk.red(message));
  },
};

export default Logger;
