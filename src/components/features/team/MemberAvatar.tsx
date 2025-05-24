import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const MemberAvatar = ({ src, alt, fallback }: { src: string; alt: string; fallback: string }) => {
    
return (
  <Avatar className="h-10 w-10">
    <AvatarImage src={src || "/placeholder.svg"} alt={alt} />
    <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-medium">{fallback}</AvatarFallback>
  </Avatar>
)
}
export default  MemberAvatar;