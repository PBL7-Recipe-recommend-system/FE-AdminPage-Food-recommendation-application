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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Instruction } from '@/constants/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type InstructionUpdateFormProps = {
  modalClose: () => void;
  data: Instruction;
  onUpdateInstruction: (values) => void;
};

const instructionFormSchema = z.object({
  step: z.number().min(1, { message: 'name is required' }),
  instruction: z.string().min(1, { message: 'instruction is required' })
});

type InstructionFormSchemaType = z.infer<typeof instructionFormSchema>;

const InstructionUpdateForm = ({
  modalClose,
  data,
  onUpdateInstruction
}: InstructionUpdateFormProps) => {
  const form = useForm<InstructionFormSchemaType>({
    resolver: zodResolver(instructionFormSchema),
    defaultValues: {
      step: data?.step,
      instruction: data?.instruction
    }
  });

  const onSubmit = async (values) => {
    onUpdateInstruction(values);
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
                      className=" w-1/3 px-4 py-6 shadow-inner drop-shadow-xl"
                      type="number"
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InstructionUpdateForm;
