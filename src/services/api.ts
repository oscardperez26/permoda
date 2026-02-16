// services/api.ts
import { createClient } from '@supabase/supabase-js';

// 🔹 Tus datos de Supabase
const SUPABASE_URL = 'https://nhqwwqbbuyomvtnnqcpu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocXd3d...';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * getProductBycod
 * Consulta la tabla 'data' por código de barras
 */
export const getProductBycod = async (ean: string) => {
  const { data, error } = await supabase
    .from('data')       // tu tabla en Supabase
    .select('*')
    .eq('codbarras', ean)
    .single();          // devuelve un solo registro

  if (error) {
    console.error('Error consultando producto:', error);
    return null;
  }

  return data;
};