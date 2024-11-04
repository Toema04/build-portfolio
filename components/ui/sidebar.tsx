// "use client"

// import * as React from "react"
// import { cva, type VariantProps } from "class-variance-authority"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// import { cn } from "@/lib/utils"

// const sidebarVariants = cva(
//   "flex flex-col h-full bg-background text-foreground transition-all duration-300 ease-in-out",
//   {
//     variants: {
//       variant: {
//         default: "border-r",
//         floating: "rounded-lg shadow-lg",
//       },
//       size: {
//         sm: "w-64",
//         default: "w-72",
//         lg: "w-80",
//       },
//       collapsed: {
//         true: "w-16",
//         false: "",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//       collapsed: false,
//     },
//   }
// )

// interface SidebarProps
//   extends React.HTMLAttributes<HTMLDivElement>,
//     VariantProps<typeof sidebarVariants> {
//   collapsed?: boolean
//   onCollapsedChange?: (collapsed: boolean) => void
// }

// const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
//   (
//     {
//       className,
//       variant,
//       size,
//       collapsed = false,
//       onCollapsedChange,
//       children,
//       ...props
//     },
//     ref
//   ) => {
//     const [isCollapsed, setIsCollapsed] = React.useState(collapsed)

//     React.useEffect(() => {
//       setIsCollapsed(collapsed)
//     }, [collapsed])

//     const toggleCollapsed = () => {
//       const newCollapsed = !isCollapsed
//       setIsCollapsed(newCollapsed)
//       onCollapsedChange?.(newCollapsed)
//     }

//     return (
//       <div
//         ref={ref}
//         className={cn(sidebarVariants({ variant, size, collapsed: isCollapsed, className }))}
//         {...props}
//       >
//         {children}
//         <button
//           onClick={toggleCollapsed}
//           className="absolute top-4 -right-3 bg-primary text-primary-foreground rounded-full p-1 shadow-md"
//         >
//           {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
//         </button>
//       </div>
//     )
//   }
// )
// Sidebar.displayName = "Sidebar"

// const SidebarHeader = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex h-14 items-center border-b px-4", className)}
//     {...props}
//   />
// ))
// SidebarHeader.displayName = "SidebarHeader"

// const SidebarContent = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex-1 overflow-auto py-2", className)}
//     {...props}
//   />
// ))
// SidebarContent.displayName = "SidebarContent"

// const SidebarFooter = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex h-14 items-center border-t px-4", className)}
//     {...props}
//   />
// ))
// SidebarFooter.displayName = "SidebarFooter"

// const SidebarItem = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement> & { active?: boolean }
// >(({ className, active, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn(
//       "flex items-center px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground",
//       active && "bg-accent text-accent-foreground",
//       className
//     )}
//     {...props}
//   />
// ))
// SidebarItem.displayName = "SidebarItem"

// export {
//   Sidebar,
//   SidebarHeader,
//   SidebarContent,
//   SidebarFooter,
//   SidebarItem,
// }

// In ./ui/sidebar.tsx
import { FileText } from 'lucide-react'
import React from 'react'

export const SidebarProvider = ({ children }) => {
  // Add any context or state management here if needed
  return <>{children}</>
}

export const Sidebar = ({ activeSection, setActiveSection, children }) => {
  return (
    <nav className="flex flex-col items-center w-[130px] h-[464px] bg-white rounded-[20px] shadow-[rgba(0,0,0,0.05)_2px_1px_7px_0px] py-6 space-y-8">
      <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-8">
        <FileText className="text-white" size={24} />
      </div>
      {children}
    </nav>
  )
}
