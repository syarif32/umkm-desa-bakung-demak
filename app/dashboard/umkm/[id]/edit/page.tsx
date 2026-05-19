import { getTenantById } from '@/lib/queries/tenants';
import { createSupabaseServerClient } from '@/lib/supabase/server'; 
import { notFound } from 'next/navigation';
import { EditForm } from './EditForm'; 

export const metadata = { title: 'Edit UMKM — Panel Kontrol' };

export default async function EditUmkmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenant = await getTenantById(id);
  
  if (!tenant) notFound();

  const supabase = await createSupabaseServerClient();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .order('full_name', { ascending: true });
  return <EditForm tenant={tenant} profiles={profiles || []} />;
}