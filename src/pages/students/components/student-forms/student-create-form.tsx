import FileUpload from '@/components/shared/fileupload';
import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const maxFileSize = 1 * 1024 * 1024 * 1024;
const studentFormSchema = z
  .object({
    name: z.string().min(1, { message: 'firstname is required' }),
    gender: z.string(),
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
    file: z
      .custom()
      .refine((fileList: any) => fileList?.length === 1, 'Expected file')
      .transform((file: any) => file[0])
      .refine((file) => {
        return file?.size <= maxFileSize;
      }, `File size should be less than 1gb.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Only these types are allowed .jpg, .jpeg, .png, .webp and mp4'
      )
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

type StudentFormSchemaType = z.infer<typeof studentFormSchema>;

const StudentCreateForm = ({ modalClose }: { modalClose: () => void }) => {


  const form = useForm<StudentFormSchemaType>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {}
  });

  const onSubmit = (values: StudentFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('Form values', values);
    console.log(values);
  };

  return (
    <div className="px-2">
      <Heading
        title={'Create New Account'}
        description={
          "Welcome to the Account creation page!"
        }
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile</FormLabel>
                <FormControl>
                  <FileUpload onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">{field.value || "Select your gender"}</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Gender</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={field.value} onValueChange={val => field.onChange(val)}>
                          <DropdownMenuRadioItem value="MALE">Male</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="FEMALE">Female</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your confirmPassword"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full "
              size="lg"
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full" size="lg" >
              Create Account
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentCreateForm;
