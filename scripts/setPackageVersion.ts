import path from 'path';
import fs from 'fs-extra';

async function writeVersionToPackageJson(version: string) {
  const filePath = path.join(__dirname, '../package.json');
  const current = await fs.readJSON(filePath);
  current.version = version;

  await fs.writeJSON(filePath, current, { spaces: 2 });
}

export async function setPackageVersion(version: string) {
  await writeVersionToPackageJson(version);
}
