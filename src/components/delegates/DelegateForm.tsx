import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Phone, Mail, MapPin, Briefcase, Calendar } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Form schema validation
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  organization: z.string().optional(),
  jobTitle: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string(),
  dietaryRequirements: z.string().optional(),
  specialNeeds: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface DelegateFormProps {
  onSubmit?: (data: FormValues) => void;
  initialData?: Partial<FormValues>;
  isEditing?: boolean;
}

const DelegateForm = ({
  onSubmit = () => {},
  initialData = {},
  isEditing = false,
}: DelegateFormProps) => {
  const defaultValues: Partial<FormValues> = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    jobTitle: "",
    address: "",
    city: "",
    country: "United States",
    dietaryRequirements: "",
    specialNeeds: "",
    ...initialData,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (data: FormValues) => {
    onSubmit(data);
    // In a real application, you would handle form submission here
    console.log("Form submitted:", data);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Delegate" : "Add New Delegate"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the delegate's information in the system."
            : "Enter the delegate's information to register them in the system."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Information Section */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </h3>
              </div>

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="john.doe@example.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Professional Information Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Professional Information
                </h3>
              </div>

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="Company or Organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Information Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Address Information
                </h3>
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="United States">
                          United States
                        </SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">
                          United Kingdom
                        </SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="China">China</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="Brazil">Brazil</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Special Requirements Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Special Requirements
                </h3>
              </div>

              <FormField
                control={form.control}
                name="dietaryRequirements"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Dietary Requirements</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Vegetarian, Vegan, Gluten-free, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please specify any dietary restrictions or preferences.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialNeeds"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Special Needs or Accommodations</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Wheelchair access, hearing assistance, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please specify any special needs or accommodations
                      required.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pt-4 flex justify-end space-x-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Delegate" : "Add Delegate"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DelegateForm;
