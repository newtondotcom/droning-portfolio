import { createConnection } from 'mysql2/promise';
import pkg from 'fs-extra';
const { writeJson } = pkg;
import Constants from '$lib/constants';
import type { Project } from '$lib/types';

export async function load() {
  let connection;

  try {
    connection = await createConnection({
      host: Constants.dbhost,
      database: Constants.dbdb,
      user: Constants.dbuser,
      password: Constants.dbpassword,
    });

    const [rows] = await connection.execute('SELECT * FROM portfolio');

    const projectData: Project[] = rows.map((row: any) => ({
      name: row.name,
      thumbnail: row.thumbnail,
      videoLink: row.videoLink,
      description: row.description,
      key: row.key,
      duration: row.duration,
    }));

    await writeJson('./db.json', projectData, { spaces: 2 });
  } catch (err) {
    console.error('Error fetching data:', err);
    const defaultData: Project[] = [
      // Your default data here
    ];
    await writeJson('db.json', defaultData, { spaces: 2 });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
