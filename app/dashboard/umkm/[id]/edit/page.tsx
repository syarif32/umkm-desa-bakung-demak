import { getTenantById } from '@/lib/queries/tenants';
import { notFound } from 'next/navigation';
import { EditForm } from './EditForm'; 

export const metadata = { title: 'Edit UMKM' };

export default async function EditUmkmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tenant = await getTenantById(id);
  
  if (!tenant) notFound();

  return <EditForm tenant={tenant} />;
}