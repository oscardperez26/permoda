// services/api.ts
import { createClient } from '@supabase/supabase-js';

// 🔹 Tus datos de Supabase
const SUPABASE_URL = 'https://nhqwwqbbuyomvtnnqcpu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocXd3cWJidXlvbXZ0bm5xY3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNjg2MjQsImV4cCI6MjA4Njg0NDYyNH0.XuG2eHHQOzGvrj7rMnYaGT-IUlGHQ0mXtQ0rIbFeebI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * getProductBycod
 * Consulta la tabla 'data' por código de barras
 */
export const getProductBycod = async (ean: string) => {
  const { data, error } = await supabase
    .from('data')       // tu tabla en Supabase
    .select('*')
    .eq('CODBARRAS', ean)
    .single();          // devuelve un solo registro

  if (error) {
    console.error('Error consultando producto:', error);
    return null;
  }

  return data;
};