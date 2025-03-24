import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Resume Builder</h1>
        <p className="text-xl text-muted-foreground">Create a professional resume with our easy-to-use builder</p>
        <div className="flex justify-center pt-4">
          <Link href="/builder">
            <Button size="lg">Create Your Resume</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

