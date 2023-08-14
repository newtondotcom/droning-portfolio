import { createPool } from 'mysql';
import { writeJson } from 'fs-extra';
import Constants from '$lib/constants';
import type { Project } from '$lib/types';

export async function load() {
  let pool;

  try {
    pool = createPool({
      host: Constants.dbhost,
      database: Constants.dbdb,
      user: Constants.dbuser,
      password: Constants.dbpassword,
    });

    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM portfolio');
    connection.release();

    const projectData: Project[] = rows.map((row: any) => ({
      name: row.name,
      thumbnail: row.thumbnail,
      videoLink: row.videoLink,
      description: row.description,
      key: row.key,
      duration: row.duration,
    }));

    await writeJson('db.json', projectData, { spaces: 2 });
  } catch (err) {
    console.error('Error fetching data:', err);
    const defaultData: Project[] = [
      // Your default data here
    ];
    await writeJson('db.json', defaultData, { spaces: 2 });
  } finally {
    if (pool) {
      await pool.end();
    }
  }
}
