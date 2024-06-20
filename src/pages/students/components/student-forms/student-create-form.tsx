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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Toaster, toast } from 'sonner'
import { Input } from '@/components/ui/input';
import { addAccount } from '@/lib/users-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
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
    role: z.string(),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
    // file: z
    //   .custom()
    //   .refine((fileList: any) => fileList?.length === 1, 'Expected file')
    //   .transform((file: any) => file[0])
    //   .refine((file) => {
    //     return file?.size <= maxFileSize;
    //   }, `File size should be less than 1gb.`)
    //   .refine(
    //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //     'Only these types are allowed .jpg, .jpeg, .png, .webp and mp4'
    //   )
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

type StudentFormSchemaType = z.infer<typeof studentFormSchema>;

const StudentCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const queryClient = useQueryClient();


  const form = useForm<StudentFormSchemaType>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {}
  });

  const onSubmit = async (values: StudentFormSchemaType) => {
    try {
      const res = await addAccount(values);
      console.log('res', res);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      if (res.status === 200) {
        toast.success('Account created successfully!')
        modalClose();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Failed to add account:', error);
      // You can show an error message to the user here if needed
    }
  };

  return (
    <div className="px-2">
      {/* <Toaster richColors /> */}
      <Heading
        title={'Create New Account'}
        description={
          "Welcome to the Account creation page!"
        }
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Select value={field.value}
                      onValueChange={value => field.onChange(value)}>
                      <SelectTrigger className="w-[180px] py-6">
                        <SelectValue placeholder="Choose your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">MALE</SelectItem>
                        <SelectItem value="FEMALE">FEMALE</SelectItem>
                      </SelectContent>
                    </Select>
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value}
                      onValueChange={value => field.onChange(value)}>
                      <SelectTrigger className="w-[180px] py-6">
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="USER">USER</SelectItem>
                      </SelectContent>
                    </Select>
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
