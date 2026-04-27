import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center mb-8">
          <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="font-display text-4xl text-ivory mb-4">Payment Failed</h1>
        <p className="text-ivory/60 mb-4">
          Something went wrong during payment processing. Your project has been saved but is not yet active.
        </p>
        <p className="text-ivory/40 text-sm mb-8">
          No charges were made to your account. You can safely retry the payment.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard/uploads"
            className="inline-flex min-h-12 items-center justify-center bg-gold px-8 text-sm text-ink font-semibold transition duration-200 hover:bg-ivory active:scale-[0.98]"
          >
            Retry Payment
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-12 items-center justify-center border border-ivory/20 px-8 text-sm text-ivory transition duration-200 hover:border-gold hover:text-gold active:scale-[0.98]"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
