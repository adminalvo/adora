/**
 * SQL Execution Helper Script
 * 
 * This script displays SQL files that need to be executed in Supabase SQL Editor.
 * Supabase doesn't allow direct SQL execution via REST API for security reasons.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n🔑 Supabase Configuration Check:');
console.log('================================\n');

if (SUPABASE_URL) {
  console.log('✅ NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL);
} else {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL: Not set');
}

if (SERVICE_ROLE_KEY) {
  console.log('✅ SUPABASE_SERVICE_ROLE_KEY: Set (hidden for security)');
} else {
  console.log('❌ SUPABASE_SERVICE_ROLE_KEY: Not set');
}

console.log('\n📋 SQL Files to Execute:');
console.log('========================\n');

const sqlDir = path.join(__dirname, '../sql');
const sqlFiles = [
  { name: 'schema.sql', description: 'Main database schema (tables, indexes, triggers, RLS policies)' },
  { name: 'functions.sql', description: 'Helper functions (order number generation, cart totals)' },
  { name: 'seed.sql', description: 'Seed data (sample categories)' },
];

sqlFiles.forEach((file, index) => {
  const filePath = path.join(sqlDir, file.name);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📄 File ${index + 1}/${sqlFiles.length}: ${file.name}`);
    console.log(`📝 Description: ${file.description}`);
    console.log(`${'='.repeat(60)}\n`);
    console.log(content);
    console.log(`\n${'='.repeat(60)}\n`);
  } else {
    console.error(`❌ File not found: ${file.name}`);
  }
});

console.log('\n📖 Instructions:');
console.log('================\n');
console.log('1. Go to Supabase Dashboard: https://supabase.com/dashboard');
console.log('2. Select your project');
console.log('3. Navigate to: SQL Editor (left sidebar)');
console.log('4. Copy and paste each SQL file content above');
console.log('5. Run them in this order:');
console.log('   - First: schema.sql');
console.log('   - Second: functions.sql');
console.log('   - Third: seed.sql (optional)');
console.log('6. Click "RUN" button after pasting each file');
console.log('\n💡 Tip: You can save these SQL queries in Supabase for future use\n');
