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
import { addNewIngredients } from '@/lib/recipes-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';


const ingredientsFormSchema = z
  .object({
    name: z.string().min(1, { message: 'name is required' }),
    quantity: z.string().min(1, { message: 'quantity is required' }),
  })

type IngredientFormSchemaType = z.infer<typeof ingredientsFormSchema>;

const IngredientsCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const recipeIdParam = useParams().recipeId;
  const recipeId = Number(recipeIdParam);
  const form = useForm<IngredientFormSchemaType>({
    resolver: zodResolver(ingredientsFormSchema),
    defaultValues: {}
  });
  const queryClient = useQueryClient();


  const onSubmit = async (values: IngredientFormSchemaType) => {
    console.log(values);
    const res = await addNewIngredients(recipeId, values);
    queryClient.invalidateQueries({ queryKey: ['ingredients', recipeId] });
    console.log(res);
    modalClose();
  };

  return (
    <div className="px-2" >
      <Heading
        title={'Add Ingredient to Recipe'}
        description={
          "Welcome to the Ingredients adding page!"
        }
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter ingredient"
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
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter quantity"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl"
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your unit"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
              Add ingredient
            </Button>
          </div>
        </form>
      </Form>
    </div >
  );
};

export default IngredientsCreateForm;
