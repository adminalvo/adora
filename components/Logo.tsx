import Image from 'next/image';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="rounded-full bg-white p-1.5 shadow-md border-2 border-yellow-100">
        <Image
          src="/adora-logo.png"
          alt="Adora Fashion Logo"
          width={60}
          height={60}
          className="h-14 w-14 object-contain rounded-full"
          priority
        />
      </div>
    </div>
  );
}
