import { ClerkProvider } from "@clerk/nextjs";


const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{
    return(
      <ClerkProvider>
     
        <div className="h-full">
  
            <main className="md:pl-56 pt-[80px] h-full">
            
              {children}
            </main>
        </div>
      
              
      
    </ClerkProvider>
    )
  }

  export default DashboardLayout;