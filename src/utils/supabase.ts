import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tjtqfhudvhefqmszertk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqdHFmaHVkdmhlZnFtc3plcnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk5NzIwNjUsImV4cCI6MTk2NTU0ODA2NX0.P-KnQWsRZbxXqa-j1lAcfGc1JVSS_hBHyon0zUixzx4"
);
