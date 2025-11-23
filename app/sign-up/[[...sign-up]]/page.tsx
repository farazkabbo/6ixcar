import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">6</span>
          </div>
          <span className="text-white font-bold text-2xl">6ixKar</span>
        </Link>

        {/* Sign Up Component */}
        <div className="flex justify-center">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-slate-900 border-2 border-slate-800 shadow-2xl',
                headerTitle: 'text-white',
                headerSubtitle: 'text-slate-400',
                socialButtonsBlockButton: 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700',
                formFieldLabel: 'text-slate-300',
                formFieldInput: 'bg-slate-800 border-slate-700 text-white',
                footerActionLink: 'text-red-500 hover:text-red-400',
                formButtonPrimary: 'bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg hover:shadow-red-500/50',
                identityPreviewText: 'text-white',
                identityPreviewEditButton: 'text-red-500',
              },
            }}
          />
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
