import Image from 'next/image';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="rounded-full bg-white p-2 shadow-md border-2 border-yellow-100">
        <Image
          src="/adora-logo.png"
          alt="Adora Fashion Logo"
          width={140}
          height={140}
          className="h-auto w-auto max-h-24 object-contain rounded-full"
          priority
        />
      </div>
    </div>
  );
}
