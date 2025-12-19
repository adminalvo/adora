/**
 * Script to execute SQL files in Supabase using Management API
 * 
 * This script attempts to execute SQL files via Supabase Management API.
 * However, Supabase doesn't provide direct SQL execution via REST API.
 * 
 * Alternative: Use Supabase CLI or run SQL manually in SQL Editor
 */

const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Please set:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL=your_project_url');
  console.error('  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  process.exit(1);
}

// Read SQL files
const sqlDir = path.join(__dirname, '../sql');
const sqlFiles = [
  { name: 'schema.sql', path: path.join(sqlDir, 'schema.sql') },
  { name: 'functions.sql', path: path.join(sqlDir, 'functions.sql') },
  { name: 'seed.sql', path: path.join(sqlDir, 'seed.sql') },
];

console.log('📋 SQL Files to execute:');
console.log('=======================\n');

sqlFiles.forEach((file) => {
  if (fs.existsSync(file.path)) {
    const content = fs.readFileSync(file.path, 'utf-8');
    console.log(`\n--- ${file.name} ---`);
    console.log(content);
    console.log('\n');
  } else {
    console.error(`❌ File not found: ${file.path}`);
  }
});

console.log('\n⚠️  IMPORTANT:');
console.log('Supabase does not allow direct SQL execution via REST API.');
console.log('You need to run these SQL files manually:\n');
console.log('1. Go to: https://supabase.com/dashboard');
console.log('2. Select your project');
console.log('3. Navigate to: SQL Editor');
console.log('4. Copy and paste each SQL file content above');
console.log('5. Run them in order: schema.sql → functions.sql → seed.sql\n');
console.log('Or use Supabase CLI:');
console.log('  npx supabase db push\n');
