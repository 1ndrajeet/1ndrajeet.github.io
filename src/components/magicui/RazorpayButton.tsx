'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const RazorpayButton = ({ className }: { className?: string }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (!formRef.current || scriptAdded.current) return;
    scriptAdded.current = true;

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', 'pl_QIj3uldCPPkvKg');
    script.async = true;

    formRef.current.appendChild(script);

    return () => {
      if (formRef.current?.contains(script)) {
        formRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={cn("w-full flex justify-center pl-4", className)}>
      <form ref={formRef} className="w-46 max-w-md" />
    </div>
  );
};

export default RazorpayButton;
