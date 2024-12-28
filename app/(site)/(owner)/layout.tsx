import { ClerkProvider } from "@clerk/nextjs";


const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{
    return(
      <ClerkProvider>
     
        <div className="h-full">
          <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          side 

          </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
               nav
            </div>
            <main className="md:pl-56 pt-[80px] h-full">
            
              {children}
            </main>
        </div>
      
              
      
    </ClerkProvider>
    )
  }

  export default DashboardLayout;