import { PhoneIcon, MailIcon, UserIcon, ExternalLinkIcon } from 'lucide-react';
import type { SocialLinks } from '@/types/database';

interface TenantContactBlockProps {
  ownerName:   string;
  phone?:      string | null;
  whatsapp?:   string | null;
  email?:      string | null;
  socialLinks: SocialLinks;
}

export function TenantContactBlock({ ownerName, phone, whatsapp, email, socialLinks }: TenantContactBlockProps) {
  const hasSocial = Object.values(socialLinks).some(Boolean);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 space-y-4">
      <h3 className="font-semibold text-gray-800">Informasi Kontak</h3>
      <div className="space-y-3">
        <ContactRow icon={<UserIcon className="w-4 h-4" />} label={ownerName} />
        {phone && (
          <a href={`tel:${phone}`}>
            <ContactRow icon={<PhoneIcon className="w-4 h-4" />} label={phone} isLink />
          </a>
        )}
        {whatsapp && (
          <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
            <ContactRow
              icon={
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              }
              label={whatsapp}
              isLink
            />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`}>
            <ContactRow icon={<MailIcon className="w-4 h-4" />} label={email} isLink />
          </a>
        )}
      </div>

      {hasSocial && (
        <div className="pt-3 border-t border-amber-50 space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Media Sosial & Marketplace</p>
          {Object.entries(socialLinks).map(([platform, url]) => {
            if (!url) return null;
            return (
              <a
                key={platform}
                href={url.startsWith('http') ? url : `https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-800 transition-colors"
              >
                <ExternalLinkIcon className="w-3.5 h-3.5" />
                <span className="capitalize">{platform}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ContactRow({ icon, label, isLink = false }: { icon: React.ReactNode; label: string; isLink?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-sm ${isLink ? 'text-amber-700 hover:text-amber-900 cursor-pointer' : 'text-gray-700'}`}>
      <span className="text-amber-500 shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}