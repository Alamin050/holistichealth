"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  specialty: z.string().min(2, {
    message: "Specialty must be at least 2 characters.",
  }),
  bio: z.string().max(160).min(4),
  emailNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(false),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  name: "Dr. Smith",
  specialty: "Cardiology",
  bio: "I am a board-certified cardiologist with over 15 years of experience.",
  emailNotifications: true,
  pushNotifications: false,
}

export default function ProfilePage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved.",
    })
  }

  return (
    <>
      <PageHeader 
        title="Profile"
        subtitle="Manage your profile settings and preferences."
      />
      <div className="flex-1 flex flex-col gap-4 lg:gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Edit your personal information here.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is the name that will be displayed on your profile.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Specialty</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Cardiology" {...field} />
                        </FormControl>
                        <FormDescription>
                            Your medical specialty.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span>@mention</span> other users and organizations.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button type="submit">Update profile</Button>
                </form>
                </Form>
            </CardContent>
        </Card>
        <Card>
           <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control how you receive alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive alerts about critical patient status changes via email.</p>
                    </div>
                    <Switch defaultChecked={defaultValues.emailNotifications}/>
                </div>
                 <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-muted-foreground">Get instant push notifications on your registered devices.</p>
                    </div>
                    <Switch defaultChecked={defaultValues.pushNotifications} />
                </div>
            </CardContent>
        </Card>
      </div>
    </>
  )
}
