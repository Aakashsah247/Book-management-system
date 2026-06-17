require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

// Give a clear error instead of the less helpful Supabase error.
if (!supabaseUrl) {
  throw new Error("SUPABASE_URL is missing from backend/.env");
}

if (!supabaseSecretKey) {
  throw new Error("SUPABASE_SECRET_KEY is missing from backend/.env");
}

const supabase = createClient(supabaseUrl, supabaseSecretKey);

module.exports = supabase;