import { ArrowLeft, User, AtSign, Mail, Briefcase, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EditableField from "./EditableInput"


interface OnboardingSummaryProps {
  userData: {
    fullName: string 
    username: string | undefined
    email: string  | undefined
    phoneNumber: string 
    company: string


  }
  onBack: () => void
  onComplete: () => void
  onEdit: (field: string) => void
}

const OnboardingSummary: React.FC<OnboardingSummaryProps> = ({ userData, onBack, onComplete, onEdit }) => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
       <Button variant="outline" size="sm" className="mb-6" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white p-4">
                ✓
              </div>
            </div>
            <CardTitle>Onboarding Summary</CardTitle>
            <CardDescription>Review and complete your account setup.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <EditableField
              icon={<User className="h-5 w-5" />}
              label="Full Name"
              value={userData.fullName || ""}
              onEdit={() => onEdit("fullName")}
            />
            <EditableField
              icon={<AtSign className="h-5 w-5" />}
              label="Username"
              value={userData.username || ""}
              onEdit={() => onEdit("username")}
            />
            <EditableField
              icon={<Mail className="h-5 w-5" />}
              label="Email Address"
              value={userData.email || ""}
              onEdit={() => onEdit("email")}
            />
            <EditableField
              icon={<Briefcase className="h-5 w-5" />}
              label="Phone Number"
              value={userData.phoneNumber || ""}
              onEdit={() => onEdit("phoneNumber")}
            />
            <EditableField
              icon={<Building className="h-5 w-5" />}
              label="Company"
              value={userData.company || ""}
              onEdit={() => onEdit("company")}
            />
            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white mt-6" onClick={onComplete}>
              Complete
            </Button>
          </CardContent>
        </Card>

        <footer className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
          <div>© 2025 Planergy Task Management</div>
          <div className="flex items-center gap-2">
            <span>ENG</span>
            <span>▼</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default OnboardingSummary

