import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { VillageInfo } from '@/types/database';
import { cache } from 'react';

export const getVillageInfo = cache(async (): Promise<VillageInfo | null> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('village_info')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('[getVillageInfo] Supabase error:', error.message);
    return null;
  }

  return data;
});