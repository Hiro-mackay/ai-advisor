import { AgentAvatar } from "@/components/avatar/agent";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateAgentSchema, CreateAgentType } from "../server/schema/mutation";
import { AgentType } from "../server/schema/query";

type Props = {
  onSuccess?: (agent: AgentType) => void;
  onCancel?: () => void;
  defaultValues?: Partial<AgentType>;
};

export function AgentForm({
  onSuccess,
  onCancel,
  defaultValues = {
    name: "",
    instructions: "",
  },
}: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: trpc.agents.getAll.queryKey(),
        });

        if (defaultValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getById.queryOptions({ id: defaultValues.id })
          );
        }

        onSuccess?.(data);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<CreateAgentType>({
    resolver: zodResolver(CreateAgentSchema),
    defaultValues,
  });

  const isEditable = !!defaultValues?.id;
  const isLoading = createAgent.isPending;

  const onSubmit = form.handleSubmit(async (data) => {
    if (isEditable) {
      console.log("editable");
    } else {
      await createAgent.mutateAsync(data);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <AgentAvatar agent={{ name: form.watch("name") }} />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Agent name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Your are a helpful assistant"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isEditable ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
