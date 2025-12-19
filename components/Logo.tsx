import Image from 'next/image';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="rounded-full bg-white p-1 shadow-md border-2 border-yellow-100 flex-shrink-0">
        <Image
          src="/adora-logo.png"
          alt="Adora Fashion Logo"
          width={50}
          height={50}
          className="h-12 w-12 object-contain rounded-full"
          priority
        />
      </div>
    </div>
  );
}
