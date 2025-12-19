/**
 * Database Setup Script
 * 
 * This script helps set up the Supabase database by executing SQL files.
 * 
 * Note: Supabase doesn't allow direct SQL execution via REST API for security reasons.
 * You need to run the SQL files manually in Supabase SQL Editor:
 * 
 * 1. Go to your Supabase project dashboard
 * 2. Navigate to SQL Editor
 * 3. Run sql/schema.sql first
 * 4. Then run sql/functions.sql
 * 5. Finally run sql/seed.sql (optional)
 * 
 * Or use Supabase CLI:
 * npx supabase db push
 */

import * as fs from 'fs';
import * as path from 'path';

const SQL_DIR = path.join(process.cwd(), 'sql');

interface SQLFile {
  name: string;
  content: string;
  order: number;
}

const sqlFiles: SQLFile[] = [
  {
    name: 'schema.sql',
    content: fs.readFileSync(path.join(SQL_DIR, 'schema.sql'), 'utf-8'),
    order: 1,
  },
  {
    name: 'functions.sql',
    content: fs.readFileSync(path.join(SQL_DIR, 'functions.sql'), 'utf-8'),
    order: 2,
  },
  {
    name: 'seed.sql',
    content: fs.readFileSync(path.join(SQL_DIR, 'seed.sql'), 'utf-8'),
    order: 3,
  },
];

console.log('📋 SQL Files to execute in Supabase SQL Editor:');
console.log('================================================\n');

sqlFiles.forEach((file) => {
  console.log(`\n--- ${file.name} (Order: ${file.order}) ---`);
  console.log(file.content);
  console.log('\n');
});

console.log('\n📝 Instructions:');
console.log('1. Copy each SQL file content above');
console.log('2. Go to Supabase Dashboard > SQL Editor');
console.log('3. Paste and run each file in order');
console.log('4. Verify tables are created in Table Editor\n');
