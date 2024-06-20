import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Textarea } from "@/components/ui/textarea"

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { addNewInstruction } from '@/lib/instructions-api';


const changePasswordFormSchema = z
    .object({
        currentPassword: z.string().min(1, { message: 'Current Password is required' }),
        newPassword: z.string().min(1, { message: 'New Password is required' }),
        confirmPassword: z.string().min(1, { message: 'Confirm Password is required' })
    })

type ChangePasswordFormSchemaType = z.infer<typeof changePasswordFormSchema>;

const ChangePasswordForm = ({ modalClose }: { modalClose: () => void }) => {
    const recipeIdParam = useParams().recipeId;
    const recipeId = Number(recipeIdParam);
    const form = useForm<ChangePasswordFormSchemaType>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues: {}
    });
    const queryClient = useQueryClient();


    const onSubmit = async (values: ChangePasswordFormSchemaType) => {
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
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Current Password"
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
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Enter New Password" />
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
                                        <Textarea {...field} placeholder="Enter Confirm Password" />
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

export default ChangePasswordForm;
