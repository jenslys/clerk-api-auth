import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
 
export default function Home() {
  return (
    <div className="h-screen bg-white">
      <UserButton afterSignOutUrl="/"/>
      <OrganizationSwitcher hidePersonal={true} />
    </div>
  )
}