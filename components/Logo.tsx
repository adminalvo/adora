import Image from 'next/image';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/adora-logo.png"
        alt="Adora Fashion Logo"
        width={120}
        height={120}
        className="h-auto w-auto max-h-20 object-contain"
        priority
      />
    </div>
  );
}
