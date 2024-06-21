import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from "@/components/ui/textarea";

import { Input } from '@/components/ui/input';
import { addNewInstruction } from '@/lib/instructions-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';


const instructionFormSchema = z
  .object({
    step: z.string().min(1, { message: 'name is required' }),
    instruction: z.string().min(1, { message: 'quantity is required' }),
  })

type InstructionFormSchemaType = z.infer<typeof instructionFormSchema>;

const InstructionCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const recipeIdParam = useParams().recipeId;
  const recipeId = Number(recipeIdParam);
  const form = useForm<InstructionFormSchemaType>({
    resolver: zodResolver(instructionFormSchema),
    defaultValues: {}
  });
  const queryClient = useQueryClient();


  const onSubmit = async (values: InstructionFormSchemaType) => {
    console.log(values);
    const res = await addNewInstruction(recipeId, values);
    queryClient.invalidateQueries({ queryKey: ['instructions', recipeId] });
    modalClose();
  };

  return (
    <div className="px-2" >
      <Heading
        title={'Add Instruction to Recipe'}
        description={
          "Welcome to the Ingredients adding page!"
        }
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
          <div className="grid grid-rows-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="step"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter step"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl w-1/3"
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instruction"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter description" />
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
              Add instruction
            </Button>
          </div>
        </form>
      </Form>
    </div >
  );
};

export default InstructionCreateForm;
