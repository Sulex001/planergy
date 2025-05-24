const MemberInfo = ({ name, email }: { name: string; email: string }) => {
    return (
  <div className="flex flex-col">
    <span className="font-medium text-gray-900">{name}</span>
    <span className="text-sm text-gray-500">{email}</span>
  </div>
)}

export default MemberInfo;