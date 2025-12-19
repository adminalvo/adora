import Image from 'next/image';

export default function Logo({ className = '', size = 'default' }: { className?: string; size?: 'default' | 'large' }) {
  const logoSize = size === 'large' ? { width: 80, height: 80, className: 'h-20 w-20' } : { width: 65, height: 65, className: 'h-16 w-16' };
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="rounded-full bg-white p-1.5 shadow-lg border-2 border-black flex-shrink-0">
        <Image
          src="/adora-logo.png"
          alt="Adora Fashion Logo"
          width={logoSize.width}
          height={logoSize.height}
          className={`${logoSize.className} object-contain rounded-full`}
          priority
        />
      </div>
    </div>
  );
}
