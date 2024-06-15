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
import { Ingredients } from '@/constants/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type IngredientsUpdateFormProps = {
  modalClose: () => void;
  data: Ingredients;
  onUpdateIngredient: (values) => void;
};

const ingredientsFormSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  quantity: z.string().min(1, { message: 'quantity is required' }),
  unit: z.string().min(1, { message: 'username is required' })
});

type IngredientsFormSchemaType = z.infer<typeof ingredientsFormSchema>;

const IngredientsUpdateForm = ({
  modalClose,
  data,
  onUpdateIngredient
}: IngredientsUpdateFormProps) => {
  const form = useForm<IngredientsFormSchemaType>({
    resolver: zodResolver(ingredientsFormSchema),
    defaultValues: {
      name: data?.name,
      quantity: '0',
      unit: data?.unit
    }
  });

  const onSubmit = async (values) => {
    onUpdateIngredient(values);
    modalClose();
  };

  return (
    <div className="px-2">
      <Heading
        title={'Add New Ingredients'}
        description={'Welcome to the Ingredients creation page!'}
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
                      placeholder="Enter name of ingredients"
                      {...field}
                      className=" px-4 py-6 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your quantity"
                      {...field}
                      className=" px-4 py-6 "
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your unit"
                      {...field}
                      className=" px-4 py-6 "
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
              Create Student
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default IngredientsUpdateForm;
