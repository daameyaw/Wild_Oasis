import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://svyzunfsnfggymefdzgz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2eXp1bmZzbmZnZ3ltZWZkemd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4MzgzMjYsImV4cCI6MjAzNTQxNDMyNn0.IWF1ybBkr62faOrtd-lnU4BrK7i9RcvukuG8skrgxg0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
