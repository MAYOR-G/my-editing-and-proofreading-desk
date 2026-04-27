import { AdminLoginPanel } from "@/components/AdminLoginPanel";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-ink flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-gold-deep">Restricted Area</p>
          <h1 className="mt-4 font-display text-4xl text-ivory">Admin Desk</h1>
        </div>
        <AdminLoginPanel />
      </div>
    </main>
  );
}
