import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://yqsunezvmvdyrisrylkv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxc3VuZXp2bXZkeXJpc3J5bGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNjEzMTEsImV4cCI6MjA1MjYzNzMxMX0._HfHKF2QTn3KNcv6CBEV6TgjqPpSdzSG7XI6q6Agk90";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
