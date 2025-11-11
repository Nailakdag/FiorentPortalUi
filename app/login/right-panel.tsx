import { Logo } from "@/components/ui/logo";
import { UserAuthForm } from "@/components/user-auth-form";
import { Footer } from "./footer";

export const RightPanel = () => (
  <div className="flex-1 lg:w-1/2 lg:max-w-none mx-auto w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
    <div className="w-full flex-1 flex flex-col justify-center max-w-sm mx-auto space-y-8">
      <div className="flex justify-center">
        <Logo />
      </div>
      <UserAuthForm />
      <Footer />
    </div>
  </div>
);
