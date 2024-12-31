import AdminSidebar from "./admin/_components/admin-sidebar";


const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{
    return(   
      <div className="h-full">
      <div className="h-[100px] md:pl-80 inset-y-0 w-full z-50">
                   
      á
               </div>
     <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
       
         <AdminSidebar/>
     </div>
     <main className="md:pl-80 h-full">
     {children}
     </main>
    </div>       
    )
  }

  export default DashboardLayout;