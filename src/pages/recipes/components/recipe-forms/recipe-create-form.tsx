import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { addNewRecipe } from '@/lib/recipes-api';
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const recipeFormSchema = z
  .object({
    name: z.string().min(1, { message: 'name is required' }),
  })

type RecipeFormSchemaType = z.infer<typeof recipeFormSchema>;

const StudentCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<RecipeFormSchemaType>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {}
  });

  const onSubmit = async (values: RecipeFormSchemaType) => {
    const res = await addNewRecipe(values);
    queryClient.invalidateQueries({ queryKey: ['recipes'] });
    if (res.status === 200) {
      router.push(`/recipe/details/${res.data.recipeId}`)
    }
    console.log(res.data.recipeId);
  };

  return (
    <div className="px-2">
      <Heading
        title={'Create New Recipe'}
        description={
          "Welcome to the Recipe creation page!"
        }
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-x-8 gap-y-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl "
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
            <Button type="submit" className="rounded-full" size="lg">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentCreateForm;
